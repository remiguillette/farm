// 1. Les Imports (en haut du fichier)
import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";

// 2. Initialisation (Ton code actuel)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 1.7, 5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

// Lumières et Contrôles
scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.0));
const sun = new THREE.DirectionalLight(0xffffff, 1.0);
sun.position.set(50, 80, 20);
scene.add(sun);

const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener("click", () => controls.lock());
scene.add(controls.getObject());

// 3. La boucle d'animation (ESSENTIEL pour voir le rendu)
function animate() {
    requestAnimationFrame(animate);

    // Si tu ajoutes des mouvements plus tard, c'est ici !
    
    renderer.render(scene, camera);
}

animate(); // On lance la boucle
