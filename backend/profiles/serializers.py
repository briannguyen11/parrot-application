from rest_framework import serializers
from .models import Profiles


class ProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profiles
        fields = [
            "id",
            "user",
            "school",
            "major",
            "bio",
            "profile_picture",
            "resume",
            "linkedin",
            "github",
        ]
        read_only_fields = ["user"]

    def validate(self, data):
        # Check if profile_picture is provided
        if "profile_picture" in data:
            profile_picture = data["profile_picture"]
            # Validate profile_picture field
            if profile_picture.size > 10 * 1024 * 1024:  # Example: Limit size to 10 MB
                raise serializers.ValidationError(
                    "Profile picture size should be less than 10 MB."
                )
        # Check if resume is provided
        if "resume" in data:
            resume = data["resume"]
            # Validate resume field
            if resume.size > 10 * 1024 * 1024:  # Example: Limit size to 10 MB
                raise serializers.ValidationError(
                    "Resume size should be less than 10 MB."
                )
        return data
