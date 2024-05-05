from rest_framework import viewsets, permissions
from .serializers import (
    ShowcaseProjectSerializer, ShowcaseProjectSaveSerializer,
    ShowcaseProjectTagSerializer, LikeSerializer, CommentSerializer, CommentLikeSerializer
)
from .models import (
    ShowcaseProject, ShowcaseProjectSave, ShowcaseProjectTag,
    Like, Comment, CommentLike
)

class ShowcaseProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ShowcaseProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

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

class ShowcaseProjectTagViewSet(viewsets.ModelViewSet):
    serializer_class = ShowcaseProjectTagSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = ShowcaseProjectTag.objects.all()
        project_id = self.request.query_params.get("project_id")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset

class LikeViewSet(viewsets.ModelViewSet):
    serializer_class = LikeSerializer
    permission_classes = [permissions.IsAuthenticated]

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

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

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

class CommentLikeViewSet(viewsets.ModelViewSet):
    serializer_class = CommentLikeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = CommentLike.objects.all()
        comment_id = self.request.query_params.get("comment_id")
        if comment_id:
            queryset = queryset.filter(comment_id=comment_id)
        return queryset

