from rest_framework import serializers
from .models import Profiles


class ProfilesSerializer(serializers.ModelSerializer):
    model = Profiles
    fields = [
        "id",
        "user",
        "schoo",
        "major",
        "bio",
        "profile_picture",
        "resume",
        "linkedin",
        "github",
    ]
    read_only_fields = ["user"]
