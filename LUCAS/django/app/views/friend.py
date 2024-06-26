from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from ..models import Amizade, CustomUser
from ..serializers import AmizadeSerializer, AmizadeEnviadaSerializer, AmigoListSerializer
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

        if user == amigo:
            return Response({'message': 'Você não pode enviar uma solicitação de amizade para você mesmo'}, status=status.HTTP_400_BAD_REQUEST)

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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_solicitacoes_pendentes(request):
    solicitacoes = Amizade.objects.filter(amigo=request.user, aceita=False)
    serializer = AmizadeSerializer(solicitacoes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_solicitacoes_enviadas(request):
    solicitacoes = Amizade.objects.filter(user=request.user, aceita=False)
    serializer = AmizadeEnviadaSerializer(solicitacoes, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_amigos(request):
    try:
        # Obter todas as amizades onde o usuário atual é o solicitante ou o amigo e a amizade foi aceita
        amizades = Amizade.objects.filter(
            models.Q(user=request.user) | models.Q(amigo=request.user), aceita=True
        )

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

        # Serializar os dados dos amigos com o campo 'bloqueado'
        serializer_context = {'request': request}
        amigos_data = AmigoListSerializer(amigos, many=True, context=serializer_context).data

        return Response(amigos_data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error(f"Erro ao listar amigos: {e}")
        return Response({'error': f'Erro ao listar amigos: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)








@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_amigos_online(request):
    try:
        # Adicionar log de depuração
        logger.debug("Iniciando a listagem de amigos online para o usuário: %s", request.user)

        # Obter todas as amizades onde o usuário atual é o solicitante ou o amigo e a amizade foi aceita
        amizades = Amizade.objects.filter(
            models.Q(user=request.user) | models.Q(amigo=request.user), aceita=True
        )

        logger.debug("Amizades encontradas: %s", amizades)

        if not amizades.exists():
            logger.debug("Nenhuma amizade encontrada.")
            return Response([], status=status.HTTP_200_OK)

        amigos_ids = set()
        for amizade in amizades:
            if amizade.user == request.user:
                amigos_ids.add(amizade.amigo.id)
            else:
                amigos_ids.add(amizade.user.id)

        logger.debug("IDs dos amigos: %s", amigos_ids)

        # Obter todos os usuários amigos que estão online
        amigos_online = CustomUser.objects.filter(id__in=amigos_ids, is_online=True)
        logger.debug("Amigos online encontrados: %s", amigos_online)

        # Serializar os dados dos amigos online
        amigos_online_data = AmigoListSerializer(amigos_online, many=True).data
        logger.debug("Dados dos amigos online serializados: %s", amigos_online_data)

        return Response(amigos_online_data, status=status.HTTP_200_OK)
    except Exception as e:
        logger.error("Erro ao listar amigos online: %s", e)
        return Response({'error': f'Erro ao listar amigos online: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)











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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rejeitar_solicitacao_amizade(request):
    solicitacao_id = request.data.get('solicitacao_id')
    try:
        solicitacao = Amizade.objects.get(id=solicitacao_id, amigo=request.user)
        solicitacao.delete()
        return Response({'message': 'Solicitação de amizade rejeitada com sucesso!'}, status=status.HTTP_200_OK)
    except Amizade.DoesNotExist:
        return Response({'error': 'Solicitação de amizade não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao rejeitar solicitação de amizade: {e}")
        return Response({'error': f'Erro ao rejeitar solicitação de amizade: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def excluir_amizade(request):
    amigo_id = request.data.get('amigo_id')
    try:
        # Verificar se a amizade existe onde o usuário atual é o solicitante ou o amigo
        amizade = Amizade.objects.get(
            (models.Q(user=request.user) & models.Q(amigo__id=amigo_id)) |
            (models.Q(amigo=request.user) & models.Q(user__id=amigo_id))
        )
        amizade.delete()
        return Response({'message': 'Amizade excluída com sucesso!'}, status=status.HTTP_200_OK)
    except Amizade.DoesNotExist:
        return Response({'error': 'Amizade não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao excluir amizade: {e}")
        return Response({'error': f'Erro ao excluir amizade: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verificar_bloqueio(request):
    amigo_id = request.data.get('amigo_id')
    try:
        # Verificar se a amizade existe onde o usuário atual é o solicitante ou o amigo
        amizade = Amizade.objects.get(
            (models.Q(user=request.user) & models.Q(amigo__id=amigo_id)) |
            (models.Q(amigo=request.user) & models.Q(user__id=amigo_id))
        )
        return Response({'bloqueado': amizade.bloqueado}, status=status.HTTP_200_OK)
    except Amizade.DoesNotExist:
        return Response({'error': 'Amizade não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao verificar bloqueio: {e}")
        return Response({'error': f'Erro ao verificar bloqueio: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bloquear_amigo(request):
    amigo_id = request.data.get('amigo_id')
    try:
        # Obter a amizade onde o usuário atual é o solicitante ou o amigo
        amizade = Amizade.objects.get(
            (models.Q(user=request.user) & models.Q(amigo__id=amigo_id)) |
            (models.Q(amigo=request.user) & models.Q(user__id=amigo_id))
        )
        amizade.bloqueado = True
        amizade.save()
        return Response({'message': 'Amigo bloqueado com sucesso!'}, status=status.HTTP_200_OK)
    except Amizade.DoesNotExist:
        return Response({'error': 'Amizade não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao bloquear amigo: {e}")
        return Response({'error': f'Erro ao bloquear amigo: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def desbloquear_amigo(request):
    amigo_id = request.data.get('amigo_id')
    try:
        # Obter a amizade onde o usuário atual é o solicitante ou o amigo
        amizade = Amizade.objects.get(
            (models.Q(user=request.user) & models.Q(amigo__id=amigo_id)) |
            (models.Q(amigo=request.user) & models.Q(user__id=amigo_id))
        )
        amizade.bloqueado = False
        amizade.save()
        return Response({'message': 'Amigo desbloqueado com sucesso!'}, status=status.HTTP_200_OK)
    except Amizade.DoesNotExist:
        return Response({'error': 'Amizade não encontrada.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao desbloquear amigo: {e}")
        return Response({'error': f'Erro ao desbloquear amigo: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
