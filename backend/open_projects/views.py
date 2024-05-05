from rest_framework import viewsets, permissions
from .serializers import OpenProjectSerializer, OpenProjectSaveSerializer, OpenProjectTagSerializer
from .models import OpenProject, OpenProjectSave, OpenProjectTag

class OpenProjectViewSet(viewsets.ModelViewSet):
    serializer_class = OpenProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    # Populate user field with the authenticated user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = OpenProject.objects.all()
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

class OpenProjectSaveViewSet(viewsets.ModelViewSet):
    serializer_class = OpenProjectSaveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = OpenProjectSave.objects.all()
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

class OpenProjectTagViewSet(viewsets.ModelViewSet):
    serializer_class = OpenProjectTagSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = OpenProjectTag.objects.all()
        project_id = self.request.query_params.get("project_id")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset
