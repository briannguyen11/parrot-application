from rest_framework.routers import DefaultRouter
from showcase_projects.views import (
    ShowcaseProjectViewSet,
    ShowcaseProjectSaveViewSet,
    ShowcaseProjectTagViewSet,
    ShowcaseProjectPhotoViewSet,
    LikeViewSet,
    CommentViewSet,
    CommentLikeViewSet,
    ShowcaseSearchViewSet,
    ShowcaseFeedViewSet

)
from django.urls import path


router = DefaultRouter()
router.register(r"projects", ShowcaseProjectViewSet, basename="showcase-projects")
router.register(r"search", ShowcaseSearchViewSet, basename="showcase-search")
router.register(r"saves", ShowcaseProjectSaveViewSet, basename="showcase-project-saves")
router.register(r"tags", ShowcaseProjectTagViewSet, basename="showcase-project-tags")
router.register(
    r"photos", ShowcaseProjectPhotoViewSet, basename="showcase-project-photos"
)
router.register(r"likes", LikeViewSet, basename="likes")
router.register(r"comments", CommentViewSet, basename="comments")
router.register(r"comment-likes", CommentLikeViewSet, basename="comment-likes")
router.register(r"feed", ShowcaseFeedViewSet, basename="showcase-feed")

urlpatterns = router.urls

