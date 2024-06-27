from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from ..models import GameHistory
from ..serializers import GameHistorySerializer
import logging

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def GameHistoryCreateView(request):
    try:
        user = request.user
        data = request.data.copy()  # Cria uma cópia dos dados da solicitação
        data['user'] = user.id  # Adiciona o ID do usuário autenticado aos dados
        serializer = GameHistorySerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=user)
            logger.debug(f"Histórico de jogo salvo para o usuário: {user}")
            return Response(serializer.data, status=201)
        logger.error(f"Erro de validação: {serializer.errors}")
        return Response(serializer.errors, status=400)
    except Exception as e:
        logger.error(f"Erro ao salvar histórico de jogo: {str(e)}")
        return Response({'error': str(e)}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listGameHistory(request, user_id):
    try:
        logger.debug(f"Recebendo solicitação para listar histórico de jogos do usuário com ID: {user_id}")
        game_history = GameHistory.objects.filter(user_id=user_id)
        serializer = GameHistorySerializer(game_history, many=True)
        return Response(serializer.data)
    except Exception as e:
        logger.error(f"Erro ao listar histórico de jogos: {str(e)}")
        return Response({'error': str(e)}, status=400)
