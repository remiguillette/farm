import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

const raycaster = new THREE.Raycaster();

export function checkCollisions(camera, objects, direction) {
  const rayOrigin = camera.position.clone();
  rayOrigin.y -= 1;

  raycaster.set(rayOrigin, direction);
  const intersections = raycaster.intersectObjects(objects, true); // true = check enfants aussi

  return intersections.length > 0 && intersections[0].distance < 0.5;
}
