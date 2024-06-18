# app/urls.py
from django.urls import path, include
from .views.auth import RegisterView, LoginView
from .views import views

urlpatterns = [
    path('', views.home, name='home'),
	path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),

]
