from .models import CustomUser, EmailVerification, Product, Comment, Basket, ShippingAddress, Order, OrderItem
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from datetime import date
from datetime import timedelta
from django.utils import timezone
from django.core.mail import send_mail
import requests
from django.conf import settings


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


class ProfilePictureSerializer(serializers.ModelSerializer):
    profile_picture_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = ["profile_picture", "profile_picture_url"]

    def get_profile_picture_url(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return None


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ["id", "email", "username", "profile_picture"]

    def get_profile_picture(self, obj):
        if obj.profile_picture:
            return obj.profile_picture.url
        return None


class ShowUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "email", "birth_date"]


class ChangeUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["email", "new_password", "confirm_password"]

    def validate(self, data):
        email = data.get("email")
        new_password = data.get("new_password")
        confirm_password = data.get("confirm_password")

        if len(new_password) > 16 or len(new_password) < 8:
            raise serializers.ValidationError("password validation error")
        if new_password != confirm_password:
            raise serializers.ValidationError("Passwords do not match")

        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("User not found")

        data["user"] = user
        return data

    def save(self, *args, **kwargs):
        user = self.validated_data["user"]
        new_password = self.validated_data["new_password"]
        user.set_password(new_password)
        user.save()
        return user


class ChangePasswordSerializer(serializers.ModelSerializer):
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["new_password", "confirm_password"]
    
    def validate(self, data):
        new_password = data.get("new_password")
        confirm_password = data.get("confirm_password")

        if len(new_password) > 16 or len(new_password) < 8:
            raise serializers.ValidationError("password validation error")
        if new_password != confirm_password:
            raise serializers.ValidationError("passwords do not match")
        user = self.context["request"].user
        data["user"] = user
        return data
    
    def save(self, *args, **kwargs):
        user = self.validated_data["user"]
        new_password = self.validated_data["new_password"]
        user.set_password(new_password)
        user.save()
        return user


class ChangeUsernameSerializer(serializers.ModelSerializer):
    new_username = serializers.CharField(max_length=24)

    class Meta:
        model = CustomUser
        fields = ["new_username"]

    def validate(self, attrs):
        new_username = attrs.get("new_username")
        forbidden = ["!", "@", "#", "$", "%", "^", "&", "*",
                    "(", ")", "_", "-", "+", "=", "[", "]",
                    "{", "}", ";", ":", "'", "/", '"', ",", ".",
                    "<", ">", "?", "|", "`", "~", " ", 
                    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        if len(new_username) > 24 or len(new_username) < 8 or new_username.strip() != new_username or any(str(ch) in new_username for ch in forbidden):
            raise serializers.ValidationError("username is not required to subject data")
        return attrs
    
    def save(self, *args, **kwargs):
        user = self.context["request"].user
        new_username = self.validated_data["new_username"]
        user.username = new_username
        user.save()
        return user


class SendVerificationCodeRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = EmailVerification
        fields = ["email"]

    def create(self, validated_data):
        email = validated_data["email"]
        EmailVerification.objects.filter(email=email).delete()
        verification = EmailVerification.objects.create(email=email)
        data = {
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": "Your verification code",
            "html": f"<p>Your 6-digit verification code is: <strong>{verification.code}</strong></p>"
        }
        response = requests.post(
            "https://api.resend.com/emails",
            json=data,
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                "Content-Type": "application/json"
            }
        )
        if response.status_code not in [200, 202]:
            raise serializers.ValidationError("Failed to send verification email")

        return verification


class SendVerificationCodeSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = EmailVerification
        fields = ["email"]

    def validate(self, attrs):
        email = attrs.get("email")
        if not CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("User with this email doesn't exist.")
        return attrs

    def create(self, validated_data):
        email = validated_data["email"]
        EmailVerification.objects.filter(email=email).delete()
        verification = EmailVerification.objects.create(email=email)

        data = {
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": "Your verification code",
            "html": f"<p>Your 6-digit verification code is: <strong>{verification.code}</strong></p>"
        }
        response = requests.post(
            "https://api.resend.com/emails",
            json=data,
            headers={
                "Authorization": f"Bearer {settings.RESEND_API_KEY}",
                "Content-Type": "application/json"
            }
        )
        if response.status_code not in [200, 202]:
            raise serializers.ValidationError("Failed to send verification email")
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
        verification.delete()

        return attrs


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "profile_picture"]
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_owner = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ["id", "user", "text", "rating", "created_at", "is_owner"]

    def validate(self, data):
        rating = data.get("rating")
        text = data.get("text")

        if rating is not None and (rating < 1 or rating > 5):
            raise serializers.ValidationError({"rating": "Rating must be between 1 and 5."})

        if text and (len(text) < 20 or len(text) > 128):
            raise serializers.ValidationError({"text": "Text must be between 20 and 128 characters."})

        return data

    def get_is_owner(self, obj):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            return obj.user == request.user
        return False


class ProductSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "title", "image", "rate", "price", "down_price", "created_at", "comments"]

    def get_image(self, obj):
        return obj.image_url if obj.image_url else None


class BasketSerializer(serializers.ModelSerializer):
    product_title = serializers.CharField(source="product.title", read_only=True)
    product_image = serializers.SerializerMethodField()
    product_price = serializers.CharField(source="product.price", read_only=True)
    product_down_price = serializers.CharField(source="product.down_price", read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Basket
        fields = [
            "id", "product", "product_title", "product_image", 
            "product_price", "product_down_price", 
            "color", "size", "number", "total_price"
        ]
    
    def get_product_image(self, obj):
        return obj.product.image_url if obj.product.image_url else None

    
    def get_total_price(self, obj):
        return obj.total_price


class ShippingAddressSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"