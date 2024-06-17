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
        validated_data['username'] = validated_data.get('username', 'default_username')
        validated_data['nickname'] = validated_data.get('nickname', 'default_nickname')
        validated_data['photo'] = validated_data.get('photo', None)
        validated_data['password'] = make_password(validated_data['password'])
        print("Validated data: ", validated_data)
        user = TbUser.objects.create(**validated_data)
        print("User created: ", user)
        return user
