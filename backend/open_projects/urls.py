from rest_framework.routers import DefaultRouter
from open_projects.views import OpenProjectViewSet, OpenProjectSaveViewSet, OpenProjectTagViewSet

router = DefaultRouter()
router.register(r"", OpenProjectViewSet)
router.register(r"saves/", OpenProjectSaveViewSet, basename="saves")
router.register(r"tags/", OpenProjectTagViewSet, basename="tags")

urlpatterns = router.urls
