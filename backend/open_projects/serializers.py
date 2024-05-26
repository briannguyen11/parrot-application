from rest_framework import serializers
from .models import OpenProject, OpenProjectApply, OpenProjectSave, OpenProjectTag
from profiles.models import Profiles


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
    

class ProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = ["first_name", "last_name", "profile_picture"]


class OpenProjectTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenProjectTag
        fields = ["id", "project", "tag"]


class OpenProjectSerializer(serializers.ModelSerializer):
    profile = ProfileInfoSerializer(source="user.profile", read_only=True)
    tags = OpenProjectTagSerializer(many=True, read_only=True)
    class Meta:
        model = OpenProject
        fields = [
            "id",
            "user",
            "profile",
            "project_name",
            "description",
            "level",
            "post_date",
            "open",
            "status",
            "group_size",
            "tags"
        ]
        read_only_fields = ["user", "profile", "tags"]


class OpenProjectRestrictedSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpenProject
        exclude = ["user", "status"]


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
