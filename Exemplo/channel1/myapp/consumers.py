# pong/consumers.py

import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class PongConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.ball = { 'x': 400, 'y': 200, 'radius': 10, 'dx': 2, 'dy': 2 }
        self.paddle1 = { 'x': 362.5, 'y': 390, 'width': 75, 'height': 10 }
        self.paddle2 = { 'x': 362.5, 'y': 10, 'width': 75, 'height': 10 }
        self.room_group_name = 'pong'

    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.send_game_state()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        paddle_move = data.get('paddle_move', None)

        if paddle_move:
            if paddle_move == 'right':
                self.paddle1['x'] += 7
            elif paddle_move == 'left':
                self.paddle1['x'] -= 7

        self.update_ball_position()
        self.broadcast_game_state()

    def update_ball_position(self):
        self.ball['x'] += self.ball['dx']
        self.ball['y'] += self.ball['dy']

        if self.ball['y'] - self.ball['radius'] <= 0 or self.ball['y'] + self.ball['radius'] >= 400:
            self.ball['dy'] = -self.ball['dy']

        if self.ball['x'] - self.ball['radius'] <= 0 or self.ball['x'] + self.ball['radius'] >= 800:
            self.ball['dx'] = -self.ball['dx']

    def send_game_state(self):
        self.send(text_data=json.dumps({
            'ball': self.ball,
            'paddle1': self.paddle1,
            'paddle2': self.paddle2,
        }))

    def broadcast_game_state(self):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'game_state',
                'ball': self.ball,
                'paddle1': self.paddle1,
                'paddle2': self.paddle2,
            }
        )

    def game_state(self, event):
        self.send(text_data=json.dumps({
            'ball': event['ball'],
            'paddle1': event['paddle1'],
            'paddle2': event['paddle2'],
        }))
