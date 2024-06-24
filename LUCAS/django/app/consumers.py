import json
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class OnlineStatusConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        if self.scope["user"].is_authenticated:
            self.user = self.scope["user"]
            await self.accept()
            logger.info(f'WebSocket conectado: {self.user.email}')
            # Marcar o usuário como online
            self.user.last_activity = timezone.now()
            self.user.save()
            await self.channel_layer.group_add(
                "online_status",
                self.channel_name
            )
            await self.channel_layer.group_send(
                "online_status",
                {
                    "type": "user_online",
                    "user_id": self.user.id
                }
            )
        else:
            logger.warning('WebSocket conexão recusada: usuário não autenticado.')
            await self.close(code=403)

    async def disconnect(self, close_code):
        if hasattr(self, 'user') and self.user.is_authenticated:
            self.user.last_activity = timezone.now()
            self.user.save()
            await self.channel_layer.group_discard(
                "online_status",
                self.channel_name
            )
            await self.channel_layer.group_send(
                "online_status",
                {
                    "type": "user_offline",
                    "user_id": self.user.id
                }
            )
        logger.info(f'WebSocket desconectado: {self.user.email}')

    async def user_online(self, event):
        user_id = event["user_id"]
        await self.send(text_data=json.dumps({
            "type": "user_online",
            "user_id": user_id
        }))

    async def user_offline(self, event):
        user_id = event["user_id"]
        await self.send(text_data=json.dumps({
            "type": "user_offline",
            "user_id": user_id
        }))
