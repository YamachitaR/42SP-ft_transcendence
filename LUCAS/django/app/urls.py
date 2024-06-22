# app/urls.py
from django.urls import path, include
from .views.auth import RegisterView, LoginView, LogoutView, CheckAuthView, external_login, external_callback
from .views.crud import get_user_info, update_user, UserPreferencesView
from .views import views

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-auth/', CheckAuthView.as_view(), name='check_auth'),
    path('login-external/', external_login, name='external_login'),
    path('callback/', external_callback, name='external_callback'),
    path('get-user-info/', get_user_info, name='get_user_info'),
    path('update-user/', update_user, name='update_user'),
    path('user-preferences/', UserPreferencesView, name='user-preferences'),
]
