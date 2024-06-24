
# game/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('game/<int:game_id>/', views.game_view, name='game_view'),
    path('update_score/', views.update_score, name='update_score'),
]
