from rest_framework import serializers
from django.contrib.auth.models import User
from django.http import HttpResponseBadRequest

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields =('id','username','email')


class RegisterUserSerialier(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
            return user
        except KeyError: 
            raise serializers.ValidationError({"email": "Email must be provided"}, code=400)