from rest_framework import viewsets, permissions
from backend.views import MixedPermissionsViewSet
from .serializers import (
    ShowcaseProjectSerializer, ShowcaseProjectSaveSerializer,
    ShowcaseProjectTagSerializer, ShowcaseProjectPhotoSerializer, LikeSerializer, CommentSerializer, CommentLikeSerializer
)
from .models import (
    ShowcaseProject, ShowcaseProjectSave, ShowcaseProjectTag, ShowcaseProjectPhoto,
    Like, Comment, CommentLike
)

class ShowcaseProjectViewSet(MixedPermissionsViewSet):
    serializer_class = ShowcaseProjectSerializer

    # Populate user field with the authenticated user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    def get_queryset(self):
        queryset = ShowcaseProject.objects.all()
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

class ShowcaseProjectSaveViewSet(viewsets.ModelViewSet):
    serializer_class = ShowcaseProjectSaveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = ShowcaseProjectSave.objects.all()
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

class ShowcaseProjectTagViewSet(MixedPermissionsViewSet):
    serializer_class = ShowcaseProjectTagSerializer

    def get_queryset(self):
        queryset = ShowcaseProjectTag.objects.all()
        project_id = self.request.query_params.get("project_id")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

class ShowcaseProjectPhotoViewSet(MixedPermissionsViewSet):
    serializer_class = ShowcaseProjectPhotoSerializer

    def get_queryset(self):
        queryset = ShowcaseProjectPhoto.objects.all()
        project_id = self.request.query_params.get("project_id")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

class LikeViewSet(MixedPermissionsViewSet):
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Like.objects.all()
        user_id = self.request.query_params.get("user_id")
        project_id = self.request.query_params.get("project_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        elif project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

class CommentViewSet(MixedPermissionsViewSet):
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Comment.objects.all()
        user_id = self.request.query_params.get("user_id")
        project_id = self.request.query_params.get("project_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        elif project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

class CommentLikeViewSet(MixedPermissionsViewSet):
    serializer_class = CommentLikeSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = CommentLike.objects.all()
        comment_id = self.request.query_params.get("comment_id")
        if comment_id:
            queryset = queryset.filter(comment_id=comment_id)
        return queryset

