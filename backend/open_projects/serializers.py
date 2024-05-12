from rest_framework import serializers
from .models import OpenProject, OpenProjectApply, OpenProjectSave, OpenProjectTag


class OpenProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenProject
        fields = [
            "id",
            "user",
            "project_name",
            "description",
            "level",
            "post_date",
            "open",
            "status",
            "group_size",
        ]
        read_only_fields = ["user", "status"]


class OpenProjectApplySerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenProjectApply
        fields = ["id", "user", "project", "status"]
        read_only_fields = ["user"]


class OpenProjectSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenProjectSave
        fields = ["id", "user", "project"]
        read_only_fields = ["user"]


class OpenProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenProjectTag
        fields = ["id", "project", "tag"]
