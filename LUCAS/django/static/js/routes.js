import { renderPlayGame } from './views/playGameViews.js';
import { initPlayGame } from './dom/playGameDom.js';
import renderLogin from './views/loginViews.js';
import renderRegister from './views/registerViews.js';
import { domBtnLogin, domBtnCad, domBtn42 } from './dom/loginDom.js';
import { domBtnRegister, domBtnBackHome } from './dom/registerDom.js';
import { logout } from './dom/logoutDom.js';
import renderProfileUser from './views/userProfileViews.js';
import { renderUserInfo, sendUpdate } from './dom/userProfileDom.js';
import { fetchUserInfo } from './crud/user.js';
import renderDashboard from './views/dashboardView.js';
import { renderDashUserInfo } from './dom/dashboardDom.js';
import { carregarListaAmigosDashboard } from './dom/dashboardDom.js';
import renderBuscarAmigos from './views/renderBuscarAmigos.js';
import { domBtnBuscarAmigos, carregarSolicitacoesPendentes, carregarSolicitacoesEnviadas, carregarListaAmigos } from './dom/domBtnBuscarAmigos.js';
import { connectWebSocket } from './websocket.js';
import { user } from './crud/user.js';
import renderProfileFriend from './views/friendProfileViews.js';
import { initProfileUser } from './dom/friendProfileDom.js';
import gameTorneioInitViews from './views/gameTorneioViews.js';
import gameTorneioInscricoesViews  from './views/torneio/inscricoesViews.js';
import { handlePlayerCount } from './torneio/domTournament.js';
import { initTournamentSetup} from './torneio/domInscricao.js';
import  gameTorneioNextViews from './views/torneio/nextViews.js';
import { initnextviews } from './torneio/domNextViews.js';

const routes = {
    '/login/': {
        template: renderLogin(),
        init: () => {
            domBtnLogin();
            domBtnCad();
            domBtn42();
            console.log('Login carregado');
        }
    },
    '/register/': {
        template: renderRegister(),
        init: () => {
            domBtnRegister();
            domBtnBackHome();
            console.log('Register carregado');
        }
    },
    '/logout/': {
        template: '',
        init: () => {
            logout();
        }
    },
	'/profile/': {
        template: renderProfileUser(),
        init: () => {
            renderUserInfo();
			sendUpdate();
			fetchUserInfo();
        }
    },
	'/playGame/': {
        template: renderPlayGame(),
        init: () => {
            initPlayGame();
        }
    },
    '/dashboard/': {
        template: renderDashboard(),
        init: () => {
            renderDashUserInfo();
			carregarListaAmigosDashboard();
        }
    },
	'/friends/': {
        template: renderBuscarAmigos(),
        init: () => {
            domBtnBuscarAmigos();
			carregarSolicitacoesPendentes();
			carregarSolicitacoesEnviadas();
			carregarListaAmigos();
        }
    },
    '/friends-profile/': {
        template: renderProfileFriend(),
        init: initProfileUser
    },
    '/tournament/': {
        template: gameTorneioInitViews(),
        init: () => {
			handlePlayerCount();
		}
    },
    '/tournament-nicknames/': {
	    template: gameTorneioInscricoesViews(),
		init: initTournamentSetup
	},
	'/tournament-next/': {
	    template: gameTorneioNextViews(),
		init: initnextviews
	},
    '/': {
        template: renderDashboard(),
        init: () => {
            renderDashUserInfo();
			if (user.id) {
                connectWebSocket();
				carregarListaAmigosDashboard();
			}
        }
    }
};

export default routes;
