# accounts/urls

from django.urls import path
from .views import (
    AuthSignUp,
    AuthSignIn,
    GoogleSignIn,
    RefreshTokenView,
    DeleteExistingUser,
)

urlpatterns = [
    path("auth/sign-up/", AuthSignUp.as_view(), name="sign-up"),
    path("auth/sign-in/", AuthSignIn.as_view(), name="sign-in"),
    path("auth/google-sign-in/", GoogleSignIn.as_view(), name="google-sign-in"),
    path("auth/refresh-token/", RefreshTokenView.as_view(), name="refresh-user-token"),
    path("delete-account/", DeleteExistingUser.as_view(), name="delete-user"),
]
