from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from django.core.asgi import get_asgi_application
from django.urls import re_path
import os

from mainApp.consumers.gameConsumer import GameConsumer
from mainApp.consumers.notificationsConsumer import NotificationConsumer
from mainApp.consumers.statusConsumer import StatusConsumer
from mainApp.consumers.chatConsumer import ChatConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainProject.settings')

websocket_urlpatterns = [
	re_path(r'ws/game/(?P<game_id>[\w-]+)/$', GameConsumer.as_asgi()),
	re_path(r'wss/game/(?P<game_id>[\w-]+)/$', GameConsumer.as_asgi()),
	re_path(r'ws/notifications/$', NotificationConsumer.as_asgi()),
	re_path(r'ws/status/$', StatusConsumer.as_asgi()),
	re_path(r"ws/chat/(?P<room_id>[\w-]+)/$", ChatConsumer.as_asgi()),
]

django_asgi_app = get_asgi_application()

application = ProtocolTypeRouter({
	"http": django_asgi_app,
	"websocket": AuthMiddlewareStack(
		URLRouter(
			websocket_urlpatterns
		)
	),
})