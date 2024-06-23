import { renderPlayGame } from './views/playGameViews.js';
import { initPlayGame } from './dom/playGameDom.js';
import renderLogin from './views/loginViews.js';
import renderRegister from './views/registerViews.js';
import { domBtnLogin, domBtnCad, domBtn42 } from './dom/loginDom.js';
import { domBtnRegister, domBtnBackHome } from './dom/registerDom.js';
import { logout } from './dom/logoutDom.js';
import  renderProfileUser  from './views/userProfileViews.js';
import { renderUserInfo } from './dom/userProfileDom.js';
import { sendUpdate } from './dom/userProfileDom.js';
import { fetchUserInfo } from './crud/user.js';
import  renderDashboard  from './views/dashboardView.js';
import { renderDashUserInfo } from './dom/dashboardDom.js';
import  renderBuscarAmigos  from './views/renderBuscarAmigos.js';
import { domBtnBuscarAmigos } from './dom/domBtnBuscarAmigos.js';
import { carregarSolicitacoesPendentes } from './dom/domBtnBuscarAmigos.js';

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
    },
	'/friends/': {
        template: renderBuscarAmigos(),
        init: () => {
            domBtnBuscarAmigos();
			carregarSolicitacoesPendentes();
        }
    },
    '/': {
        template: '<h1>Welcome to the Main Page</h1>',
        init: () => {
            renderDashUserInfo();
        }
    },
    '/': {
        template: renderDashboard(),
        init: () => {
            renderDashUserInfo();
        }
    }
};

export default routes;
