from rest_framework.routers import DefaultRouter
from profiles.views import ProfilesViewSet

router = DefaultRouter()
router.register(r"", ProfilesViewSet, basename="user-profile")

urlpatterns = router.urls
