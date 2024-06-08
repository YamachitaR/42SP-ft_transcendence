# realtime/routing.py


from channels.routing import ProtocolTypeRouter, URLROUTER
from channels.auth import AuthMiddlewareStack


from chat.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    'websocket': AuthMiddlewareStack(
        URLRouter(
            websocket_urlpatterns
        )
    ),

})