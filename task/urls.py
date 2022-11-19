from django.urls import path 
from . import views

urlpatterns =[
    # read routes
    path('list/',  view=views.ListCreateTask.as_view(), name="list_task"),
    path('detail/<str:pk>/', view=views.TaskDetailUpdateDestroyView.as_view(),name="single_task"),
]