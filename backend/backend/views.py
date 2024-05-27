from rest_framework import permissions, viewsets
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

METHODS_TO_OVERRIDE = {"GET"}

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request,
        # so we'll always allow GET, HEAD, or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the profile.
        return obj.user == request.user


class OwnerPermissionMixin:
    permission_classes_by_action = {
        "update": [permissions.IsAuthenticated, "is_owner"],
        "partial_update": [permissions.IsAuthenticated, "is_owner"],
        "destroy": [permissions.IsAuthenticated, "is_owner"],
        "default": [permissions.IsAuthenticatedOrReadOnly],
    }

    def get_permissions(self):
        try:
            # Return the permission classes based on the action
            permissions_list = self.permission_classes_by_action.get(
                self.action, self.permission_classes_by_action["default"]
            )
            return [self._get_permission_instance(permission) for permission in permissions_list]
        except KeyError:
            # If the action is not set, return the default permission classes
            return [permission() for permission in self.permission_classes_by_action["default"]]

    def _get_permission_instance(self, permission):
        if isinstance(permission, str) and permission == "is_owner":
            return IsOwnerOrReadOnly()
        return permission()

    def get_object(self):
        queryset = self.get_queryset()
        filter_kwargs = {"pk": self.kwargs["pk"]}
        obj = get_object_or_404(queryset, **filter_kwargs)
        self.check_object_permissions(self.request, obj)
        return obj

    def check_object_permissions(self, request, obj):
        # Call the original check_object_permissions to apply the DRF permissions
        super().check_object_permissions(request, obj)
        # Check the custom 'is_owner' permission
        if "is_owner" in [perm.__class__.__name__ for perm in self.get_permissions()]:
            if not obj.user == request.user:
                raise PermissionDenied("You do not have permission to modify this object.")


class MixedPermissionsViewSet(OwnerPermissionMixin, viewsets.ModelViewSet):
    
    def get_authenticators(self):
        if self.request.method in permissions.SAFE_METHODS:
            return []
        return super().get_authenticators()

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return []
        return super().get_permissions()
