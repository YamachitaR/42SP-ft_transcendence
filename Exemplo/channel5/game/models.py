# game/models.py
from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=100)
    score = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Game(models.Model):
    player1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player1')
    player2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player2')
    game_state = models.TextField()  # Para armazenar o estado do jogo
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.player1} vs {self.player2}'
