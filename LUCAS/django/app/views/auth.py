from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from app.serializers import UserSerializer
from app.models import CustomUser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
import requests
from django.shortcuts import redirect
from django.conf import settings
from django.contrib.auth import login
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from urllib.parse import urlencode
import logging
from django.contrib.auth import get_user_model



logger = logging.getLogger(__name__)


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = CustomUser.objects.get(username=response.data['username'])
        token, created = Token.objects.get_or_create(user=user)
        response.data['token'] = token.key
        return response

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid Credentials'}, status=400)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({'authenticated': True})
        else:
            return Response({'authenticated': False}, status=401)

def external_login(request):
    try:
        authorization_url = 'https://api.intra.42.fr/oauth/authorize'
        client_id = settings.EXTERNAL_API_CLIENT_ID
        redirect_uri = 'http://localhost/callback'
        response_type = 'code'

        query_params = {
            'client_id': client_id,
            'redirect_uri': redirect_uri,
            'response_type': response_type,
        }

        auth_url = f"{authorization_url}?{urlencode(query_params)}"
        logger.info(f"Redirecting to {auth_url}")
        return redirect(auth_url)
    except Exception as e:
        logger.error(f"Error in external_login: {e}")
        return HttpResponse("An error occurred in external_login", status=500)

def external_callback(request):
    try:
        code = request.GET.get('code')
        if not code:
            logger.error("No code returned")
            return HttpResponse('Error: No code returned', status=400)

        token_url = 'https://api.intra.42.fr/oauth/token'

        response = requests.post(token_url, data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': 'http://localhost/callback',
            'client_id': settings.EXTERNAL_API_CLIENT_ID,
            'client_secret': settings.EXTERNAL_API_CLIENT_SECRET,
        })

        response_data = response.json()
        logger.info(f"Token response: {response_data}")

        if response.status_code != 200 or 'access_token' not in response_data:
            logger.error(f"Error fetching access token: {response_data}")
            return HttpResponse('Error fetching access token', status=400)

        access_token = response_data.get('access_token')

        user_info_url = 'https://api.intra.42.fr/v2/me'
        user_info_response = requests.get(user_info_url, headers={
            'Authorization': f'Bearer {access_token}',
        })
        user_info = user_info_response.json()
        logger.info(f"User info response: {user_info}")

        if user_info_response.status_code != 200:
            logger.error(f"Error fetching user info: {user_info}")
            return HttpResponse('Error fetching user info', status=400)
        # Verificar se o usuário já está cadastrado
        User = get_user_model()
        try:
            user = User.objects.get(username=user_info['login'])
        except User.DoesNotExist:
            # Registrar novo usuário
            user = User.objects.create_user(
                username=user_info['login'],
                first_name=user_info['first_name'],
                last_name=user_info['last_name'],
                email=user_info['email']
            )
            user.save()

        # Autenticar e gerar token
        token, created = Token.objects.get_or_create(user=user)

        redirect_url = f"{settings.LOGIN_REDIRECT_URL}?token={token.key}"
        return redirect(redirect_url)
    except Exception as e:
        logger.error(f"Error in external_callback: {e}")
        return HttpResponse("An error occurred in external_callback", status=500)
