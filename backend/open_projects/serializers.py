from rest_framework import serializers
from .models import OpenProject, OpenProjectApply, OpenProjectSave, OpenProjectTag


class ProjectDetailsMixin:
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if "request" in self.context:
            request = self.context["request"]
            if request.method == "GET":
                project = instance.project
                project_serializer = OpenProjectSerializer(project)
                data["project"] = project_serializer.data
        return data


class OpenProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenProjectTag
        fields = ["id", "project", "tag"]


class OpenProjectSerializer(serializers.ModelSerializer):
    tags = OpenProjectTagSerializer(many=True, read_only=True)
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
            "tags"
        ]
        read_only_fields = ["user", "tags"]


class OpenProjectApplySerializer(ProjectDetailsMixin, serializers.ModelSerializer):
    class Meta:
        model = OpenProjectApply
        fields = ["id", "user", "project", "status"]
        read_only_fields = ["user", "status"]


class OpenProjectSaveSerializer(ProjectDetailsMixin, serializers.ModelSerializer):
    class Meta:
        model = OpenProjectSave
        fields = ["id", "user", "project"]
        read_only_fields = ["user"]
