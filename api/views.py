from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from .serializers import UserSerializer, RegisterUserSerialier

# Create your views here.
@api_view(['GET'])
def index(request): 
    return Response({"message": "hello"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_route(request): 
    return Response({"message": 'you can access resource'})

@api_view(['POST'])
def signup(request): 
    serializer = RegisterUserSerialier(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()

    return Response({"message": "sign up page", "user": UserSerializer(user).data})
    



