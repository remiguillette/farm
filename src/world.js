// src/world.js
import * as THREE from "three";

export function createWorld(scene) {
  const collidableObjects = [];

  // Sol
  const groundGeo = new THREE.PlaneGeometry(200, 200);
  const groundMat = new THREE.MeshStandardMaterial({ color: 0x3a7d44 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // Une grange simplifiée (un gros bloc)
  const barnGeo = new THREE.BoxGeometry(6, 4, 6);
  const barnMat = new THREE.MeshStandardMaterial({ color: 0x8b2f2f });
  const barn = new THREE.Mesh(barnGeo, barnMat);
  barn.position.set(0, 2, -8); // y=2 car hauteur 4
  scene.add(barn);

  // On ajoute la grange aux objets "solides"
  collidableObjects.push(barn);

  // Quelques obstacles (bottes de foin / caisses)
  const obstacleGeo = new THREE.BoxGeometry(1, 1, 1);
  const obstacleMat = new THREE.MeshStandardMaterial({ color: 0xc2a34a });

  for (let i = 0; i < 8; i++) {
    const box = new THREE.Mesh(obstacleGeo, obstacleMat);
    box.position.set(
      (Math.random() - 0.5) * 20,
      0.5,
      (Math.random() - 0.5) * 20
    );
    scene.add(box);
    collidableObjects.push(box);
  }

  return { collidableObjects };
}
