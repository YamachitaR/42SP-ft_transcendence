from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

@api_view(['GET'])
def cadastro(request):
	data = {
		"status": "success",
        "message": "Hello, World!"
	}
	return Response(data, status=status.HTTP_200_OK)
