# myapp/middleware.py
from django.utils import timezone
from django.conf import settings
from django.contrib.auth import get_user_model

class UpdateLastActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            User = get_user_model()
            User.objects.filter(pk=request.user.pk).update(last_activity=timezone.now())
        return response
