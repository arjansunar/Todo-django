from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Task
from django.shortcuts import get_list_or_404, get_object_or_404
from django.http import Http404
from .serializers import TaskSerializer

# Create your views here.

# read tasks
"""gets list of task made by the user according to user id in JWT token"""
@api_view(['GET'])
def get_all_tasks(request):
    user = request.user
    try: 
        tasks = Task.objects.filter(user_id=user.id)
    except Task.DoesNotExist:
        raise Http404('Task not found')
    serializer = TaskSerializer(tasks, many = True)
    return Response({"tasks": serializer.data})

@api_view(['GET'])
def get_task(request, pk): 
    task = get_object_or_404(Task,pk=pk)
    serializer = TaskSerializer(task)
    return Response({"task": serializer.data})
