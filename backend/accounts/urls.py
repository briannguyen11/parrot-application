# accounts/urls

from django.urls import path
from .views import (
    AuthCreateNewUserView,
    AuthSignUp,
    AuthSignIn,
    AuthResendEmail,
    RefreshTokenView,
    DeleteExistingUser,
)

urlpatterns = [
    path("auth/register/", AuthCreateNewUserView.as_view(), name="auth-create-user"),
    path("auth/sign-up/", AuthSignUp.as_view(), name="auth-sign-up"),
    path("auth/sign-in/", AuthSignIn.as_view(), name="auth-sign-in"),
    path("auth/resend/", AuthResendEmail.as_view(), name="auth-resend-email"),
    path("auth/refresh-token/", RefreshTokenView.as_view(), name="refresh-user-token"),
    path("delete-account/", DeleteExistingUser.as_view(), name="delete-user"),
]
