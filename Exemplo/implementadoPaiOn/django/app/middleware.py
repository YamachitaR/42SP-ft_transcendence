# myapp/middleware.py
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.contrib.auth.signals import user_logged_out
from django.dispatch import receiver

class UpdateLastActivityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            User = get_user_model()
            User.objects.filter(pk=request.user.pk).update(last_activity=timezone.now())
        return response

@receiver(user_logged_out)
def on_user_logged_out(sender, request, **kwargs):
    user = request.user
    if user.is_authenticated:
        User = get_user_model()
        User.objects.filter(pk=user.pk).update(last_activity=None)
