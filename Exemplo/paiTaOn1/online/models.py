# /models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class CustomUser(AbstractUser):
    last_activity = models.DateTimeField(null=True, blank=True)
