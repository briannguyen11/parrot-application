from django.db import models
from accounts.models import User
from django.utils.translation import gettext_lazy as _


class ShowcaseProject(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="showcase_projects"
    )
    project_name = models.CharField(max_length=100)
    description = models.TextField()
    post_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.project_name

    class Meta:
        db_table = "showcase_project"
        verbose_name = _("Showcase Project")
        verbose_name_plural = _("Showcase Projects")
        ordering = ["-post_date"]


class ShowcaseProjectSave(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="saved_showcase_projects"
    )
    project = models.OneToOneField(
        "ShowcaseProject",
        on_delete=models.CASCADE,
        related_name="saved_showcase_project",
    )

    def __str__(self):
        return f"{self.user.username} - {self.project.project_name}"

    class Meta:
        db_table = "showcase_project_save"
        verbose_name = _("Showcase Project Save")
        verbose_name_plural = _("Showcase Project Saves")


class ShowcaseProjectTag(models.Model):
    project = models.ForeignKey(
        "ShowcaseProject", on_delete=models.CASCADE, related_name="tags"
    )
    tag = models.CharField(max_length=100)

    def __str__(self):
        return self.tag

    class Meta:
        db_table = "showcase_project_tag"
        verbose_name = _("Showcase Project Tag")
        verbose_name_plural = _("Showcase Project Tags")


class ShowcaseProjectPhoto(models.Model):
    project = models.ForeignKey(
        "ShowcaseProject", on_delete=models.CASCADE, related_name="photos"
    )
    photo = models.ImageField(upload_to="photos/")
    caption = models.CharField(max_length=250)
    order = models.FloatField()

    def __str__(self):
        return self.caption

    class Meta:
        db_table = "showcase_project_photo"
        verbose_name = _("Showcase Project Photo")
        verbose_name_plural = _("Showcase Project Photos")
        ordering = ["-order"]


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    project = models.ForeignKey(
        "ShowcaseProject", on_delete=models.CASCADE, related_name="likes"
    )

    def __str__(self):
        return f"{self.user.username} - {self.project.project_name}"

    class Meta:
        db_table = "like"
        verbose_name = _("Like")
        verbose_name_plural = _("Likes")


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="comments")
    project = models.ForeignKey(
        "ShowcaseProject", on_delete=models.CASCADE, related_name="comments"
    )
    content = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        db_table = "comment"
        verbose_name = _("Comment")
        verbose_name_plural = _("Comments")
        ordering = ["-created_date"]


class CommentLike(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="comment_likes"
    )
    comment = models.ForeignKey(
        "Comment", on_delete=models.CASCADE, related_name="comment_likes"
    )

    def __str__(self):
        return f"{self.user.username} - {self.comment.content}"

    class Meta:
        db_table = "comment_like"
        verbose_name = _("Comment Like")
        verbose_name_plural = _("Comment Likes")
