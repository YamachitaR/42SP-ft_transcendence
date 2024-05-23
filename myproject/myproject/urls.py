from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout, name='logout'),
    path('callback/', views.callback_view, name='callback'),
    path('', views.home, name='home'),
]
