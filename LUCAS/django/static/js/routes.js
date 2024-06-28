import { renderPlayGame } from './views/playGameViews.js';
import { initPlayGame } from './dom/playGameDom.js';
import renderLogin from './views/loginViews.js';
import renderRegister from './views/registerViews.js';
import { domBtnLogin, domBtnCad, domBtn42 } from './dom/loginDom.js';
import { domBtnRegister, domBtnBackHome } from './dom/registerDom.js';
import { logout } from './dom/logoutDom.js';
import renderProfileUser from './views/userProfileViews.js';
import { renderUserInfo, sendUpdate } from './dom/userProfileDom.js';
import renderDashboard from './views/dashboardView.js';
import { renderDashUserInfo, carregarHistoricoJogosDashboard} from './dom/dashboardDom.js';
import { carregarListaAmigosDashboard } from './dom/dashboardDom.js';
import renderBuscarAmigos from './views/renderBuscarAmigos.js';
import { domBtnBuscarAmigos, carregarSolicitacoesPendentes, carregarSolicitacoesEnviadas, carregarListaAmigos } from './dom/domBtnBuscarAmigos.js';
import { initializeStatusSocket } from './statusWebSocket.js';
import renderProfileFriend from './views/friendProfileViews.js';
import { initProfileUser } from './dom/friendProfileDom.js';
import gameTorneioInitViews from './views/gameTorneioViews.js';
import gameTorneioInscricoesViews  from './views/torneio/inscricoesViews.js';
import { handlePlayerCount } from './torneio/domTournament.js';
import { initTournamentSetup} from './torneio/domInscricao.js';

// Crud //
import { fetchUserInfo } from './crud/user.js';
import { getGamePreferences } from './crud/user.js';
import { user } from './crud/user.js';

// Settings Views //""
import renderSettingsPage from './views/settings/settingsPageViews.js';
import renderSettingsUser from './views/settings/settingsUserViews.js';
import renderSettingsGame from './views/settings/settingsGameViews.js';

// Settings Doms //
import { clickSettingPage } from './views/settings/settingsPageDom.js';
import { renderUserInfos, sendUpdateUser } from './views/settings/settingsUserDom.js';
import { renderPreferencesGame, sendUpdateGame } from './views/settings/settingsGameDom.js';

// Game Vs IA //
import gameVsIaPage from './views/gameVsIA/gameIAPageViews.js';
import { clickGameIAPage } from './views/gameVsIA/gameIAPageDom.js';

// Game 3D //
import game3dPage from './views/game3d/game3dPageViews.js';
import { clickGame3dPage } from './views/game3d/game3dPageDom.js';


// Classic Game //
import gameClassicViews from './views/gameClassicViews.js';
import { gameClassicDom } from './dom/gameClassicDom.js';

import startGameClassic from './views/startGameClassic.js'


import renderChat from './views/renderChat.js';
import {initializeChat} from './dom/chatWebSocket.js';


import { cleanupResources } from './dom/clean.js';


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
	'/playGame/': {
        template: renderPlayGame(),
        init: () => {
            initPlayGame();
			cleanupResources();
        }
    },
    '/dashboard/': {
        template: renderDashboard(),
        init: () => {
            renderDashUserInfo();
			carregarListaAmigosDashboard();
			carregarHistoricoJogosDashboard();
			cleanupResources();
        }
    },
	'/friends/': {
        template: renderBuscarAmigos(),
        init: () => {
            domBtnBuscarAmigos();
			carregarSolicitacoesPendentes();
			carregarSolicitacoesEnviadas();
			carregarListaAmigos();
			cleanupResources();
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
    '/settings/': {
        template: renderSettingsPage(),
        init: () => {
            getGamePreferences();
            clickSettingPage();
			cleanupResources();
        }
    },
    '/settings-user/': {
        template: renderSettingsUser(),
        init: () => {
            renderUserInfos();
            sendUpdateUser();
        }
    },
    '/settings-game/': {
        template: renderSettingsGame(),
        init: () => {
            renderPreferencesGame();
            sendUpdateGame();
        }
    },
    '/game-vs-ia/': {
        template: gameVsIaPage(),
        init: () => {
            clickGameIAPage();
        }
    },
    '/game-3d/': {
        template: game3dPage(),
        init: () => {
            clickGame3dPage();
        }
    },
    '/gameClassicViews/': {
        template: gameClassicViews(),
        init: () => {
            gameClassicDom();
        }
    },
    '/game-classic/': {
        template:startGameClassic(),
        init: () => {
        }
    },
	'/chat/': {
        template: renderChat(),
        init: initializeChat
    },
    '/': {
        template: renderDashboard(),
        init: async () => {
            renderDashUserInfo();
			if (user.id) {
                initializeStatusSocket();
			carregarHistoricoJogosDashboard();

			}
        }
    }
};

export default routes;
