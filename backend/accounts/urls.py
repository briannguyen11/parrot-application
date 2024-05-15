# accounts/urls

from django.urls import path
from .views import (
    AuthCreateNewUserView,
    AuthLoginExisitingUserView,
    AuthResendEmail,
    RefreshTokenView,
    DeleteExistingUser,
)

urlpatterns = [
    path("auth/register/", AuthCreateNewUserView.as_view(), name="auth-create-user"),
    path("auth/login/", AuthLoginExisitingUserView.as_view(), name="auth-login-user"),
    path("auth/resend/", AuthResendEmail.as_view(), name="auth-resend-email"),
    path("auth/refresh-token/", RefreshTokenView.as_view(), name="refresh-user-token"),
    path("delete-account/", DeleteExistingUser.as_view(), name="delete-user"),
]
