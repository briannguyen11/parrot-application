from rest_framework.routers import DefaultRouter
from open_projects.views import (
    OpenProjectViewSet,
    OpenProjectApplyViewSet,
    OpenProjectSaveViewSet,
    OpenProjectTagViewSet,
    AdminOpenProjectViewSet
)

router = DefaultRouter()
router.register(r"projects", OpenProjectViewSet, basename="open-projects")
router.register(r"admin", AdminOpenProjectViewSet, basename="admin-open-projects")
router.register(r"apply", OpenProjectApplyViewSet, basename="open-project-apply")
router.register(r"saves", OpenProjectSaveViewSet, basename="open-project-saves")
router.register(r"tags", OpenProjectTagViewSet, basename="open-project-tags")

urlpatterns = router.urls
