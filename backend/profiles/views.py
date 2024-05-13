from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from .serializers import ProfilesSerializer
from .models import Profiles


class ProfilesViewSet(viewsets.ModelViewSet):
    serializer_class = ProfilesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Profiles.objects.filter(user=self.request.user)
        return queryset

    # Override perform_create to ensure only one profile per user is created
    def perform_create(self, serializer):
        # Check if the user already has a profile
        print(self.request.user)
        existing_profile = Profiles.objects.filter(user=self.request.user).exists()
        if existing_profile:
            raise ValidationError("Profile already exists for this user.")
        serializer.save(user=self.request.user)
