from rest_framework import generics, permissions
from .models import GameHistory
from .serializers import GameHistorySerializer

class GameHistoryCreateView(generics.CreateAPIView):
    queryset = GameHistory.objects.all()
    serializer_class = GameHistorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
