from rest_framework import serializers
from .models import ShowcaseProject, ShowcaseProjectSave, ShowcaseProjectTag, ShowcaseProjectPhoto, Like, Comment, CommentLike


class ProjectDetailsMixin:
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if "request" in self.context:
            request = self.context["request"]
            if request.method == "GET":
                project = instance.project
                project_serializer = ShowcaseProjectSerializer(project)
                data["project"] = project_serializer.data
        return data
    

class ShowcaseProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProjectTag
        fields = ["id", "project", "tag"]


class ShowcaseProjectPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProjectPhoto
        fields = ["id", "project", "photo", "caption", "order"]


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "project"]
        read_only_fields = ["user"]


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ["id", "user", "comment"]
        read_only_fields = ["user"]


class CommentSerializer(serializers.ModelSerializer):
    comment_likes = CommentLikeSerializer(many=True, read_only=True)
    class Meta:
        model = Comment
        fields = ["id", "user", "project", "content", "comment_likes", "created_date"]
        read_only_fields = ["user", "comment_likes"]


class ShowcaseProjectSerializer(serializers.ModelSerializer):
    tags = ShowcaseProjectTagSerializer(many=True, read_only=True)
    photos = ShowcaseProjectPhotoSerializer(many=True, read_only=True)
    likes = LikeSerializer(many=True, read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = ShowcaseProject
        fields = ["id", "user", "project_name", "description", "tags", "photos", "likes", "comments", "post_date"]
        read_only_fields = ["user", "tags", "photos", "likes", "comments"]


class ShowcaseProjectSaveSerializer(ProjectDetailsMixin, serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProjectSave
        fields = ["id", "user", "project"]
        read_only_fields = ["user"]
