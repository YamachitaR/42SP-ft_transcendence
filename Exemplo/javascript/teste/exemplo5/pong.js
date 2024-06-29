let scene, camera, renderer, ball, table, paddles, light;
let paddleSpeed = 2, ballSpeed = 1.5, ballDirection, scores, keys;

init();
animate();

function init() {
    // Cena
    scene = new THREE.Scene();

    // Câmera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 200, 250);
    camera.lookAt(0, 0, 0);

    // Renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Luz
    light = new THREE.PointLight(0xffffff);
    light.position.set(0, 200, 200);
    scene.add(light);

    // Mesa (Triangular)
    const tableGeometry = new THREE.Geometry();
    tableGeometry.vertices.push(new THREE.Vector3(0, -5, 0));
    tableGeometry.vertices.push(new THREE.Vector3(-100, -5, -100));
    tableGeometry.vertices.push(new THREE.Vector3(100, -5, -100));
    tableGeometry.faces.push(new THREE.Face3(0, 1, 2));
    const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    table = new THREE.Mesh(tableGeometry, tableMaterial);
    table.position.y = -5;
    scene.add(table);

    // Bola
    const ballGeometry = new THREE.SphereGeometry(5, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    ball = new THREE.Mesh(ballGeometry, ballMaterial);
    ball.position.y = 5;
    scene.add(ball);

    // Raquetes
    const paddleGeometry = new THREE.BoxGeometry(10, 5, 20);
    const paddleMaterial1 = new THREE.MeshPhongMaterial({ color: 0x0000ff });
    const paddleMaterial2 = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    const paddleMaterial3 = new THREE.MeshPhongMaterial({ color: 0xff00ff });

    paddles = [
        new THREE.Mesh(paddleGeometry, paddleMaterial1), // Jogador 1
        new THREE.Mesh(paddleGeometry, paddleMaterial2), // Jogador 2
        new THREE.Mesh(paddleGeometry, paddleMaterial3)  // Jogador 3
    ];

    // Posicionamento das raquetes em um layout triangular
    paddles[0].position.set(-100, 5, -50); // Posição inicial Jogador 1
    paddles[0].rotation.y = Math.PI / 4;
    paddles[1].position.set(100, 5, -50); // Posição inicial Jogador 2
    paddles[1].rotation.y = -Math.PI / 4;
    paddles[2].position.set(0, 5, 100); // Posição inicial Jogador 3
    paddles[2].rotation.y = Math.PI / 2;

    paddles.forEach(paddle => scene.add(paddle));

    // Direção da bola
    ballDirection = new THREE.Vector3(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize();

    // Pontuações e teclas
    scores = [0, 0, 0];
    keys = {};

    document.addEventListener('keydown', (event) => keys[event.key] = true);
    document.addEventListener('keyup', (event) => keys[event.key] = false);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function update() {
    // Movimentação das raquetes
    if (keys['w'] && paddles[0].position.z < 0) paddles[0].position.z += paddleSpeed;
    if (keys['s'] && paddles[0].position.z > -100) paddles[0].position.z -= paddleSpeed;
    if (keys['a'] && paddles[1].position.z < 0) paddles[1].position.z += paddleSpeed;
    if (keys['d'] && paddles[1].position.z > -100) paddles[1].position.z -= paddleSpeed;
    if (keys['ArrowUp'] && paddles[2].position.x < 100) paddles[2].position.x += paddleSpeed;
    if (keys['ArrowDown'] && paddles[2].position.x > -100) paddles[2].position.x -= paddleSpeed;

    // Movimento da bola
    ball.position.addScaledVector(ballDirection, ballSpeed);

    // Colisão com as bordas do campo triangular
    if (ball.position.x > 100 || ball.position.x < -100 || ball.position.z > 100 || ball.position.z < -100) {
        ballDirection.negate();
    }

    // Colisão com as raquetes
    paddles.forEach((paddle) => {
        if (ball.position.distanceTo(paddle.position) < 15) {
            ballDirection.x = -ballDirection.x;
            ballDirection.z = (ball.position.z - paddle.position.z) / 20;
        }
    });

    // Pontuação e reinício da bola
    if (ball.position.x >= 110 || ball.position.x <= -110 || ball.position.z >= 110 || ball.position.z <= -110) {
        scores = [0, 0, 0];
        resetBall();
    }
}

function resetBall() {
    ball.position.set(0, 5, 0);
    ballDirection.set(Math.random() * 2 - 1, 0, Math.random() * 2 - 1).normalize();
}

function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}
