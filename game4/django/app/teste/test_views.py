from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from myapp.models import Amizade

CustomUser = get_user_model()

class EnviarSolicitacaoAmizadeTests(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.user1 = CustomUser.objects.create_user(email='user1@example.com', password='pass1234')
        self.user2 = CustomUser.objects.create_user(email='user2@example.com', password='pass1234')
        self.url = reverse('enviar_solicitacao_amizade')

    def test_nao_enviar_solicitacao_para_si_mesmo(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(self.url, {'amigo_id': self.user1.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['message'], 'Você não pode enviar uma solicitação de amizade para você mesmo')

    def test_enviar_solicitacao_sucesso(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(self.url, {'amigo_id': self.user2.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Solicitação de amizade enviada com sucesso!')

    def test_solicitacao_ja_existente(self):
        Amizade.objects.create(user=self.user1, amigo=self.user2, aceita=False)
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(self.url, {'amigo_id': self.user2.id}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Solicitação de amizade já enviada, aguardando aceitação')

    def test_solicitacao_para_usuario_inexistente(self):
        self.client.force_authenticate(user=self.user1)
        response = self.client.post(self.url, {'amigo_id': 9999}, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data['error'], 'Usuário não encontrado')
