# myapp/urls.py
from django.urls import path
from .views import user_status_view, register
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('status/', user_status_view, name='user_status'),
    path('register/', register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]
