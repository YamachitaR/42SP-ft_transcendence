import json
from channels.generic.websocket import WebsocketConsumer

class PongConsumer(WebsocketConsumer):
    clients = {}

    def connect(self):
        self.accept()
        self.client_id = None

    def disconnect(self, close_code):
        if self.client_id in self.clients:
            del self.clients[self.client_id]

    def receive(self, text_data):
        data = json.loads(text_data)
        if self.client_id is None:
            self.client_id = data['clientId']
            self.clients[self.client_id] = self

        # Determine which paddle to move based on clientId
        if self.client_id in self.clients:
            if self.clients[self.client_id] == self:
                left_paddle_y = data['leftPaddleY']
                right_paddle_y = data['rightPaddleY']
                
                # Broadcast the move to all clients
                for client in self.clients.values():
                    client.send(text_data=json.dumps({
                        'type': 'update',
                        'leftPaddleY': left_paddle_y,
                        'rightPaddleY': right_paddle_y,
                    }))
