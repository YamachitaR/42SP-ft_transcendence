# chat/routing.py

# Esse routing.py seria "urls.py" so que para Channel, ou seja, rota especifica para o Channels

#esse re_path seria mesmo que o path porem ele usar expressão regulares 
from django.urls import re_path

# consumers que vai fazer a ponte entre o navegador e a nossa aplicação 
from .consumers import ChatConsumer


# definindo a rota
websocket_urlpatterns= [
    re_path(r'ws/chat/(?P<nome_sala>\w+)/$', ChatConsumer),
]



# ws -> websocket
# usando expressão regulares para nome da sala
