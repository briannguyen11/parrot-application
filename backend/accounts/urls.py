# accounts/urls

from django.urls import path
from .views import (
    AuthSignUp,
    AuthSignIn,
    RefreshTokenView,
    DeleteExistingUser,
)

urlpatterns = [
    path("auth/sign-up/", AuthSignUp.as_view(), name="auth-sign-up"),
    path("auth/sign-in/", AuthSignIn.as_view(), name="auth-sign-in"),
    path("auth/refresh-token/", RefreshTokenView.as_view(), name="refresh-user-token"),
    path("delete-account/", DeleteExistingUser.as_view(), name="delete-user"),
]
