from .models import CustomUser, EmailVerification
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import date
from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail


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
                    "<", ">", "?", "|", "`", "~", " ", 
                    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        if len(data["username"]) > 24 or len(data["username"]) < 8 or data["username"].strip() != data["username"] or any(str(ch) in data["username"] for ch in forbidden):
            raise serializers.ValidationError("username is not required to subject data")
        if len(data["email"]) > 40 or len(data["email"]) < 10:
            raise serializers.ValidationError('email is not required to subject data')
        if len(data['password']) > 16 or len(data['password']) < 8:
            raise serializers.ValidationError("password is not required to subject data")
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('password is not required to subject data')
        # birth validation
        birth = data.get("birth_date")
        today = date.today()
        age = today.year - birth.year - ((today.month, today.day) < (birth.month, birth.day))
        if age < 18 or age > 100 or age < 0:
            raise serializers.ValidationError("User must be at least 18 years old to register")
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


class ChangeUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        code = data.get("code")
        new_password = data.get("new_password")
        confirm_password = data.get("confirm_password")

        if new_password != confirm_password:
            raise serializers.ValidationError("passwords do not match")
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User not found")
        try:
            verification = EmailVerification.objects.get(email=email, code=code)
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("Invalid code")
        if verification.expires_at < timezone.now():
            raise serializers.ValidationError("Verification code expired")
        data["user"] = user
        return data
    
    def save(self, **kwargs):
        user = self.validated_data["user"]
        new_password = self.validated_data["new_password"]
        
        user.set_password(new_password)
        user.save()
        EmailVerification.objects.filter(email=user.email).delete()
        return user


class SendVerificationCodeSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = EmailVerification
        fields = ["email"]

    def create(self, validated_data):
        email = validated_data["email"]
        EmailVerification.objects.filter(email=email).delete()
        verification = EmailVerification.objects.create(email=email)
        send_mail(
            subject="Your verification code",
            message=f"Your 6-digit verification code is: {verification.code}",
            from_email="E-commerce-by-Nikoloz",
            recipient_list=[email],
        )
        return verification


class VerifyCodeSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    code = serializers.CharField(max_length=6)

    class Meta:
        model = EmailVerification
        fields = ["email", "code"]

    def validate(self, attrs):
        email = attrs["email"]
        code = attrs["code"]
        try:
            verification = EmailVerification.objects.get(email=email, code=code)
        except EmailVerification.DoesNotExist:
            raise serializers.ValidationError("Invalid code or email")
        expiration_time = verification.created_at + timedelta(seconds=90)
        if timezone.now() > expiration_time:
            verification.delete()
            raise serializers.ValidationError("Code expired")
        return attrs