from django.urls import path 
from . import views

urlpatterns =[
    # read routes
    path('list/',  view=views.get_all_tasks, name="list_task"),
    path('detail/<str:pk>/', view=views.get_task,name="single_task")
]