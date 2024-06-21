export function initPlayGame() {
    // Adiciona event listeners para os botões
    document.getElementById('gameClassic').addEventListener('click', () => handleButtonClick('gameClassic'));
    document.getElementById('game3d').addEventListener('click', () => handleButtonClick('game3d'));
    document.getElementById('game4players').addEventListener('click', () => handleButtonClick('game4players'));
    document.getElementById('gameTorneio').addEventListener('click', () => handleButtonClick('gameTorneio'));

    // Função para lidar com cliques nos botões
    function handleButtonClick(buttonId) {
        let content = '';
        switch (buttonId) {
            case 'gameClassic':
                content = 'You clicked Option 1!';
                break;
            case 'game3d':
                content = 'You clicked Option 2!';
                break;
            case 'game4players':
                content = 'You clicked Option 3!';
                break;
            case 'gameTorneio':
                content = 'You clicked Option 4!';
                break;
            default:
                content = 'Unknown button!';
        }
        document.getElementById('content').innerHTML = content;
    }
}
