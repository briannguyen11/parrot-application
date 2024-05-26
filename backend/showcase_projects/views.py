from django.db.models import Prefetch
from rest_framework import viewsets, permissions
from backend.views import MixedPermissionsViewSet
from .serializers import (
    ShowcaseProjectSerializer,
    ShowcaseProjectSaveSerializer,
    ShowcaseProjectTagSerializer,
    ShowcaseProjectPhotoSerializer,
    LikeSerializer,
    CommentSerializer,
    CommentLikeSerializer,
)
from .models import (
    ShowcaseProject,
    ShowcaseProjectSave,
    ShowcaseProjectTag,
    ShowcaseProjectPhoto,
    Like,
    Comment,
    CommentLike,
)
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action


class ShowcaseProjectPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 20


class ShowcaseSearchViewSet(MixedPermissionsViewSet):
    serializer_class = ShowcaseProjectSerializer
    pagination_class = ShowcaseProjectPagination

    def get_queryset(self):
        queryset = ShowcaseProject.objects.prefetch_related(
            Prefetch("tags"),
            Prefetch("photos"),
            Prefetch("likes"),
            Prefetch("comments"),
        )
        search = self.request.query_params.get("query", None)
        if search is not None:
            queryset = queryset.filter(project_name__icontains=search) | queryset.filter(
                description__icontains=search)
        return queryset



class ShowcaseProjectViewSet(MixedPermissionsViewSet):
    serializer_class = ShowcaseProjectSerializer
    pagination_class = ShowcaseProjectPagination

    # Populate user field with the authenticated user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = ShowcaseProject.objects.prefetch_related(
            Prefetch("tags"),
            Prefetch("photos"),
            Prefetch("likes"),
            Prefetch("comments"),
        )
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset

    @action(detail=False, methods=["post"], url_path="delete-many")
    def delete_many(self, request):
        try:
            ids_to_delete = request.data.get("ids", [])
            if not ids_to_delete:
                return Response(
                    {"error": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST
                )
            ShowcaseProject.objects.filter(id__in=ids_to_delete).delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ShowcaseProjectSaveViewSet(viewsets.ModelViewSet):
    serializer_class = ShowcaseProjectSaveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = ShowcaseProjectSave.objects.prefetch_related(Prefetch("project"))
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

    # Overriding the create method to allow creating multiple tags at once
    def create(self, request):
        project_id = request.data.get("project")

        tags = request.data.get("tags", [])
        if not isinstance(tags, list):
            return Response(
                {"error": "Expected a list of tags."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        tag_instances = []
        for tag_name in tags:
            tag_data = {"project": project_id, "tag": tag_name}
            tag_serializer = self.get_serializer(data=tag_data)
            if tag_serializer.is_valid():
                tag_serializer.save()
                tag_instances.append(tag_serializer.data)
            else:
                return Response(
                    tag_serializer.errors, status=status.HTTP_400_BAD_REQUEST
                )

        return Response(tag_instances, status=status.HTTP_201_CREATED)


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
        queryset = Comment.objects.prefetch_related(Prefetch("comment_likes"))
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
