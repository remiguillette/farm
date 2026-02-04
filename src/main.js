import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { createWorld } from "./world.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const clock = new THREE.Clock();

// Setup
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x87ceeb);

// Lumières
const light = new THREE.HemisphereLight(0xeeeeff, 0x444422, 1);
scene.add(light);

// Objets (on récupère la liste des objets "solides")
const { collidableObjects } = createWorld(scene);

// Contrôles
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => controls.lock());

const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

camera.position.set(0, 1.7, 5);

function animate() {
    requestAnimationFrame(animate);
    const dt = clock.getDelta();

    if (controls.isLocked) {
        const speed = 5 * dt;
        
        // Direction de déplacement
        if (keys['KeyW']) controls.moveForward(speed);
        if (keys['KeyS']) controls.moveForward(-speed);
        if (keys['KeyA']) controls.moveRight(-speed);
        if (keys['KeyD']) controls.moveRight(speed);

        // ASTUCE COLLISION SIMPLE : 
        // Si la nouvelle position est trop proche d'un objet dans `collidableObjects`, 
        // on pourrait annuler le mouvement ou utiliser le raycaster de physics.js.
    }

    renderer.render(scene, camera);
}

animate();
