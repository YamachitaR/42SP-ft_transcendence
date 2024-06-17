from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password, check_password
from app.models import TbUser
from app.serializers import UserSerializer

@api_view(['POST'])
def register(request):
    try:
        if request.method == 'POST':
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'success', 'message': 'User registered successfully!'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'status': 'error', 'message': 'User registration failed!', 'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        # Captura e retorna um erro genérico para não expor detalhes internos
        return Response({'status': 'error', 'message': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login(request):
    try:
        email = request.data.get('email')
        password = request.data.get('password')

        user = TbUser.objects.get(email=email)
        if check_password(password, user.password):
            return Response({'status': 'success', 'message': 'Login successful!'}, status=status.HTTP_200_OK)
        else:
            return Response({'status': 'error', 'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    except TbUser.DoesNotExist:
        return Response({'status': 'error', 'message': 'Invalid email or password'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        # Captura e retorna um erro genérico para não expor detalhes internos
        return Response({'status': 'error', 'message': 'An unexpected error occurred.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
