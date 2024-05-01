# accounts/urls

from django.urls import path
from .views import AuthCreateNewUserView, AuthLoginExisitingUserView

urlpatterns = [
    path("auth/register/", AuthCreateNewUserView.as_view(), name="auth-create-user"),
    path("auth/login/", AuthLoginExisitingUserView.as_view(), name="auth-login-user"),
]
