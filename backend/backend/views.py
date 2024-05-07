from rest_framework import viewsets

METHODS_TO_OVERRIDE = {"GET"}

class MixedPermissionsViewSet(viewsets.ModelViewSet):
    
    def get_authenticators(self):
        if self.request.method in METHODS_TO_OVERRIDE:
            return []
        return super().get_authenticators()

    def get_permissions(self):
        if self.request.method in METHODS_TO_OVERRIDE:
            return []
        return super().get_permissions()
