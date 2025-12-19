from django.shortcuts import render
from .models import CustomUser, EmailVerification, Product, Comment, Basket, ShippingAddress, Order, OrderItem
from .serializers import RegisterSerializer, EmailTokenObtainPairSerializer, ShowUserSerializer, VerifyCodeSerializer, SendVerificationCodeSerializer, ChangeUserSerializer, ChangePasswordSerializer, ChangeUsernameSerializer, ProfilePictureSerializer, UserSerializer, ProductSerializer, CommentSerializer, ShowUserSerializer, BasketSerializer, SendVerificationCodeRegisterSerializer, ShippingAddressSerializer, UserSerializer
from rest_framework import generics, views, response, serializers
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework import status
import cloudinary
import cloudinary.uploader

# Create your views here.
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class UploadProfilePictureView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = request.user
        file = request.FILES.get("profile_picture")
        if not file:
            return Response({"error": "No image provided"}, status=400)
        if user.profile_picture:
            user.profile_picture.delete(save=False)
        user.profile_picture = file
        user.save()
        return Response({
            "message": "Profile picture uploaded successfully",
            "profile_picture_url": user.profile_picture.url
        })


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


class SendRegisterCodeView(generics.CreateAPIView):
    serializer_class = SendVerificationCodeRegisterSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Verification code sent"})


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
        products = 0
        sub_total = 0
        for basket in baskets:
            down = float(basket.product.down_price) if basket.product.down_price else 0
            price = down if down > 0 else float(basket.product.price)
            sub_total += price * basket.number
            products += basket.number
        delivery_fee = sub_total * 0.10
        promo_price = 0
        promo_activate = False
        if request.user.promo_code == "nikolozproject":
            promo_price = (sub_total + delivery_fee) * 0.25
            promo_activate = True
        total_price = (sub_total + delivery_fee) - promo_price

        return Response({
            "subtotal": f"{sub_total:.2f}",
            "deliveryfee": f"{delivery_fee:.2f}",
            "totalprice": f"{total_price:.2f}",
            "promoprice": f"{promo_price:.2f}",
            "promoactivate": promo_activate,
            "totalitems": baskets.count(),
            "totalproducts": products,
        }, status=status.HTTP_200_OK)


class PromoApplyView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        promo = request.data.get("promo", "").strip().lower()
        if promo != "nikolozproject":
            return Response({"valid": False}, status=400)
        request.user.promo_code = promo
        request.user.save()
        return Response({"valid": True})


class BasketIncreaseNumView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            basket = Basket.objects.get(id=pk, user=request.user)
            basket.number += 1
            basket.save()
            return Response({"number": basket.number}, status=200)
        except Basket.DoesNotExist:
            return Response({"message": "Item not found"}, status=200)


class BasketDecreaseNumView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        try:
            basket = Basket.objects.get(id=pk, user=request.user)
            if basket.number > 1:
                basket.number -= 1
                basket.save()
                return Response({"number", basket.number}, status=200)
            basket.delete()
            return Response({"deleted": True}, status=200)
        except basket.DoesNotExist:
            return Response({"message": "Item not found"}, status=200)


class ShippingAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            shipping = ShippingAddress.objects.get(user=request.user)
            serializer = ShippingAddressSerializer(shipping)
            return Response(serializer.data)
        except ShippingAddress.DoesNotExist:
            return Response({"detail": "no_address"}, status=404)
    
    def post(self, request):
        serializer = ShippingAddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    def put(self, request):
        shipping = ShippingAddress.objects.get(user=request.user)
        serializer = ShippingAddressSerializer(shipping, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        basket = request.data.get("basket")
        shipping = ShippingAddress.objects.get(user=request.user)
        if not basket or not shipping:
            return Response({"detail": "basket or shipping missing"}, status=404)
        total = sum(item['price']*item['quantity'] for item in basket)
        order = Order.objects.create(
            user=request.user,
            shipping_address=shipping,
            total_price=total
        )
        for item in basket:
            OrderItem.objects.create(
                order=order,
                product_id=item['product_id'],
                quantity=item['quantity'],
                price=item['price']
            )
        return Response({"order_id": order.id, "total_price": total})


class CreatePayPalOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        amount = request.data.get("amount")
        paypal_order = create_paypal_order(amount)
        return Response({"paypal_order_id": paypal_order["id"]})


class CapturePayPalOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        paypal_order_id = request.data.get("order_id")
        order_id = request.data.get("local_order_id")
        result = capture_paypal_order(paypal_order_id)
        if result.get("status") == "COMPLETED":
            order = Order.objects.get(id=order_id, user=request.user)
            order.paid = True
            order.save()
            return Response({"status": "success"})
        return Response({"status": "failed", "details": result}, status=400)