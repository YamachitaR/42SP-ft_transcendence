

# myapp/urls.py
from django.urls import path
from .views import register, UserStatusAPI
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', auth_views.LoginView.as_view(template_name='login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('api/user_status/', UserStatusAPI.as_view(), name='api_user_status'),
]
