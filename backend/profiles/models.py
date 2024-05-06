from django.db import models
from accounts.models import User
from django.utils.translation import gettext_lazy as _


class Profiles(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    school = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to="profiles/profile_pics", blank=True)
    resume = models.FileField(upload_to="profiles/resumes", blank=True)
    linkedin = models.CharField(max_length=250)
    github = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.first_name} {self.last_name}'s profile"

    class Meta:
        db_table = "user_profile"
        verbose_name = "User Profile"
        verbose_name_plural = _("User Profiles")
        ordering = ["-user__date_joined"]
