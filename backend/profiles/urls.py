from rest_framework.routers import DefaultRouter
from profiles.views import (
    PublicProfilesViewSet,
    PrivateProfilesViewSet,
    ProfileSearchViewSet,
    BaseProfileViewset,
    MiniProfileViewset,
)


router = DefaultRouter()
router.register(r"search", ProfileSearchViewSet, basename="profile-search")
router.register(r"mini", MiniProfileViewset, basename="user-mini-profile")
router.register(r"public", PublicProfilesViewSet, basename="user-public-profile")
router.register(r"private", PrivateProfilesViewSet, basename="user-private-profile")
router.register(r"", BaseProfileViewset, basename="user-profile")


urlpatterns = router.urls
