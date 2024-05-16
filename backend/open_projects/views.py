from django.db.models import Prefetch
from rest_framework import viewsets, permissions
from backend.views import MixedPermissionsViewSet
from .serializers import (
    OpenProjectSerializer,
    OpenProjectApplySerializer,
    OpenProjectSaveSerializer,
    OpenProjectTagSerializer,
)
from .models import OpenProject, OpenProjectApply, OpenProjectSave, OpenProjectTag
from rest_framework.response import Response
from rest_framework import status


class OpenProjectViewSet(MixedPermissionsViewSet):
    serializer_class = OpenProjectSerializer

    # Populate user field with the authenticated user
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = OpenProject.objects.prefetch_related(Prefetch("tags"))            
        user_id = self.request.query_params.get("user_id")
        explore = self.request.query_params.get("explore")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        if explore:
            queryset = queryset.filter(status="approved")
        
        return queryset
    
class AdminOpenProjectViewSet(viewsets.ModelViewSet):

    serializer_class = OpenProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = OpenProject.objects.all()

        if self.request.user.is_superuser:
            if self.request.query_params.get("status") == "pending":
                queryset = queryset.filter(status="pending_approval")
                return queryset
            if self.request.query_params.get("status") == "approved":
                queryset = queryset.filter(status="approved")
                return queryset
            if self.request.query_params.get("status") == "rejected":
                queryset = queryset.filter(status="rejected")
                return queryset
        else:
            return Response({"error": "You are not authorized to view this page."}, status=status.HTTP_403_FORBIDDEN)
             
        
        
       
       

    

class OpenProjectApplyViewSet(viewsets.ModelViewSet):
    serializer_class = OpenProjectApplySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = OpenProjectApply.objects.prefetch_related(Prefetch("project"))
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset
    

class OpenProjectSaveViewSet(viewsets.ModelViewSet):
    serializer_class = OpenProjectSaveSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = OpenProjectSave.objects.prefetch_related(Prefetch("project"))
        user_id = self.request.query_params.get("user_id")
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        return queryset


class OpenProjectTagViewSet(MixedPermissionsViewSet):
    serializer_class = OpenProjectTagSerializer

    def get_queryset(self):
        queryset = OpenProjectTag.objects.all()
        project_id = self.request.query_params.get("project_id")
        if project_id:
            queryset = queryset.filter(project_id=project_id)
        return queryset
    
    # Overriding the create method to allow creating multiple tags at once
    def create(self, request):
        project_id = request.data.get('project')

        tags = request.data.get('tags', [])
        if not isinstance(tags, list):
            return Response({'error': 'Expected a list of tags.'}, status=status.HTTP_400_BAD_REQUEST)

        tag_instances = []
        for tag_name in tags:
            tag_data = {'project': project_id, 'tag': tag_name}
            tag_serializer = self.get_serializer(data=tag_data)
            if tag_serializer.is_valid():
                tag_serializer.save()
                tag_instances.append(tag_serializer.data)
            else:
                return Response(tag_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(tag_instances, status=status.HTTP_201_CREATED)
    
    # Overriding the delete method to allow deleting tags by project ID
    def delete(self, request):
        project_id = request.query_params.get("project_id")
        if not project_id:
            return Response({'error': 'Project ID is required for deletion.'}, status=status.HTTP_400_BAD_REQUEST)

        queryset = self.get_queryset().filter(project_id=project_id)
        if not queryset.exists():
            return Response({'error': 'No tags found for the provided project ID.'}, status=status.HTTP_404_NOT_FOUND)

        deleted_count, _ = queryset.delete()
        return Response({'success': f'{deleted_count} tags deleted successfully.'}, status=status.HTTP_200_OK)