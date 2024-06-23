from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import PermissionsMixin
from django.conf import settings

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
    preference5 = models.BooleanField(default=False)
    # Outros campos de preferência

    def __str__(self):
        return f"{self.user.username}'s Preferences"


class Amizade(models.Model):
    user = models.ForeignKey(CustomUser, related_name='amigos', on_delete=models.CASCADE)
    amigo = models.ForeignKey(CustomUser, related_name='amigos_de', on_delete=models.CASCADE)
    aceita = models.BooleanField(default=False)
    criado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'amigo')

    def __str__(self):
        return f"{self.user} é amigo de {self.amigo}"
