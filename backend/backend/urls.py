"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from api.views import RegisterView, EmailTokenObtainPairView, CurrentUser, DeleteAccountView, SendCodeView, VerifyCodeView, ChangePasswordView, ChangePasswordSeView, ChangeUsernameView, UploadProfilePictureView, GetUserProfileView, ProductListView, ProductDetailView, CommentCreateView, GeatherCommentsView, CommentDetailView, CreateCommentView, BasketListView, BasketCreateView, BasketRemoveView, BasketSummaryView, PromoApplyView, BasketIncreaseNumView, BasketDecreaseNumView, SendRegisterCodeView, ShippingAddressView, CreateOrderView, CreatePayPalOrderView, CapturePayPalOrderView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.http import HttpResponse

def health(request):
    return HttpResponse("OK", status=200)

urlpatterns = [
    path('superadmin/', admin.site.urls),
    path("healthz", health),
    path('api/user/register/', RegisterView.as_view(), name="register"),
    path('api/token/', EmailTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/user/upload-picture/', UploadProfilePictureView.as_view(), name="profile_picture"),
    path('api/user/profile/', GetUserProfileView.as_view(), name="get_profile"),
    path('api/user/delete/', DeleteAccountView.as_view(), name="delete_account"),
    path('api/user/change-password/', ChangePasswordView.as_view(), name="change_password"),
    path('api/user/change-password-account/', ChangePasswordSeView.as_view(), name="change_password_account"),
    path('api/user/change-username', ChangeUsernameView.as_view(), name="change_username"),
    path('api/token/refresh/', TokenRefreshView.as_view(), name="refresh"),
    path('api/user/me/', CurrentUser.as_view(), name="user_view"),
    path('api/user/send-register-code/', SendRegisterCodeView.as_view(), name="send_register_code"),
    path('api/user/send-code/', SendCodeView.as_view(), name="send_code"),
    path('api/user/verify-code/', VerifyCodeView.as_view(), name="verify_code"),
    path('api/products/', ProductListView.as_view(), name="products"),
    path('api/products/<int:pk>/', ProductDetailView.as_view(), name="product_detail"),
    path('api/products/<int:product_id>/comment/', CommentCreateView.as_view(), name="add_comment"),
    path('api/comments/', GeatherCommentsView.as_view(), name="all_comments"),
    path('api/comments/<int:pk>/', CommentDetailView.as_view(), name="comment_detail"),
    path('api/comments/create/', CreateCommentView.as_view(), name="create_comment"),
    path('api/basket/', BasketListView.as_view(), name="basket_list"),
    path('api/basket/add/', BasketCreateView.as_view(), name="basket_add"),
    path('api/basket/<int:pk>/remove/', BasketRemoveView.as_view(), name="basket_remove"),
    path('api/basket/summary/', BasketSummaryView.as_view(), name="basket_summary"),
    path('api/basket/promo-apply/',PromoApplyView.as_view(), name="promo_apply"),
    path('api/basket/<int:pk>/increase/', BasketIncreaseNumView.as_view(), name="increase-num"),
    path('api/basket/<int:pk>/decrease/', BasketDecreaseNumView.as_view(), name="decrease-num"),
    path("api/shipping-address/", ShippingAddressView.as_view(), name="shipping_address"),
    path("api/create-order/", CreateOrderView.as_view(), name="create_order"),
    path("api/paypal/create/", CreatePayPalOrderView.as_view(), name="create_paypal"),
    path("api/paypal/capture/", CapturePayPalOrderView.as_view(), name="capture_paypal"),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)