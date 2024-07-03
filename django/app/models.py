from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import PermissionsMixin
from django.conf import settings
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(max_length=30, blank=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    is_online = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class UserPreferences(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='preferences')
    # Adicione aqui os campos para as preferências do usuário
    preference1 = models.CharField(max_length=100, blank=True, null=True)
    preference2 = models.CharField(max_length=100, blank=True, null=True)
    preference3 = models.CharField(max_length=100, blank=True, null=True)
    preference4 = models.CharField(max_length=100, blank=True, null=True)
    preference5 = models.CharField(max_length=100, blank=True, null=True)
    # Outros campos de preferência

    def __str__(self):
        return f"{self.user.username}'s Preferences"

from django.db import models
from django.conf import settings

class Amizade(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='amigos', on_delete=models.CASCADE)
    amigo = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='amigos_de', on_delete=models.CASCADE)
    aceita = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'amigo')

    def __str__(self):
        return f"{self.user} é amigo de {self.amigo}"

class GameHistory(models.Model):
    RESULT_CHOICES = [
        ('win', 'Win'),
        ('loss', 'Loss'),
        ('draw', 'Draw'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    game = models.CharField(max_length=100)
    description = models.TextField()
    score = models.CharField(max_length=50)
    result = models.CharField(max_length=10, choices=RESULT_CHOICES)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.game} on {self.date} - {self.result}"

class Channel(models.Model):
    private = models.BooleanField(default=False)
    room_id = models.CharField(max_length=150, unique=True)
    name = models.CharField(max_length=150)
    users = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='channels')
    last_interaction = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

class ChatMessage(models.Model):
    channel = models.ForeignKey(Channel, related_name='messages', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"ChatMessage(id={self.id}, channel={self.channel.name}, user_id={self.user_id}, message={self.message}, timestamp={self.timestamp})"
