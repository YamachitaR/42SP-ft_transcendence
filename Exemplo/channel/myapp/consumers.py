import json
from channels.generic.websocket import AsyncWebsocketConsumer

# Armazenamento em memória para rastrear conexões
connected_users = []

class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'some_room'
        self.room_group_name = 'some_group'

        # Adicionar conexão à lista
        self.user_id = len(connected_users) + 1
        connected_users.append(self.user_id)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Remover conexão da lista
        connected_users.remove(self.user_id)

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Verificar se a tecla pressionada é "a"
        if message == 'a':
            # Enviar número correspondente de volta ao cliente
            await self.send(text_data=json.dumps({
                'message': str(self.user_id)
            }))
        else:
            # Enviar mensagem ao grupo de chat
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message
                }
            )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
