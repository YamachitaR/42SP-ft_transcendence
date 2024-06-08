from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User
import json

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        print("Recebido login:",email)
        try:
            if User.objects.filter(email=email).exists():
                nome = User.objects.get(email=email).username
                user = authenticate(username=nome, password=password)
            else:
                return JsonResponse({'success': False, 'error': 'Email not found'})

            if user is not None:
       
                login(request, user)
                print("Login bem-sucedido")
                return JsonResponse({'success': True})
            else:
                print("Falha na autenticação")
                return JsonResponse({'success': False})
        except User.DoesNotExist:
            print("Usuário não encontrado")
            return JsonResponse({'success': False})
    return JsonResponse({'success': False})


@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data['email']
        password = data['password']
        print("registttttttttttttttro")
        if not User.objects.filter(username=email).exists():
            User.objects.create_user(username=email, email=email, password=password)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Email already registered'})
    return JsonResponse({'success': False, 'error': 'Invalid request method'})




def index(request):
    return render(request, 'authapp/index.html')

def logout_view(request):
    logout(request)
    return JsonResponse({'success': True})

def check_login(request):
    if request.user.is_authenticated:
        return JsonResponse({'authenticated': True, 'username': request.user.username})
    return JsonResponse({'authenticated': False})
