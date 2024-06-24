# game/views.py
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Game, Player

def game_view(request, game_id):
    game = get_object_or_404(Game, id=game_id)
    return render(request, 'game/game.html', {'game': game})

def update_score(request):
    if request.method == 'POST':
        game_id = request.POST.get('game_id')
        player_id = request.POST.get('player_id')
        points = int(request.POST.get('points'))

        game = get_object_or_404(Game, id=game_id)
        player = get_object_or_404(Player, id=player_id)

        if player in [game.player1, game.player2]:
            player.score += points
            player.save()
            return JsonResponse({'status': 'success', 'new_score': player.score})

    return JsonResponse({'status': 'error'})
