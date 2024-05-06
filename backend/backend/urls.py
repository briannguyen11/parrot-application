from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("accounts.urls")),
    path("api/profiles/", include("profiles.urls")),
    path("api/open-projects/", include("open_projects.urls")),
    path("api/showcase-projects/", include("showcase_projects.urls")),
    path("api-auth/", include("rest_framework.urls")),
]
