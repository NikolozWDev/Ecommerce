from django.shortcuts import render
from .serializers import RegisterSerializer, EmailTokenObtainPairSerializer, ShowUserSerializer, VerifyCodeSerializer, SendVerificationCodeSerializer, ChangeUserSerializer, ChangePasswordSerializer, ChangeUsernameSerializer
from rest_framework import generics, views, response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class CurrentUser(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(ShowUserSerializer(request.user).data)


class DeleteAccountView(views.APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"Message": "Account deleted successfully"})


class ChangePasswordView(generics.GenericAPIView):
    serializer_class = ChangeUserSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password changed successfully"})


class ChangePasswordSeView(generics.GenericAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password changed successfully"})


class ChangeUsernameView(generics.GenericAPIView):
    serializer_class = ChangeUsernameSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Username changed successfully"})


class SendCodeView(generics.CreateAPIView):
    serializer_class = SendVerificationCodeSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Verification code sent"})


class VerifyCodeView(generics.GenericAPIView):
    serializer_class = VerifyCodeSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Email verified successfully"})