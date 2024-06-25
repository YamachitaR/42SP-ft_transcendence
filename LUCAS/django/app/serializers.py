from rest_framework import serializers
from .models import UserPreferences
from .models import Amizade, CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'password', 'first_name', 'last_name', 'profile_image', 'is_online')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class UserPreferencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = '__all__'

class AmizadeSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Amizade
        fields = ['id', 'user', 'amigo', 'aceita']

class AmizadeEnviadaSerializer(serializers.ModelSerializer):
    amigo = UserSerializer()

    class Meta:
        model = Amizade
        fields = ['id', 'amigo', 'aceita', 'criado_em']


class AmigoListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'profile_image', 'is_online']
