import  { navigateTo }  from '../router.js';

let playerCount = 0;

export function handlePlayerCount() {
		document.getElementById('next').addEventListener('click', () => {
			const count = document.getElementById('qtPlayes').value;
			playerCount = parseInt(count, 10);
			if (isNaN(playerCount) || playerCount <= 2) {
				alert('Por favor, insira uma quantidade válida de jogadores "maior de 2".');
			} else {
				localStorage.setItem('playerCount', playerCount);
				navigateTo('/tournament-nicknames/', {});
			}
		});
}

export { playerCount };
