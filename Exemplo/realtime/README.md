


## Instalação 
~~~ bash
pip install django django-channels django-bootstrap4 channels-redis
~~~

O redis seria um tipo de banco de dados especial pois trabalha os dados na memoria, somente redis é capaz conversar com channels


## Criando projeto e aplicação 

~~~ bash
django-admin startproject realtime 
cd realtime
django-admin startapp chat
~~~

## Configuração 

~~~ python 
import os

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'channels'.
    'bootstrap4',
    'chat',
...
]

TEMPLATES = [
    {
        ...
        'DIRS': ['templates'],
        ...
    }]


MEDIA_URL = '/media/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


# Especifica do Channels 

# Por padrão o Django faz aplicação WSGI, mas ele não suporta realtime
# praticamente estamos avisando para Django que temos uma aplicação SGI
ASGI_APPLICATION = 'realtime.routing.application'

# Estamos dizendo para aplicação do Channel
# que vamos utilizar redis na porta 6379
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChanelLayer',
        'CONFIG': {
            'hosts':[('127.0.0.1', 6379)]
        },
    },
}

~~~