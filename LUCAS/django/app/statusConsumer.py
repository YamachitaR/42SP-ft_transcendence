from channels.generic.websocket import WebsocketConsumer
import json

class SimpleConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.send(text_data=json.dumps({
            'message': 'conectado'
        }))

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        pass
