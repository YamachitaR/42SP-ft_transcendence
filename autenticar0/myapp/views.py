import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import login
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
    # Obtém o código de autorização que foi passado como parâmetro na URL de redirecionamento
    code = request.GET.get('code')
    
    # Define a URL para obter o token de acesso da API da 42
    token_url = "https://api.intra.42.fr/oauth/token"
    
    # Dados necessários para a solicitação do token de acesso
    token_data = {
        'grant_type': 'authorization_code',  # Tipo de concessão OAuth2
        'client_id': settings.CLIENT_ID,     # ID do cliente da sua aplicação (obtido do arquivo .env)
        'client_secret': settings.CLIENT_SECRET,  # Segredo do cliente da sua aplicação (obtido do arquivo .env)
        'code': code,                        # Código de autorização recebido do redirecionamento
        'redirect_uri': settings.REDIRECT_URI,  # URI de redirecionamento registrado na aplicação
    }
    
    # Faz uma solicitação POST para a URL do token para obter o token de acesso
    token_response = requests.post(token_url, data=token_data)
    
    # Converte a resposta em JSON
    token_json = token_response.json()
    
    # Obtém o token de acesso da resposta JSON
    access_token = token_json.get('access_token')

    # Define a URL para obter informações do usuário autenticado
    user_info_url = "https://api.intra.42.fr/v2/me"
    
    # Faz uma solicitação GET para a URL de informações do usuário com o token de acesso no cabeçalho
    user_info_response = requests.get(
        user_info_url, headers={'Authorization': f'Bearer {access_token}'}
    )
    
    # Converte a resposta em JSON
    user_info = user_info_response.json()

    # Verifica se o usuário já existe no banco de dados Django
    try:
        user = User.objects.get(username=user_info['login'])
    except User.DoesNotExist:
        # Se o usuário não existir, cria um novo usuário com as informações recebidas da API da 42
        user = User.objects.create_user(
            username=user_info['login'],
            first_name=user_info['first_name'],
            last_name=user_info['last_name'],
            email=user_info['email'],
        )
    
    # Faz o login do usuário no Django
    login(request, user)

    # Redireciona o usuário para a URL definida em LOGIN_REDIRECT_URL
    return redirect(settings.LOGIN_REDIRECT_URL)


