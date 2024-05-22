from django.db.models import Prefetch
from rest_framework import viewsets, permissions
from rest_framework.exceptions import ValidationError
from open_projects.models import OpenProject, OpenProjectApply, OpenProjectSave
from showcase_projects.models import ShowcaseProject, ShowcaseProjectSave, Like
from .serializers import ProfilesSerializer, BaseProfilesSerializer
from .models import Profiles




# This viewset is used to search for profiles
class ProfileSearchViewSet(viewsets.ModelViewSet):
    serializer_class = BaseProfilesSerializer
    permission_classes = [permissions.IsAuthenticated]


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

        

class ProfilesViewSet(viewsets.ModelViewSet):
    serializer_class = ProfilesSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = (Profiles.objects
            .prefetch_related(Prefetch(
                "user__open_projects", 
                queryset=OpenProject.objects.filter(user=self.request.user))
            )
            .prefetch_related(Prefetch(
                "user__applied_open_projects", 
                queryset=OpenProjectApply.objects.filter(user=self.request.user))
            )
            .prefetch_related(Prefetch(
                "user__saved_open_projects", 
                queryset=OpenProjectSave.objects.filter(user=self.request.user))
            )
            .prefetch_related(Prefetch(
                "user__showcase_projects", 
                queryset=ShowcaseProject.objects.filter(user=self.request.user))
            )
            .prefetch_related(Prefetch(
                "user__saved_showcase_projects", 
                queryset=ShowcaseProjectSave.objects.filter(user=self.request.user))
            )
            .prefetch_related(Prefetch(
                "user__likes", 
                queryset=Like.objects.filter(user=self.request.user))
            )
            .filter(user=self.request.user)
        )
        return queryset

    # Override perform_create to ensure only one profile per user is created
    def perform_create(self, serializer):
        # Check if the user already has a profile
        print(self.request.user)
        existing_profile = Profiles.objects.filter(user=self.request.user).exists()
        if existing_profile:
            raise ValidationError("Profile already exists for this user.")
        serializer.save(user=self.request.user)



