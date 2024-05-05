from django.db import models
from accounts.models import User
from django.utils.translation import gettext_lazy as _


class Profiles(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="profile")
    school = models.CharField(max_length=100)
    major = models.CharField(max_length=100)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to="profile_pics", blank=True)
    resume = models.FileField(upload_to="resumes", blank=True)
    linkedin = models.CharField(max_length=250)
    github = models.CharField(max_length=250)

    def __str__(self):
        return f"{self.user.email}'s profile"

    class Meta:
        db_table = "user_profile"
        verbose_name = "User Profile"
        verbose_name_plural = _("User Profiles")
        ordering = ["-user__date_joined"]
