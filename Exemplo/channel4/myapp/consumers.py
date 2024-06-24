import json
from channels.generic.websocket import WebsocketConsumer

class PongConsumer(WebsocketConsumer):
    clients = {}
    game_state = {
        'leftPaddleY': 250,  # Posição inicial da raquete esquerda
        'rightPaddleY': 250, # Posição inicial da raquete direita
    }
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

        if data['type'] == 'move':
            if self.clients[self.client_id] == self:
                self.game_state['leftPaddleY'] = data['leftPaddleY']
                self.game_state['rightPaddleY'] = data['rightPaddleY']
                self.broadcast_game_state()

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

    def broadcast_game_state(self):
        for client in self.clients.values():
            client.send(text_data=json.dumps({
                'type': 'update',
                'leftPaddleY': self.game_state['leftPaddleY'],
                'rightPaddleY': self.game_state['rightPaddleY'],
            }))
