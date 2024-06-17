# app/urls.py
from django.urls import path, include
from .views import views, crud

urlpatterns = [
    path('', views.home, name='home'),
	path('cadastro/', crud.cadastro, name='cadastro')
]
