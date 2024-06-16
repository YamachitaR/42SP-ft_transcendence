# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.item_list, name='item_list'),
    path('create/', views.item_create, name='item_create'),
    path('update/<int:id>/', views.item_update, name='item_update'),
    path('delete/<int:id>/', views.item_delete, name='item_delete'),
]
