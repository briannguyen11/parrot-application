from django.db import models
from accounts.models import User


# Create your models here.
# class Profile(models.Model):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     bio = models.TextField()
#     school = models.CharField(max_length=100)
#     major = models.CharField(max_length=100)
#     pfp = models.URLField()
#     user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
