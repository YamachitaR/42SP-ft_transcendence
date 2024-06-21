from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

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
