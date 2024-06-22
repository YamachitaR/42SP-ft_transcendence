# myapp/utils.py
from django.utils import timezone
from datetime import timedelta

def is_user_online(user):
    if user.last_activity:
        now = timezone.now()
        if now - user.last_activity < timedelta(seconds=20):
            return True
    return False
