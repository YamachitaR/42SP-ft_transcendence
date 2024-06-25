import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from django.urls import re_path
from app.statusConsumer import SimpleConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web.settings')
django.setup()

websocket_urlpatterns = [
    re_path(r'ws/status/', SimpleConsumer.as_asgi()),
]

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),
})

