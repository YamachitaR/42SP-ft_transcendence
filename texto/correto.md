Para implementar a autenticação da 42 usando Django e OAuth2 de forma mais padronizada, podemos usar a biblioteca `django-oauth-toolkit`. Essa biblioteca facilita a integração com provedores de autenticação OAuth2, como a API da 42.

Aqui estão os passos detalhados para configurar essa integração:

### Passo 1: Instalar Dependências

Instale o Django e a biblioteca `django-oauth-toolkit`:

```bash
pip install django django-oauth-toolkit requests python-dotenv
```

### Passo 2: Configurar o Projeto Django

#### 2.1. Criar um Novo Projeto Django

Se você ainda não tem um projeto Django, crie um novo:

```bash
django-admin startproject myproject
cd myproject
django-admin startapp myapp
```

### Passo 3: Configurar Variáveis de Ambiente

#### 3.1. Criar o Arquivo `.env`

Na raiz do seu projeto, crie um arquivo `.env` e adicione as variáveis de ambiente:

```plaintext
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:8000/callback/
```

### Passo 4: Configurar `settings.py`

Edite o arquivo `settings.py` para carregar as variáveis de ambiente e configurar o Django OAuth Toolkit:

**myproject/settings.py**

```python
import os
from pathlib import Path
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'your_secret_key'

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'oauth2_provider',  # Django OAuth Toolkit
    'myapp',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'myproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'myproject.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_URL = '/static/'

LOGIN_URL = '/login/'
LOGOUT_URL = '/logout/'
LOGIN_REDIRECT_URL = '/'
LOGOUT_REDIRECT_URL = '/'

# Carregar as variáveis de ambiente
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = os.getenv('REDIRECT_URI')

# Configuração para o Django OAuth Toolkit
OAUTH2_PROVIDER = {
    'SCOPES': {'read': 'Read scope', 'write': 'Write scope'}
}
```

### Passo 5: Configurar URLs

Edite o arquivo `urls.py` do seu projeto para incluir as rotas de login e callback.

**myproject/urls.py**

```python
from django.contrib import admin
from django.urls import path, include
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('oauth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('login/', views.login_view, name='login'),
    path('callback/', views.callback_view, name='callback'),
    path('', views.home, name='home'),
]
```

### Passo 6: Criar as Visualizações

**myapp/views.py**

```python
import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User

def home(request):
    return render(request, 'myapp/home.html')

def login_view(request):
    # Redireciona o usuário para a página de login da 42
    authorize_url = (
        f"https://api.intra.42.fr/oauth/authorize?client_id={settings.CLIENT_ID}"
        f"&redirect_uri={settings.REDIRECT_URI}&response_type=code&scope=public"
    )
    return redirect(authorize_url)

def callback_view(request):
    # Obtém o código de autorização da URL de redirecionamento
    code = request.GET.get('code')
    token_url = "https://api.intra.42.fr/oauth/token"
    token_data = {
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'code': code,
        'redirect_uri': settings.REDIRECT_URI,
    }
    
    # Solicita o token de acesso usando o código de autorização
    token_response = requests.post(token_url, data=token_data)
    token_json = token_response.json()
    access_token = token_json.get('access_token')

    # Usa o token de acesso para obter informações do usuário
    user_info_url = "https://api.intra.42.fr/v2/me"
    user_info_response = requests.get(
        user_info_url, headers={'Authorization': f'Bearer {access_token}'}
    )
    user_info = user_info_response.json()

    # Verifica se o usuário já existe no banco de dados
    try:
        user = User.objects.get(username=user_info['login'])
    except User.DoesNotExist:
        # Cria um novo usuário se ele não existir
        user = User.objects.create_user(
            username=user_info['login'],
            first_name=user_info['first_name'],
            last_name=user_info['last_name'],
            email=user_info['email'],
        )
    
    # Faz o login do usuário
    login(request, user)

    # Renderiza um template que fecha o pop-up e redireciona a página principal
    return render(request, 'myapp/close_popup.html')
```

### Passo 7: Criar o Template para Fechar o Pop-up

**templates/myapp/close_popup.html**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Close Popup</title>
    <script type="text/javascript">
        window.opener.location.reload(); // Recarrega a janela principal
        window.close(); // Fecha o pop-up
    </script>
</head>
<body>
    <p>Logging in...</p>
</body>
</html>
```

### Passo 8: Criar o Template com o Botão de Login

**templates/myapp/home.html**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
    <script type="text/javascript">
        function openLoginPopup() {
            var width = 600;
            var height = 700;
            var left = (screen.width - width) / 2;
            var top = (screen.height - height) / 2;
            var url = "{% url 'login' %}";
            var params = 'menubar=no,toolbar=no,status=no,width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
            window.open(url, 'Login with 42', params);
        }
    </script>
</head>
<body>
    {% if user.is_authenticated %}
        <p>Welcome, {{ user.username }}!</p>
        <p><a href="{% url 'logout' %}">Logout</a></p>
    {% else %}
        <p>You are not logged in.</p>
        <p><button onclick="openLoginPopup()">Login with 42</button></p>
    {% endif %}
</body>
</html>
```

### Passo 9: Migrar e Executar o Servidor

Execute as migrações e inicie o servidor:

```bash
python manage.py migrate
python manage.py runserver
```

### Resumo do Fluxo de Autenticação

1. **Usuário clica em "Login with 42"**:
   - O botão de login abre um pop-up com a URL de login da 42.

2. **Usuário autentica e autoriza a aplicação na 42**:
   - Após a autenticação, a 42 redireciona o usuário para a `REDIRECT_URI` com um código de autorização.

3. **Aplicação recebe o código de autorização**:
   - A view `callback_view` usa este código para obter um token de acesso.

4. **Aplicação obtém informações do usuário**:
   - A view `callback_view` usa o token de acesso para obter informações do usuário da API da 42.

