import startGameVsIA from './gameIAPlayViews.js';

export function clickGameIAPage() {

    document.getElementById('startGame').addEventListener('click', () => handleButtonClick());

    function handleButtonClick(buttonId) {
        content = 'none';
        content = startGameVsIA();
        document.getElementById('content').innerHTML = content;
    }
}