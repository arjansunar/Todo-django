from rest_framework.permissions import BasePermission, SAFE_METHODS

class UserCanModifyOwnTask(BasePermission):
    message = "Task can be modified by only author with mod permissions"
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS: 
            return True
        return obj.user == request.user
