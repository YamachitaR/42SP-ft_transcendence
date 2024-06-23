import json
from channels.generic.websocket import WebsocketConsumer

class PongConsumer(WebsocketConsumer):
    clients = {}
    next_paddle = 'left'  # Start with the left paddle

    def connect(self):
        self.accept()
        self.client_id = None

    def disconnect(self, close_code):
        if self.client_id in self.clients:
            del self.clients[self.client_id]

    def receive(self, text_data):
        data = json.loads(text_data)
        if self.client_id is None:
            self.client_id = data.get('clientId')
            self.clients[self.client_id] = self
            self.assign_paddle()

        left_paddle_y = data['leftPaddleY']
        right_paddle_y = data['rightPaddleY']

        for client in self.clients.values():
            client.send(text_data=json.dumps({
                'type': 'update',
                'leftPaddleY': left_paddle_y,
                'rightPaddleY': right_paddle_y,
            }))

    def assign_paddle(self):
        paddle_side = self.next_paddle
        self.send(text_data=json.dumps({
            'type': 'assign',
            'paddleSide': paddle_side,
        }))
        if self.next_paddle == 'left':
            self.next_paddle = 'right'
        else:
            self.next_paddle = 'left'
