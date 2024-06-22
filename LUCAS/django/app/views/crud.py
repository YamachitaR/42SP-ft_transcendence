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
    if request.method == 'GET':
        preferences, created = UserPreferences.objects.get_or_create(user=request.user)
        serializer = UserPreferencesSerializer(preferences)
        return Response(serializer.data)

    elif request.method == 'PUT':
        preferences, created = UserPreferences.objects.get_or_create(user=request.user)
        serializer = UserPreferencesSerializer(preferences, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
