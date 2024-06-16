
import LoginView from '../views/LoginView.js';


document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('changeContentButton');
    const contentDiv = document.getElementById('content');

    button.addEventListener('click', function () {

        button.innerHTML = 'Logout';
       
        contentDiv.innerHTML = LoginView;

    });

 
});
