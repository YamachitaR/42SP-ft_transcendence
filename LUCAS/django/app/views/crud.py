from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from ..serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, permissions
from ..models import UserPreferences
from ..serializers import UserPreferencesSerializer
from ..models import CustomUser
from ..serializers import UserSerializer
import logging


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    try:
        user = request.user
        user_info = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'image': user.profile_image.url if user.profile_image else None
        }
        return JsonResponse(user_info)
    except User.DoesNotExist:
        return JsonResponse({'message': 'User not found'}, status=404)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def update_user(request):
    try:
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            user_info = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'image': user.profile_image.url if user.profile_image else None
            }
            return JsonResponse(user_info)
        return JsonResponse(serializer.errors, status=400)
    except User.DoesNotExist:
        return JsonResponse({'message': 'User not found'}, status=404)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def UserPreferencesView(request):
    try:
        preferences = UserPreferences.objects.get(user=request.user)
    except UserPreferences.DoesNotExist:
        preferences = UserPreferences.objects.create(
            user=request.user,
            preference1='option1',
            preference2='option1',
            preference3='option1',
            preference4='option1',
            preference5=True
        )

    if request.method == 'GET':
        serializer = UserPreferencesSerializer(preferences)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserPreferencesSerializer(preferences, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_todos_usuarios(request):
    try:
        usuarios = CustomUser.objects.all()
        usuarios_data = [
            {
                'id': usuario.id,
                'email': usuario.email,
                'first_name': usuario.first_name,
                'last_name': usuario.last_name,
                'is_online': usuario.is_online(),
            }
            for usuario in usuarios
        ]
        return Response(usuarios_data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': f'Erro ao listar usuários: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def buscar_id_pelo_username(request):
    username = request.data.get('username')
    try:
        logger.info(f"Buscando usuário: {username}")
        usuario = CustomUser.objects.get(username=username)
        logger.info(f"Usuário encontrado: {usuario.id}")
        return Response({'id': usuario.id}, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        logger.warning(f"Usuário não encontrado: {username}")
        return Response({'error': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        logger.error(f"Erro ao buscar usuário: {e}")
        return Response({'error': f'Erro ao buscar usuário: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
