# myapp/views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import CustomUserCreationForm
from django.contrib.auth import get_user_model
from .utils import is_user_online

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

def user_status_view(request):
    User = get_user_model()
    users = User.objects.all()
    users_status = {user: is_user_online(user) for user in users}
    return render(request, 'user_status.html', {'users_status': users_status})
