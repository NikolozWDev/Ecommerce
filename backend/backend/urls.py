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
from django.urls import path
from api.views import RegisterView, EmailTokenObtainPairView, CurrentUser, DeleteAccountView, SendCodeView, VerifyCodeView, ChangePasswordView, ChangePasswordSeView, ChangeUsernameView, UploadProfilePictureView, GetUserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('superadmin/', admin.site.urls),
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
    path('api/user/send-code/', SendCodeView.as_view(), name="send_code"),
    path('api/user/verify-code/', VerifyCodeView.as_view(), name="verify_code")
]