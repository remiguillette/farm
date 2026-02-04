# farm
C'est une excellente base ! Ton code actuel permet de se déplacer, mais tu vas vite te rendre compte qu'on traverse les murs comme un fantôme.

Pour les **collisions**, la méthode la plus simple et performante dans un jeu FPS (sans utiliser un moteur physique lourd comme Cannon.js) consiste à utiliser des **Raycasters**. On projette des rayons depuis la position du joueur dans la direction du mouvement : si le rayon touche un objet à une distance courte, on bloque le mouvement.

Voici comment structurer ton projet proprement.

### 1. Structure des fichiers

Une bonne organisation permet de séparer la logique d'affichage, la gestion des entrées et les objets du monde.

```text
mon-projet-ferme/
├── index.html         # Point d'entrée, contient le canvas
├── style.css          # Reset CSS basique
└── src/
    ├── main.js        # Initialisation de la scène et boucle de rendu
    ├── controls.js    # Gestion du clavier et PointerLock
    ├── world.js       # Création du sol, de la grange, etc.
    └── physics.js     # Logique de détection de collisions

```

---

### 2. Le code propre

#### `index.html`

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Ma Ferme en 3D</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="instructions">Cliquez pour jouer (ZQSD pour bouger)</div>
    <script type="module" src="src/main.js"></script>
</body>
</html>

```

#### `src/physics.js` (La logique de collision)

C'est ici que l'on vérifie si le joueur va percuter un objet.

```javascript
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

```

#### `src/main.js` (Le chef d'orchestre)

Voici comment intégrer les collisions dans ta boucle `animate`.

```javascript
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

```

---

### Pourquoi cette structure ?

1. **Maintenabilité** : Si tu veux changer la couleur de la grange, tu vas dans `world.js`. Si tu veux changer la vitesse de marche, tu vas dans `main.js`.
2. **Performance** : En isolant les `collidableObjects` (comme les murs) des objets décoratifs (comme les nuages), tu évites au processeur de calculer des collisions inutiles.

### Prochaine étape suggérée

Souhaites-tu que je te montre comment ajouter un **modèle 3D réel** (format .GLTF) pour ta grange au lieu d'utiliser un simple cube rouge ?
