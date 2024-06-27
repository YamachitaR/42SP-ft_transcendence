from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message')
        username = text_data_json.get('username')
        timestamp = text_data_json.get('timestamp')

        # Log para verificar se as informações estão corretas
        print(f"Received message: {message} from user: {username} at {timestamp}")

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
                'timestamp': timestamp
            }
        )

    async def chat_message(self, event):
        message = event['message']
        username = event['username']
        timestamp = event['timestamp']

        # Log para verificar se as informações estão corretas
        print(f"Sending message: {message} from user: {username} at {timestamp}")

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'timestamp': timestamp
        }))
