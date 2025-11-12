from django.shortcuts import render
from .models import CustomUser, EmailVerification, Product, Comment, Basket
from .serializers import RegisterSerializer, EmailTokenObtainPairSerializer, ShowUserSerializer, VerifyCodeSerializer, SendVerificationCodeSerializer, ChangeUserSerializer, ChangePasswordSerializer, ChangeUsernameSerializer, ProfilePictureSerializer, UserSerializer, ProductSerializer, CommentSerializer, ShowUserSerializer, BasketSerializer
from rest_framework import generics, views, response, serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView

# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class UploadProfilePictureView(generics.GenericAPIView):
    serializer_class = ProfilePictureSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data)
        serializer.is_valid(raise_exception=True)

        if user.profile_picture:
            public_id = user.profile_picture.name.split('.')[0]
            cloudinary.uploader.destroy(public_id)
        
        serializer.save()
        return Response({"message": "profile picture uploaded successfully"})


class CurrentUser(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(ShowUserSerializer(request.user).data)


class GetUserProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


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


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        product_id = self.kwargs['product_id']
        product = Product.objects.get(pk=product_id)
        serializer.save(user=self.request.user, product=product)


class GeatherCommentsView(generics.ListAPIView):
    serializer_class = CommentSerializer
    permission_classes = [AllowAny]
    queryset = Comment.objects.all()


class CommentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user and not self.request.user.is_superuser:
            raise PermissionDenied("You do not have permission to control this comment.")
        return obj


class CreateCommentView(generics.CreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        product_id = self.request.data.get("product")
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError({"product": "Invalid product id."})
        serializer.save(user=self.request.user, product=product)


class BasketListView(generics.ListAPIView):
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Basket.objects.filter(user=self.request.user)


class BasketCreateView(generics.CreateAPIView):
    serializer_class = BasketSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BasketRemoveView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            basket = Basket.objects.filter(id=pk, user=request.user)
            basket.delete()
            return Response({"message": "Item removed successfully"}, status=status.HTTP_204_NO_CONTENT)
        except Basket.DoesNotExist:
            return Response({"message": "Item not found"}, status=status.HTTP_404_NOT_FOUND)


class BasketSummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        baskets = Basket.objects.filter(user=request.user)
        sub_total = 0
        for basket in baskets:
            price = basket.product.down_price if basket.product.down_price > 0 else basket.product.price
            sub_total += price * basket.number
        
        return Response({"subTotal": sub_total, "total_items": baskets.count(),}, status=status.HTTP_200_OK)