from rest_framework.permissions import BasePermission

class UserCanModifyOwnTask(BasePermission):
    message = "Task can be modified by only author with mod permissions"
    def has_object_permission(self, request, view, obj):
        if request.method == "PATCH" or request.method == "PUT" :
            return False
        return obj.user == request.user
