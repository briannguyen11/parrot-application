# accounts/views

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from .firebase_auth.firebase_authentication import auth as firebase_admin_auth

from django.contrib.auth.hashers import check_password
import re
from backend.settings import auth

# API endpoint for creating new user


class AuthCreateNewUserView(APIView):

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, format=None):
        data = request.data
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        included_fields = [email, password, first_name, last_name]

        # Check if any of the required fields are missing
        if not all(included_fields):
            bad_response = {"status": "failed", "message": "All fields are required."}
            return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)

        # Check if email is valid
        if email and not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            bad_response = {
                "status": "failed",
                "message": "Enter a valid email address.",
            }
            return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)

        # Check if password is less than 8 characters
        if len(password) < 8:
            bad_response = {
                "status": "failed",
                "message": "Password must be at least 8 characters long.",
            }
            return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)

        # Check if password meets complexity requirements
        if password and not re.match(
            r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$",
            password,
        ):
            bad_response = {
                "status": "failed",
                "message": "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
            }
            return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Create user on firebase
            user = auth.create_user_with_email_and_password(email, password)
            print(user)
            uid = user["localId"]
            data["firebase_uid"] = uid
            data["is_active"] = True

            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                response = {
                    "status": "success",
                    "message": "User created successfully.",
                    "data": serializer.data,
                }
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                auth.delete_user_account(user["idToken"])
                bad_response = {
                    "status": "failed",
                    "message": "User signup failed.",
                    "data": serializer.errors,
                }
                return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)
        except Exception:
            bad_response = {
                "status": "failed",
                "message": "User with this email already exists.",
            }
            return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)


# API endpoint to login user


class AuthLoginExisitingUserView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request: Request):
        data = request.data
        email = data.get("email")
        password = data.get("password")

        try:
            user = auth.sign_in_with_email_and_password(email, password)
        except Exception:
            bad_response = {"status": "failed", "message": "Invalid email or password."}
            return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)

        try:
            existing_user = User.objects.get(email=email)
            if not check_password(password, existing_user.password):
                existing_user.set_password(password)
                existing_user.save()

            serializer = UserSerializer(existing_user)
            extra_data = {
                "firebase_id": user["localId"],
                "firebase_access_token": user["idToken"],
                "firebase_refresh_token": user["refreshToken"],
                "firebase_expires_in": user["expiresIn"],
                "firebase_kind": user["kind"],
                "user_data": serializer.data,
            }
            response = {
                "status": "success",
                "message": "User logged in successfully.",
                "data": extra_data,
            }
            return Response(response, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            auth.delete_user_account(user["idToken"])
            bad_response = {"status": "failed", "message": "User does not exist."}
            return Response(bad_response, status=status.HTTP_404_NOT_FOUND)
