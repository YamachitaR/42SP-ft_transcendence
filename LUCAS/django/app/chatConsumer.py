import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from .models import ChatMessage, CustomUser, Channel
from datetime import datetime
from django.utils.timezone import make_aware
from django.conf import settings

logger = logging.getLogger(__name__)

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user1_id = self.scope['url_route']['kwargs']['user1_id']
        self.user2_id = self.scope['url_route']['kwargs']['user2_id']
        self.room_name = f"join_{min(self.user1_id, self.user2_id)}_{max(self.user1_id, self.user2_id)}"
        self.room_group_name = f"chat_{self.room_name}"

        logger.info(f"User {self.user1_id} and User {self.user2_id} are connecting to room {self.room_name}")

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        messages = await self.get_chat_history()
        logger.info(f"Loaded chat history")
        for message in messages:
            username = await self.get_username(message.user_id)
            logger.info(f"Sending message from history: {message.message}")
            await self.send(text_data=json.dumps({
                'message': message.message,
                'username': username,
                'timestamp': message.timestamp.strftime('%Y-%m-%d %H:%M:%S')
            }))

    async def disconnect(self, close_code):
        logger.info(f"User disconnected from room {self.room_name} with close code {close_code}")
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        logger.info(f"Received message: {text_data}")
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        username = text_data_json['username']
        timestamp = text_data_json['timestamp']

        user = await self.get_user(username)

        # Convert the timestamp to the correct format and ensure it is timezone aware
        try:
            naive_timestamp = datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            naive_timestamp = datetime.strptime(timestamp, '%m/%d/%Y, %I:%M:%S %p')

        aware_timestamp = make_aware(naive_timestamp)

        await self.save_message(user, message, aware_timestamp)
        logger.info(f"Saved message: {message}")

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'timestamp': aware_timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        timestamp = event['timestamp']

        logger.info(f"Chat message event: {event}")

        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'timestamp': timestamp
        }))

    @sync_to_async
    def get_chat_history(self):
        logger.info(f"Fetching chat history for room: {self.room_name}")
        return list(ChatMessage.objects.filter(channel__room_id=self.room_name).order_by('-timestamp')[:50][::-1])

    @sync_to_async
    def save_message(self, user, message, timestamp):
        logger.info(f"Saving message for user {user.username}: {message}")
        channel, created = Channel.objects.get_or_create(room_id=self.room_name)
        ChatMessage.objects.create(channel=channel, user=user, message=message, timestamp=timestamp)

    @sync_to_async
    def get_user(self, username):
        logger.info(f"Fetching user with username: {username}")
        return CustomUser.objects.get(username=username)

    @sync_to_async
    def get_username(self, user_id):
        logger.info(f"Fetching username for user_id: {user_id}")
        return CustomUser.objects.get(id=user_id).username
