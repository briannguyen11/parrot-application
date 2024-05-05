from rest_framework.routers import DefaultRouter
from showcase_projects.views import ShowcaseProjectViewSet, ShowcaseProjectSaveViewSet, ShowcaseProjectTagViewSet, LikeViewSet, CommentViewSet, CommentLikeViewSet


router = DefaultRouter()
router.register(r"", ShowcaseProjectViewSet)
router.register(r"saves/", ShowcaseProjectSaveViewSet, basename="saves")
router.register(r"tags/", ShowcaseProjectTagViewSet, basename="tags")
router.register(r"likes/", LikeViewSet, basename="likes")
router.register(r"comments/", CommentLikeViewSet, basename="comments")
router.register(r"comments/likes/", CommentLikeViewSet, basename="comments/likes")

urlpatterns = router.urls
