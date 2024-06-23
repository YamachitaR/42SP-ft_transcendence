# pong/consumers.py

import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class PongConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.paddle1 = { 'x': 362.5, 'y': 390, 'width': 75, 'height': 10 }
        self.paddle2 = { 'x': 362.5, 'y': 10, 'width': 75, 'height': 10 }
        self.ball = { 'x': 400, 'y': 200, 'radius': 10, 'dx': 2, 'dy': 2 }
        self.scores = {'player1': 0, 'player2': 0}
        self.players = []
        self.room_group_name = 'pong'

    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        if len(self.players) < 2:
            self.players.append(self.channel_name)
            self.role = 'player1' if len(self.players) == 1 else 'player2'
            self.send_role()
        else:
            self.close()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        if self.channel_name in self.players:
            self.players.remove(self.channel_name)

    def receive(self, text_data):
        data = json.loads(text_data)
        paddle_move = data.get('paddle_move', None)
        player = data.get('player', None)
        ball = data.get('ball', None)
        scores = data.get('scores', None)

        if paddle_move and player:
            if player == 'player1':
                if paddle_move == 'right':
                    self.paddle1['x'] = min(self.paddle1['x'] + 7, 800 - self.paddle1['width'])
                elif paddle_move == 'left':
                    self.paddle1['x'] = max(self.paddle1['x'] - 7, 0)
            elif player == 'player2':
                if paddle_move == 'right':
                    self.paddle2['x'] = min(self.paddle2['x'] + 7, 800 - self.paddle2['width'])
                elif paddle_move == 'left':
                    self.paddle2['x'] = max(self.paddle2['x'] - 7, 0)

        if ball:
            self.ball = ball
        if scores:
            self.scores = scores

        self.broadcast_game_state()

    def send_role(self):
        self.send(text_data=json.dumps({
            'role': self.role
        }))

    def broadcast_game_state(self):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'game_state',
                'paddle1': self.paddle1,
                'paddle2': self.paddle2,
                'ball': self.ball,
                'scores': self.scores,
            }
        )

    def game_state(self, event):
        self.send(text_data=json.dumps({
            'paddle1': event['paddle1'],
            'paddle2': event['paddle2'],
            'ball': event['ball'],
            'scores': event['scores'],
        }))
