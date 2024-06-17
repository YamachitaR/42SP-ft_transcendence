# app/urls.py
from django.urls import path, include
from .views import views, crud

urlpatterns = [
    path('', views.home, name='home'),
	path('register/', crud.register, name='register'),
	path('login/', crud.login, name='login')
]
