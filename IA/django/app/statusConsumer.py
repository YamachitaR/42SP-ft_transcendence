from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

class SimpleConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        user = await self.get_user(self.user_id)
        if user:
            await self.accept()
            await self.set_user_status(user_id=self.user_id, online=True)
            await self.send(text_data=json.dumps({
                'message': f'{user.username} conectado'
            }))
        else:
            await self.send(text_data=json.dumps({
                'error': 'Usuário não encontrado'
            }))
            await self.close()

    async def disconnect(self, close_code):
        user = await self.get_user(self.user_id)
        if user:
            await self.set_user_status(user_id=self.user_id, online=False)

    async def receive(self, text_data):
        pass

    @database_sync_to_async
    def get_user(self, user_id):
        User = get_user_model()  # Chamada dentro da função
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            print(f"Usuário com ID {user_id} não encontrado.")
            return None

    @database_sync_to_async
    def set_user_status(self, user_id, online):
        User = get_user_model()  # Chamada dentro da função
        User.objects.filter(pk=user_id).update(is_online=online)
