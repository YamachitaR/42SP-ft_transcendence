# app/urls.py
from django.urls import path, include
from .views.auth import RegisterView, LoginView, LogoutView, CheckAuthView
from .views import views

urlpatterns = [
    path('', views.home, name='home'),
	path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
	path('logout/', LogoutView.as_view(), name='logout'),
	path('check-auth/', CheckAuthView.as_view(), name='check_auth'),
]
