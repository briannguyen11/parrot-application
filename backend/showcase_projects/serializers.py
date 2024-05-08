from rest_framework import serializers
from .models import ShowcaseProject, ShowcaseProjectSave, ShowcaseProjectTag, ShowcaseProjectPhoto, Like, Comment, CommentLike

class ShowcaseProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProject
        fields = ["id", "user", "project_name", "description", "photos", "post_date"]
        read_only_fields = ["user"]

class ShowcaseProjectSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProjectSave
        fields = ["id", "user", "project"]
        read_only_fields = ["user"]

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

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "user", "project", "content", "created_date"]
        read_only_fields = ["user"]

class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ["id", "user", "comment"]
        read_only_fields = ["user"]
