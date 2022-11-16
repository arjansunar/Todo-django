from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import DjangoModelPermissions, DjangoModelPermissionsOrAnonReadOnly
from django.shortcuts import  get_object_or_404
from django.http import Http404
import json

from rest_framework import generics

from .serializers import TaskSerializer
from .models import Task
from .permissions import UserCanModifyOwnTask
# Create your views here.

# read tasks
# """gets list of task made by the user according to user id in JWT token"""
# @api_view(['GET'])
# def get_all_tasks(request):
#     user = request.user
#     try: 
#         tasks = Task.objects.filter(user_id=user.id)
#     except Task.DoesNotExist:
#         raise Http404('Task not found')
#     serializer = TaskSerializer(tasks, many = True)
#     return Response({"tasks": serializer.data})

# @api_view(['GET'])
# def get_task(request, pk): 
#     task = get_object_or_404(Task,pk=pk)
#     serializer = TaskSerializer(task)
#     return Response({"task": serializer.data})

# generic class based views 
"""gets list of task made by the user according to user id in JWT token"""
class ListCreateTask(generics.ListCreateAPIView):
    serializer_class= TaskSerializer

    # custom query set to return the list of task created by the user 
    def get_queryset(self):
        user = self.request.user
        try: 
            tasks = Task.objects.filter(user_id=user.id)
        except Task.DoesNotExist:
            raise Http404('Task not found')
        return tasks

    def create(self, request, *args, **kwargs):
        user = self.request.user
        body = json.loads(request.body)
        new_task = Task.objects.create(**body)
        new_task.user =user
        new_task.save()
        new_task = TaskSerializer(new_task).data
        return Response(new_task)

# get detail, delete and update task
class TaskDetailUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes= [DjangoModelPermissions, UserCanModifyOwnTask]
    queryset =  Task.objects.all()