from rest_framework import serializers
from open_projects.serializers import OpenProjectSerializer, OpenProjectApplySerializer, OpenProjectSaveSerializer, OpenProjectRestrictedSerializer
from showcase_projects.serializers import ShowcaseProjectSerializer, ShowcaseProjectSaveSerializer, LikeSerializer
from .models import Profiles


# Used for searching just for regular profiles, no joins neccessary
class BaseProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "school",
            "major",
            "bio",
            "profile_picture",
            "resume",
            "linkedin",
            "github"
        ]
        read_only_fields = ["user"]


class ProfilesSerializer(serializers.ModelSerializer): 
    open_projects = OpenProjectSerializer(many=True, read_only=True, source="user.open_projects")
    applied_open_projects = OpenProjectApplySerializer(many=True, read_only=True, source="user.applied_open_projects")
    saved_open_projects = OpenProjectSaveSerializer(many=True, read_only=True, source="user.saved_open_projects")
    showcase_projects = ShowcaseProjectSerializer(many=True, read_only=True, source="user.showcase_projects")
    saved_showcase_projects = ShowcaseProjectSaveSerializer(many=True, read_only=True, source="user.saved_showcase_projects")
    likes = LikeSerializer(many=True, read_only=True, source="user.likes")

    class Meta:
        model = Profiles
        fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "school",
            "major",
            "bio",
            "profile_picture",
            "resume",
            "linkedin",
            "github",
            "open_projects",
            "applied_open_projects",
            "saved_open_projects",
            "showcase_projects",
            "saved_showcase_projects",
            "likes"
        ]
        read_only_fields = [
            "user", 
            "open_projects", 
            "applied_open_projects",
            "saved_open_projects",
            "showcase_projects",
            "saved_showcase_projects",
            "likes"
        ]

    def validate(self, data):
        # Check if profile_picture is provided
        if "profile_picture" in data and data["profile_picture"]:
            profile_picture = data["profile_picture"]
            # Validate profile_picture field
            if profile_picture.size > 10 * 1024 * 1024:  # Example: Limit size to 10 MB
                raise serializers.ValidationError(
                    "Profile picture size should be less than 10 MB."
                )
        # Check if resume is provided
        if "resume" in data and data["resume"]:
            resume = data["resume"]
            # Validate resume field
            if resume.size > 10 * 1024 * 1024:  # Example: Limit size to 10 MB
                raise serializers.ValidationError(
                    "Resume size should be less than 10 MB."
                )
        return data


class ProfilesRestrictedSerializer(serializers.ModelSerializer): 
    open_projects = OpenProjectRestrictedSerializer(many=True, read_only=True, source="user.open_projects")
    showcase_projects = ShowcaseProjectSerializer(many=True, read_only=True, source="user.showcase_projects")

    class Meta:
        model = Profiles
        fields = [
            "id",
            "user",
            "first_name",
            "last_name",
            "school",
            "major",
            "bio",
            "profile_picture",
            "resume",
            "linkedin",
            "github",
            "open_projects",
            "showcase_projects",
        ]
        read_only_fields = [
            "user", 
            "open_projects",
            "showcase_projects",
        ]
