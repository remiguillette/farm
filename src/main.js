import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { PointerLockControls } from "https://unpkg.com/three@0.160.0/examples/jsm/controls/PointerLockControls.js";
import { createWorld } from "./world.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const clock = new THREE.Clock();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x87ceeb);

scene.add(new THREE.HemisphereLight(0xeeeeff, 0x444422, 1));

const { collidableObjects = [] } = createWorld(scene, THREE);

const controls = new PointerLockControls(camera, document.body);
const instructions = document.getElementById("instructions");
document.addEventListener("click", () => controls.lock());
controls.addEventListener("lock", () => { if (instructions) instructions.style.display = "none"; });
controls.addEventListener("unlock", () => { if (instructions) instructions.style.display = ""; });

const keys = {};
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

camera.position.set(0, 1.7, 5);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  const dt = clock.getDelta();

  if (controls.isLocked) {
    const speed = 5 * dt;

    // AZERTY (ZQSD) :
    if (keys["KeyZ"]) controls.moveForward(speed);
    if (keys["KeyS"]) controls.moveForward(-speed);
    if (keys["KeyQ"]) controls.moveRight(-speed);
    if (keys["KeyD"]) controls.moveRight(speed);

    // Si tu es en QWERTY, remets WASD (KeyW/KeyA).
  }

  renderer.render(scene, camera);
}
animate();
