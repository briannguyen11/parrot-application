# accounts/urls

from django.urls import path
from .views import (
    CreateUser,
    DeleteExistingUser,
)

urlpatterns = [
    path("create/", CreateUser.as_view(), name="create-user"),
    path("delete-account/", DeleteExistingUser.as_view(), name="delete-user"),
]
