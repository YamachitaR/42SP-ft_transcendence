
import { navigateTo } from "../router.js";

export function gameClassicDom(){

      // Seleciona o elemento com o ID 'startClassic'
      const startClassicButton = document.getElementById('startClassic');
    
      // Verifica se o elemento existe
      if (startClassicButton) {
          // Adiciona um evento de clique ao botão
          startClassicButton.addEventListener('click', () => {
              // Chama a função navigateTo com a URL desejada
              navigateTo('/game-classic/', {});
          });
      }

}