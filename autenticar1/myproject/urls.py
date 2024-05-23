from django.contrib import admin
from django.urls import path, include
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('oauth/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout, name='logout'),
    path('callback/', views.callback_view, name='callback'),
    path('', views.home, name='home'),
]