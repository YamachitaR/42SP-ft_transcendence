import json
from channels.generic.websocket import AsyncWebsocketConsumer

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'game'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        
        self.board = ['' for _ in range(9)]  # Initialize the game board

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        
        if 'restart' in text_data_json:
            self.board = ['' for _ in range(9)]
        else:
            index = text_data_json['index']
            player = text_data_json['player']
            self.board[index] = player

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_update',
                'board': self.board
            }
        )

    async def game_update(self, event):
        board = event['board']

        await self.send(text_data=json.dumps({
            'board': board
        }))
