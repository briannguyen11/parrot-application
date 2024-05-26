from django.db.models import Prefetch
from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from open_projects.models import OpenProject, OpenProjectApply, OpenProjectSave
from showcase_projects.models import ShowcaseProject, ShowcaseProjectSave, Like
from .serializers import ProfilesSerializer, ProfilesRestrictedSerializer, BaseProfilesSerializer
from .models import Profiles
from backend.views import MixedPermissionsViewSet


# This viewset is used to search for profiles
class ProfileSearchViewSet(MixedPermissionsViewSet):
    serializer_class = BaseProfilesSerializer

    def get_queryset(self):
        queryset = Profiles.objects.all()
        search = self.request.query_params.get('query', None)
        if search is not None:
            queryset = queryset.filter(
                first_name__icontains=search
            ) | queryset.filter(
                last_name__icontains=search
            )
            print(search)
        return queryset

        
class PublicProfilesViewSet(MixedPermissionsViewSet):
    serializer_class = ProfilesRestrictedSerializer

    def get_queryset(self):
        queryset = Profiles.objects.prefetch_related(
            Prefetch("user__open_projects", queryset=OpenProject.objects.filter(open=True)),
            Prefetch("user__showcase_projects", queryset=ShowcaseProject.objects.all())
        )
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset


class PrivateProfilesViewSet(viewsets.ModelViewSet):
    serializer_class = ProfilesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Profiles.objects.prefetch_related(
            Prefetch("user__open_projects", queryset=OpenProject.objects.all()),
            Prefetch("user__showcase_projects", queryset=ShowcaseProject.objects.all())
        )
        
        if self.action == "list" or (self.action == "retrieve" and self.kwargs.get("pk") == str(user.profile.pk)):
            queryset = queryset.prefetch_related(
                Prefetch("user__applied_open_projects", queryset=OpenProjectApply.objects.filter(user=user)),
                Prefetch("user__saved_open_projects", queryset=OpenProjectSave.objects.filter(user=user)),
                Prefetch("user__saved_showcase_projects", queryset=ShowcaseProjectSave.objects.filter(user=user)),
                Prefetch("user__likes", queryset=Like.objects.filter(user=user))
            ).filter(user=user)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        existing_profile = Profiles.objects.filter(user=user).exists()
        if existing_profile:
            raise ValidationError("Profile already exists for this user.")
        serializer.save(user=user)



