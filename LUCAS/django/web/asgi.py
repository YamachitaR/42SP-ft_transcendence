import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import re_path
from app.statusConsumer import SimpleConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
django.setup()

# Definindo o roteamento WebSocket
websocket_urlpatterns = [
    re_path(r'ws/status/(?P<user_id>\d+)/$', SimpleConsumer.as_asgi()),
]

# Configurando a aplicação ASGI
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": URLRouter(
        websocket_urlpatterns
    ),
})
