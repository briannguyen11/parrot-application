# accounts/views

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from firebase_admin import auth as firebase_auth


class CreateUser(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request: Request):
        data = request.data
        id_token = data.get("id_token")

        try:
            # verify token again (protect from unknown api call with fake token)
            decoded_token = firebase_auth.verify_id_token(id_token)
            uid = decoded_token["uid"]

            if User.objects.filter(firebase_uid=uid).exists():
                return Response(
                    {"message": "User already exists"}, status=status.HTTP_200_OK
                )
            else:
                # create new user
                email = decoded_token["email"]
                user_data = {
                    "firebase_uid": uid,
                    "email": email,
                    "is_active": True,
                    "password": "fakepassword",  # TODO: remove when table is updated
                }

                try:
                    # save to DB
                    serializer = UserSerializer(data=user_data)
                    if serializer.is_valid():
                        serializer.save()
                        data = serializer.data
                        response = {
                            "message": "User created successfully.",
                            "data": data,
                        }
                        return Response(response, status=status.HTTP_201_CREATED)
                    else:
                        errors = serializer.errors
                        return Response(errors, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({"message": "Could not create user."}, status=400)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


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
