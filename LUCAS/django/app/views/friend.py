from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..models import Amizade, CustomUser
from ..serializers import AmizadeSerializer
from django.db import models
import logging


logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enviar_solicitacao_amizade(request):
    amigo_id = request.data.get('amigo_id')
    try:
        amigo = CustomUser.objects.get(id=amigo_id)
        user = request.user

        if Amizade.objects.filter(user=user, amigo=amigo).exists():
            return Response({'message': 'Solicitação de amizade já enviada, aguardando aceitação'}, status=status.HTTP_200_OK)

        if Amizade.objects.filter(user=amigo, amigo=user).exists():
            return Response({'message': 'Já existe uma solicitação de amizade recebida deste usuário'}, status=status.HTTP_200_OK)

        Amizade.objects.create(user=user, amigo=amigo, aceita=False)
        return Response({'message': 'Solicitação de amizade enviada com sucesso!'}, status=status.HTTP_201_CREATED)

    except CustomUser.DoesNotExist:
        return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao enviar solicitação de amizade: {e}")
        return Response({'error': f'Erro ao enviar solicitação de amizade: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def gerenciar_solicitacao_amizade(request, pk, action):
    try:
        amizade = Amizade.objects.get(id=pk, amigo=request.user)
    except Amizade.DoesNotExist:
        return Response({'error': 'Solicitação de amizade não encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if action == 'aceitar':
        amizade.aceita = True
        amizade.save()
        return Response({'status': 'Amizade aceita'}, status=status.HTTP_200_OK)
    elif action == 'recusar':
        amizade.delete()
        return Response({'status': 'Amizade recusada'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Ação inválida'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_solicitacoes_pendentes(request):
    solicitacoes = Amizade.objects.filter(amigo=request.user, aceita=False)
    serializer = AmizadeSerializer(solicitacoes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_amigos(request):
    try:
        # Obter todas as amizades onde o usuário atual é o solicitante ou o amigo e a amizade foi aceita
        amizades = Amizade.objects.filter(models.Q(user=request.user) | models.Q(amigo=request.user), aceita=True)

        if not amizades.exists():
            return Response([], status=status.HTTP_200_OK)

        amigos_ids = set()
        for amizade in amizades:
            if amizade.user == request.user:
                amigos_ids.add(amizade.amigo.id)
            else:
                amigos_ids.add(amizade.user.id)

        # Obter todos os usuários amigos
        amigos = CustomUser.objects.filter(id__in=amigos_ids)

        # Construir a resposta
        amigos_data = [{'id': amigo.id, 'name': amigo.username, 'email': amigo.email} for amigo in amigos]

        return Response(amigos_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': f'Erro ao listar amigos: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verificar_amizade(request, amigo_id):
    try:
        amigo = CustomUser.objects.get(id=amigo_id)
        amizade_existe = Amizade.objects.filter(
            (models.Q(user=request.user) & models.Q(amigo=amigo) & models.Q(aceita=True)) |
            (models.Q(user=amigo) & models.Q(amigo=request.user) & models.Q(aceita=True))
        ).exists()

        return Response({'amizade': amizade_existe}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': f'Erro ao verificar amizade: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def aprovar_solicitacao_amizade(request):
    solicitacao_id = request.data.get('solicitacao_id')
    try:
        solicitacao = Amizade.objects.get(id=solicitacao_id, amigo=request.user)
        solicitacao.aceita = True
        solicitacao.save()
        return Response({'message': 'Solicitação de amizade aprovada com sucesso!'}, status=status.HTTP_200_OK)
    except Amizade.DoesNotExist:
        return Response({'error': 'Solicitação de amizade não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao aprovar solicitação de amizade: {e}")
        return Response({'error': f'Erro ao aprovar solicitação de amizade: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
