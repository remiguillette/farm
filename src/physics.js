import * as THREE from "three";

const raycaster = new THREE.Raycaster();
const playerHeight = 1.7;

export function checkCollisions(camera, objects, direction) {
    // On part du sol sous le joueur
    const rayOrigin = camera.position.clone();
    rayOrigin.y -= 1; // On vérifie au niveau des jambes

    raycaster.set(rayOrigin, direction);
    
    // On teste l'intersection avec les objets de la ferme
    const intersections = raycaster.intersectObjects(objects);

    // Si un objet est à moins de 0.5 unité, on considère qu'il y a collision
    return intersections.length > 0 && intersections[0].distance < 0.5;
}
