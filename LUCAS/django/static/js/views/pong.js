export function renderPong() {
    return `
        <canvas id="pongCanvas" width="800" height="400" style="background-color: #000;"></canvas>
        <script type="module" src="{% static 'js/pongGame.js' %}"></script>
    `;
}
