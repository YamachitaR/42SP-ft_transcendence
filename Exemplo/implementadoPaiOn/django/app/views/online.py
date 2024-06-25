from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from datetime import timedelta

def is_user_online(user):
    if user.last_activity:
        now = timezone.now()
        if now - user.last_activity < timedelta(seconds=180):
            return True
    return False


class UserStatusAPI(APIView):
    def get(self, request, format=None):
        User = get_user_model()
        users = User.objects.all()
        users_status = {user.username: is_user_online(user) for user in users}
        return Response(users_status)
