# app/urls.py
from django.urls import path, include
from .views.auth import RegisterView, LoginView, LogoutView, CheckAuthView,\
                        external_login, external_callback
from .views.crud import get_user_info, update_user, UserPreferencesView, \
                        listar_todos_usuarios, buscar_id_pelo_username, \
						get_user_info_by_id
from .views import views
from .views.friend import enviar_solicitacao_amizade, listar_solicitacoes_pendentes,\
                          listar_amigos, verificar_amizade, aprovar_solicitacao_amizade,\
						  rejeitar_solicitacao_amizade, listar_solicitacoes_enviadas,\
						  excluir_amizade, listar_amigos_online
from .views.game_history import GameHistoryCreateView, listGameHistory

urlpatterns = [
    path('', views.home, name='home'),
    path('signup/', RegisterView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-auth/', CheckAuthView.as_view(), name='check_auth'),
    path('login-external/', external_login, name='external_login'),
    path('callback/', external_callback, name='external_callback'),
    path('get-user-info/', get_user_info, name='get_user_info'),
    path('update-user/', update_user, name='update_user'),
    path('user-preferences/', UserPreferencesView, name='user-preferences'),
	path('amizades/', enviar_solicitacao_amizade, name='enviar_solicitacao_amizade'),
	path('amizades/pendentes/', listar_solicitacoes_pendentes, name='listar_solicitacoes_pendentes'),
    path('amizades/enviadas/', listar_solicitacoes_enviadas, name='listar_solicitacoes_enviadas'),
	path('amizades/amigos/', listar_amigos, name='listar_amigos'),
	path('amigos/online/', listar_amigos_online, name='listar_amigos_online'),
	path('amizades/verificar/<int:amigo_id>/', verificar_amizade, name='verificar_amizade'),
	path('amizades/aprovar/', aprovar_solicitacao_amizade, name='aprovar_solicitacao_amizade'),
	path('amizades/rejeitar/', rejeitar_solicitacao_amizade, name='rejeitar_solicitacao_amizade'),
	path('excluir_amizade/', excluir_amizade, name='excluir_amizade'),
	path('usuarios/buscar-id/', buscar_id_pelo_username, name='buscar_id_pelo_username'),
 	path('usuarios/', listar_todos_usuarios, name='listar_todos_usuarios'),
	path('user-info/<int:user_id>/', get_user_info_by_id, name='get_user_info_by_id'),
	path('game-history/', GameHistoryCreateView, name='game-history-create'),
	path('game-history-list/<int:user_id>/', listGameHistory, name='list-Game-History'),
]
