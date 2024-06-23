Para resolver o erro "Page not found (404)" ao tentar acessar `index.html`, você deve garantir que o arquivo HTML esteja corretamente servido pelo Django. Abaixo estão os passos para configurar a entrega de arquivos estáticos no Django e servir o `index.html` corretamente.

### Passos para Configurar e Servir Arquivos Estáticos

1. **Configurar as Variáveis de Arquivo Estático no `settings.py`**:
   Adicione as seguintes linhas no seu `settings.py` para configurar os arquivos estáticos:

   ```python
   import os

   # Configurações de arquivos estáticos
   STATIC_URL = '/static/'
   STATICFILES_DIRS = [
       os.path.join(BASE_DIR, 'static'),
   ]
   ```

2. **Criar a Pasta `static`**:
   Crie uma pasta chamada `static` na raiz do seu projeto (onde o arquivo `manage.py` está localizado).

3. **Adicionar o Arquivo `index.html` na Pasta `static`**:
   Coloque o arquivo `index.html` dentro da pasta `static`.

4. **Configurar o `urls.py` para Servir Arquivos Estáticos**:
   Modifique seu `urls.py` para incluir as configurações de arquivos estáticos durante o desenvolvimento.

   ```python
   from django.conf import settings
   from django.conf.urls.static import static
   from django.urls import path

   urlpatterns = [
       # Suas outras URLs aqui
   ]

   if settings.DEBUG:
       urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
   ```

### Exemplo Completo

Aqui está um resumo da configuração completa:

#### 1. Estrutura de Diretórios:
```
your_project/
├── your_app/
│   ├── consumers.py
│   ├── routing.py
│   ├── ...
├── static/
│   └── index.html
├── your_project/
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   ├── ...
├── manage.py
```

#### 2. `settings.py`:
```python
import os

INSTALLED_APPS = [
    ...
    'channels',
    ...
]

ASGI_APPLICATION = 'your_project_name.asgi.application'

# Configurações de arquivos estáticos
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Sem Redis (usando o backend de canais padrão baseado em memória)
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}
```

#### 3. `asgi.py`:
```python
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import your_app.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'your_project_name.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            your_app.routing.websocket_urlpatterns
        )
    ),
})
```

#### 4. `routing.py`:
```python
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/some_path/$', consumers.YourConsumer.as_asgi()),
]
```

#### 5. `consumers.py`:
```python
import json
from channels.generic.websocket import AsyncWebsocketConsumer

# Armazenamento em memória para rastrear conexões
connected_users = []

class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = 'some_room'
        self.room_group_name = 'some_group'

        # Adicionar conexão à lista
        self.user_id = len(connected_users) + 1
        connected_users.append(self.user_id)

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Remover conexão da lista
        connected_users.remove(self.user_id)

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Verificar se a tecla pressionada é "a"
        if message == 'a':
            # Enviar número correspondente de volta ao cliente
            await self.send(text_data=json.dumps({
                'message': str(self.user_id)
            }))
        else:
            # Enviar mensagem ao grupo de chat
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message
                }
            )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
```

#### 6. `index.html` (dentro da pasta `static`):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Test</title>
</head>
<body>
    <h1>WebSocket Test</h1>
    <p>Status: <span id="status">Disconnected</span></p>
    <button id="connectBtn">Connect</button>
    <button id="sendBtn">Send "a"</button>
    <p>Received Message: <span id="message"></span></p>

    <script>
        let socket;

        document.getElementById('connectBtn').onclick = () => {
            // Connect to the WebSocket server
            socket = new WebSocket('ws://' + window.location.host + '/ws/some_path/');

            socket.onopen = () => {
                document.getElementById('status').innerText = 'Connected';
            };

            socket.onclose = () => {
                document.getElementById('status').innerText = 'Disconnected';
            };

            socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                document.getElementById('message').innerText = data.message;
            };

            socket.onerror = (error) => {
                console.error('WebSocket Error:', error);
            };
        };

        document.getElementById('sendBtn').onclick = () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                // Send the character "a" to the WebSocket server
                socket.send(JSON.stringify({ 'message': 'a' }));
            } else {
                alert('WebSocket is not connected.');
            }
        };
    </script>
</body>
</html>
```

### Como Testar

1. **Inicie o servidor Django**:
   Certifique-se de que seu servidor Django está rodando.

   ```sh
   python manage.py runserver
   ```

2. **Abra o arquivo HTML**:
   Abra o arquivo `index.html` no seu navegador, navegando para `http://localhost:8000/static/index.html`.

3. **Conectar e Enviar Mensagem**:
   - Clique no botão "Connect" para se conectar ao WebSocket.
   - Clique no botão "Send 'a'" para enviar a mensagem "a" e receber o número correspondente.

Se precisar de mais alguma ajuda ou tiver dúvidas adicionais, estou à disposição!