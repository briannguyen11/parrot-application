from rest_framework.routers import DefaultRouter
from profiles.views import ProfilesViewSet, ProfileSearchViewSet


router = DefaultRouter()
router.register(r"search", ProfileSearchViewSet, basename="profile-search")
router.register(r"", ProfilesViewSet, basename="user-profile")


urlpatterns = router.urls
