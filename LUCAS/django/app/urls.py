# app/urls.py
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name='home'),
	path('<path:any>', views.home, name='home')
]
