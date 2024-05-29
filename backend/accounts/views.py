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
from backend.settings import auth
from firebase_admin import auth as firebase_auth


class AuthCreateNewUserView(APIView):

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, format=None):
        data = request.data
        email = data.get("email")
        password = data.get("password")

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
            print(serializer)
            print(serializer.data)
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


class AuthSignUp(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request: Request):
        data = request.data
        id_token = data.get("id_token")
        if not id_token:
            return Response(
                {"message": "ID Token required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            decoded_token = firebase_auth.verify_id_token(id_token)
            uid = decoded_token["uid"]
            email = decoded_token["email"]
            user_data = {
                "firebase_uid": uid,
                "email": email,
                "is_active": True,  # Assuming you want to set this as True by default
                "password": "fakepassword",
            }
            print("hello2")

            try:
                # Save to DB
                serializer = UserSerializer(data=user_data)
                print("hello3")
                if serializer.is_valid():
                    serializer.save()
                    data = serializer.data
                    response = {
                        "message": "User created successfully.",
                        "data": data,
                    }
                    print("hello4")
                    return Response(response, status=status.HTTP_201_CREATED)
                else:
                    errors = serializer.errors
                    return Response(
                        serializer.errors, status=status.HTTP_400_BAD_REQUEST
                    )
            except Exception as e:
                return Response({"message": "Could not create user."}, status=400)

        except Exception as e:
            return Response({"error": str(e)}, status=500)


class AuthSignIn(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request: Request):
        data = request.data
        id_token = data.get("id_token")
        if not id_token:
            return Response(
                {"message": "ID Token required"}, status=status.HTTP_400_BAD_REQUEST
            )

        try:
            decoded_token = firebase_auth.verify_id_token(id_token)
            uid = decoded_token["uid"]

            try:
                user = User.objects.get(firebase_uid=uid)
                serializer = UserSerializer(user)
                data = serializer.data
                response = {
                    "message": "User logged in successfully.",
                    "data": data,
                }
                return Response(response, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response(
                    {"message": "User does not exist."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response({"error": str(e)}, status=500)


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
