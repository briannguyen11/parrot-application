from django.db import models
from accounts.models import User
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator 

class OpenProject(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="created_projects"
    )
    project_name = models.CharField(max_length=100)
    description = models.TextField()
    LEVELS = [
        ("beginner", "Beginner"),
        ("intermediate", "Intermediate"),
        ("advanced", "Advanced"),
    ]
    level = models.CharField(max_length=100, choices=LEVELS)
    post_date = models.DateTimeField(auto_now_add=True)
    open = models.BooleanField(default=True)
    group_size = models.PositiveIntegerField(null=True, validators=[MinValueValidator(2), MaxValueValidator(9)])

    def __str__(self):
        return self.project_name

    class Meta:
        db_table = "open_project"
        verbose_name = _("Open Project")
        verbose_name_plural = _("Open Projects")
        ordering = ["-post_date"]


class OpenProjectSave(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="saved_open_projects"
    )
    project = models.OneToOneField(
        "OpenProject", on_delete=models.CASCADE, related_name="saved_open_project"
    )

    def __str__(self):
        return f"{self.user.username} - {self.project.project_name}"

    class Meta:
        db_table = "open_project_save"
        verbose_name = _("Open Project Save")
        verbose_name_plural = _("Open Project Saves")


class OpenProjectTag(models.Model):
    project = models.ForeignKey(
        "OpenProject", on_delete=models.CASCADE, related_name="tags"
    )
    tag = models.CharField(max_length=100)

    def __str__(self):
        return self.tag

    class Meta:
        db_table = "open_project_tag"
        verbose_name = _("Open Project Tag")
        verbose_name_plural = _("Open Project Tags")
