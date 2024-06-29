/**
 * OrbitControls.js
 * Controles de órbita para câmera em Three.js
 */

THREE.OrbitControls = function (camera, domElement) {
    
    this.camera = camera;

    this.domElement = (domElement !== undefined) ? domElement : document;

    this.enabled = true;

    this.target = new THREE.Vector3();

    this.rotateSpeed = 0.5;
    this.zoomSpeed = 1.2;

    this.rotateStart = new THREE.Vector2();
    this.rotateEnd = new THREE.Vector2();
    this.rotateDelta = new THREE.Vector2();

    this.zoomStart = new THREE.Vector2();
    this.zoomEnd = new THREE.Vector2();
    this.zoomDelta = new THREE.Vector2();

    this.domElement.addEventListener('contextmenu', function (event) { event.preventDefault(); }, false);

    this.domElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.domElement.addEventListener('wheel', this.onMouseWheel.bind(this), false);

};

THREE.OrbitControls.prototype = {

    constructor: THREE.OrbitControls,

    update: function () {

        this.camera.lookAt(this.target);

    },

    onMouseDown: function (event) {

        if (this.enabled === false) return;

        event.preventDefault();

        this.rotateStart.set(event.clientX, event.clientY);

        this.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.domElement.addEventListener('mouseup', this.onMouseUp.bind(this), false);

    },

    onMouseMove: function (event) {

        if (this.enabled === false) return;

        event.preventDefault();

        this.rotateEnd.set(event.clientX, event.clientY);
        this.rotateDelta.subVectors(this.rotateEnd, this.rotateStart);

        var elementRect = this.domElement.getBoundingClientRect();
        var radius = Math.min(elementRect.width, elementRect.height) / 2;

        this.rotateDelta.x = (this.rotateDelta.x / radius) * this.rotateSpeed;
        this.rotateDelta.y = (this.rotateDelta.y / radius) * this.rotateSpeed;

        this.camera.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), this.rotateDelta.x);
        this.camera.position.applyAxisAngle(new THREE.Vector3(1, 0, 0), this.rotateDelta.y);

        this.rotateStart.copy(this.rotateEnd);

        this.update();

    },

    onMouseUp: function () {

        if (this.enabled === false) return;

        this.domElement.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
        this.domElement.removeEventListener('mouseup', this.onMouseUp.bind(this), false);

    },

    onMouseWheel: function (event) {

        if (this.enabled === false) return;

        event.preventDefault();

        var delta = 0;

        if (event.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta;

        } else if (event.detail !== undefined) { // Firefox

            delta = -event.detail;

        }

        if (delta > 0) {

            this.camera.position.multiplyScalar(this.zoomSpeed);

        } else {

            this.camera.position.divideScalar(this.zoomSpeed);

        }

        this.update();

    }

};
