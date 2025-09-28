from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'confirm_password', 'birth_date']
        extra_kwargs = {"password":{"write_only": True}}
    
    def validate(self, data):
        forbidden = ["!", "@", "#", "$", "%", "^", "&", "*",
                    "(", ")", "_", "-", "+", "=", "[", "]",
                    "{", "}", ";", ":", "'", "/", '"', ",", ".",
                    "<", ">", "?", "|", "`", "~", " ",]
        if len(data["username"]) > 24 or len(data["username"]) < 8 or data["username"].strip() != data["username"] or any(ch in data["username"] for ch in forbidden):
            raise serializers.ValidationError("username is not required to subject data")
        if len(data["email"]) > 40 or len(data["email"]) < 10:
            raise serializers.ValidationError('email is not required to subject data')
        if len(data['password']) > 16 or len(data['password']) < 8:
            raise serializers.ValidationError("password is not required to subject data")
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('password is not required to subject data')
        return data
    
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        user = CustomUser.objects.create_user(
            username=validated_data.get("username", ""),
            email=validated_data["email"],
            password=validated_data["password"],
            birth_date=validated_data.get("birth_date")
        )
        return user
        

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        if not email or not password:
            raise serializers.ValidationError("Email or Password required")
        
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist")
        
        user = authenticate(username=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        
        return super().validate({"email": email, "password": password})


class ShowUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "birth_date"]