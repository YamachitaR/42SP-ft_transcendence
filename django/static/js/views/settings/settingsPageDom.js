import  { navigateTo }  from '../../main.js';

export function clickSettingPage() {

    document.getElementById('settingsUser').addEventListener('click', () => handleButtonClick('settingsUser'));
    document.getElementById('settingsGame').addEventListener('click', () => handleButtonClick('settingsGame'));

    function handleButtonClick(buttonId) {
        let content = '';
        switch (buttonId) {
            case 'settingsUser':
                navigateTo('/settings-user/', {});
                break;
            case 'settingsGame':
                navigateTo('/settings-game/', {});
                break;
            default:
                content = 'Unknown button!';
                document.getElementById('content').innerHTML = content;
        }
    }
}
