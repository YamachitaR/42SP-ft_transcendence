import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
django.setup()  # Certifique-se de que o Django está inicializado

# Definindo o roteamento WebSocket
def get_websocket_urlpatterns():
    from django.urls import re_path
    from app.statusConsumer import SimpleConsumer
    from app.chatConsumer import ChatConsumer

    return [
        re_path(r'ws/status/(?P<user_id>\d+)/$', SimpleConsumer.as_asgi()),
        re_path(r'ws/chat/join_(?P<user1_id>\d+)_(?P<user2_id>\d+)/$', ChatConsumer.as_asgi()),
    ]

# Configurando a aplicação ASGI
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            get_websocket_urlpatterns()
        )
    ),
})
