

# Create your views here.
import requests
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.contrib.auth import logout as auth_logout

def home(request):
    return render(request, 'myapp/home.html')

def login_view(request):
    # Redireciona o usuário para a página de login da 42
    authorize_url = (
        f"https://api.intra.42.fr/oauth/authorize?client_id={settings.CLIENT_ID}"
        f"&redirect_uri={settings.REDIRECT_URI}&response_type=code&scope=public"
    )
    return redirect(authorize_url)


def logout(request):
    auth_logout(request)
    return redirect('/')

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

    # Verifica se o pop-up está aberto e define o redirecionamento apropriado
    if not request.GET.get('popup'):
        return render(request, 'myapp/close_popup.html')
    else:
         # Renderiza um template que fecha o pop-up e redireciona a página principal
        return redirect(settings.LOGIN_REDIRECT_URL)

   

