# myapp/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .forms import CustomUserCreationForm
from .utils import is_user_online

# View para registrar novos usuários
def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('user_status')
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

# View para exibir a página de status do usuário
def user_status_view(request):
    return render(request, 'status.html')

# API para retornar o status do usuário em formato JSON
class UserStatusAPI(APIView):
    def get(self, request, format=None):
        User = get_user_model()
        users = User.objects.all()
        users_status = {user.username: is_user_online(user) for user in users}
        return Response(users_status)
