
from .models import TbUser
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TbUser
        fields = ['id', 'username', 'email', 'password', 'nickname', 'photo', 'date_joined', 'last_login']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'username': {'required': False, 'allow_blank': True},
            'nickname': {'required': False, 'allow_blank': True}
        }

    def create(self, validated_data):
        user = TbUser.objects.create(
            username=validated_data.get('username', ''),
            email=validated_data['email'],
			password=make_password(validated_data['password']),
            nickname=validated_data.get('nickname', ''),
            photo=validated_data.get('photo')
        )
        return user
