
## Cookbook: Implementando Login com a API da 42 em Django

### Requisitos

- Django
- requests
- python-dotenv

### Passo 1: Instalar Dependências

Instale Django, requests e python-dotenv:

```bash
pip install django requests python-dotenv
```

### Passo 2: Configurar o Projeto Django

#### 2.1. Criar um Novo Projeto Django

Se você ainda não tem um projeto Django, crie um novo:

```bash
django-admin startproject myproject
cd myproject
django-admin startapp myapp
```

#### 2.2. Configurar o Arquivo `.env`

Crie um arquivo `.env` na raiz do seu projeto e adicione as variáveis de ambiente:

```plaintext
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=http://localhost:8000/callback/
```

#### 2.3. Carregar Variáveis de Ambiente no `settings.py`

Edite o arquivo `settings.py` do seu projeto para carregar as variáveis de ambiente:

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
```

### Passo 3: Configurar URLs

Configure as URLs no seu projeto para incluir as rotas de login e callback.

**myproject/urls.py**

```python
from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout, name='logout'),
    path('callback/', views.callback_view, name='callback'),
    path('', views.home, name='home'),
]
```

### Passo 4: Criar as Visualizações

Crie as visualizações necessárias para o login e callback.

**myapp/views.py**

```python
import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.models import User

def home(request):
    return render(request, 'myapp/home.html')

def login_view(request):
    authorize_url = (
        f"https://api.intra.42.fr/oauth/authorize?client_id={settings.CLIENT_ID}"
        f"&redirect_uri={settings.REDIRECT_URI}&response_type=code&scope=public"
    )
    return redirect(authorize_url)

def logout(request):
    auth_logout(request)
    return redirect('/')

def callback_view(request):
    code = request.GET.get('code')
    token_url = "https://api.intra.42.fr/oauth/token"
    token_data = {
        'grant_type': 'authorization_code',
        'client_id': settings.CLIENT_ID,
        'client_secret': settings.CLIENT_SECRET,
        'code': code,
        'redirect_uri': settings.REDIRECT_URI,
    }
    token_response = requests.post(token_url, data=token_data)
    token_json = token_response.json()
    access_token = token_json.get('access_token')

    user_info_url = "https://api.intra.42.fr/v2/me"
    user_info_response = requests.get(
        user_info_url, headers={'Authorization': f'Bearer {access_token}'}
    )
    user_info = user_info_response.json()

    try:
        user = User.objects.get(username=user_info['login'])
    except User.DoesNotExist:
        user = User.objects.create_user(
            username=user_info['login'],
            first_name=user_info['first_name'],
            last_name=user_info['last_name'],
            email=user_info['email'],
        )
    login(request, user)

    return redirect(settings.LOGIN_REDIRECT_URL)
```

### Passo 5: Criar os Templates

Crie os templates necessários para a interface de usuário.

**templates/myapp/home.html**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
</head>
<body>
    {% if user.is_authenticated %}
        <p>Welcome, {{ user.username }}!</p>
        <p><a href="{% url 'logout' %}">Logout</a></p>
    {% else %}
        <p>You are not logged in.</p>
        <p><a href="{% url 'login' %}">Login with 42</a></p>
    {% endif %}
</body>
</html>
```

### Passo 6: Migrar e Executar o Servidor

Execute as migrações e inicie o servidor:

```bash
python manage.py migrate
python manage.py runserver
```

### Resumo do Fluxo de Autenticação

1. **Usuário Clica em "Login with 42"**:
   - A função `login_view` redireciona o usuário para a página de autorização da 42.
  
2. **Usuário Autentica e Autoriza a Aplicação**:
   - A 42 redireciona o usuário de volta para o `REDIRECT_URI` com um código de autorização.

3. **Aplicação Recebe o Código de Autorização**:
   - A função `callback_view` usa este código para obter um token de acesso.

4. **Aplicação Obtém Informações do Usuário**:
   - A função `callback_view` usa o token de acesso para obter informações do usuário da API da 42.

5. **Login do Usuário**:
   - Se o usuário já existe, ele é autenticado. Caso contrário, um novo usuário é criado e autenticado.

Este cookbook fornece uma implementação passo a passo para configurar e implementar o login com a API da 42 em uma aplicação Django.