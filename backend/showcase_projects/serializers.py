from rest_framework import serializers
from .models import ShowcaseProject, ShowcaseProjectSave, ShowcaseProjectTag, Like, Comment, CommentLike

class ShowcaseProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProject
        fields = ["id", "user", "project_name", "description", "photos", "post_date"]

class ShowcaseProjectSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProjectSave
        fields = ["id", "user", "project"]

class ShowcaseProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShowcaseProjectTag
        fields = ["id", "project", "tag"]

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "project"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "user", "project", "content"]

class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ["id", "user", "comment"]
