# accounts/views

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from .firebase_auth.firebase_authentication import auth as firebase_admin_auth
from .utils.email_verification import send_verification_email
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import check_password
import re
from backend.settings import auth


class AuthCreateNewUserView(APIView):

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, format=None):
        data = request.data
        email = data.get("email")
        password = data.get("password")
        included_fields = [email, password]

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
            uid = user["localId"]
            data["firebase_uid"] = uid
            data["is_active"] = True

            # Send email verification link
            try:
                send_verification_email(email)
            except Exception as e:
                # delete user from firebase if email verification link could not be sent
                firebase_admin_auth.delete_user(uid)
                print(str(e))
                bad_response = {"status": "failed", "message": str(e)}

                return Response(bad_response, status=status.HTTP_400_BAD_REQUEST)

            # Save to DB
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                data = serializer.data
                response = {
                    "status": "success",
                    "message": "User created successfully.",
                    "data": data,
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


class AuthResendEmail(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            email = request.data.get("email")
            send_verification_email(email)
            return Response(
                {"success": "new email link sent"}, status=status.HTTP_200_OK
            )
        except Exception:
            return Response(
                {"error": "failed to send email link"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RefreshTokenView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        refresh_token = request.data.get("refresh_token")

        if not refresh_token:
            return Response(
                {"error": "Refresh token is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            # Exchange the refresh token for a new access token
            new_id_token = auth.refresh(refresh_token)
            # Return the new access token to the client
            return Response({"access_token": new_id_token}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST
            )


class DeleteExistingUser(APIView):
    permission_classes = [AllowAny]  # for debugging only

    def delete(self, request):
        user_id = request.query_params.get("id")

        if not user_id:
            return Response({"error": "User ID is required"}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        user.delete()

        return Response({"message": "User deleted successfully"}, status=200)
