from rest_framework.routers import DefaultRouter
from profiles.views import PublicProfilesViewSet, PrivateProfilesViewSet, ProfileSearchViewSet


router = DefaultRouter()
router.register(r"search", ProfileSearchViewSet, basename="profile-search")
router.register(r"public", PublicProfilesViewSet, basename="user-public-profile")
router.register(r"", PrivateProfilesViewSet, basename="user-profile")


urlpatterns = router.urls
