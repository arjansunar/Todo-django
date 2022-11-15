from django.urls import path 
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns =[
    # auth routes 
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # api routes
    path('', view=views.index, name="api_index"),
    path('protected', view=views.protected_route, name="protected")

]