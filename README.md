# farm
Pour faire un POV (vue à la première personne) dans une ferme 3D “monde libre”, tu bosses comme dans un mini-jeu : scène + caméra + contrôles FPS + assets (modèles/textures) + collisions/physique + logique de gameplay.
Voilà une façon simple et réaliste de t’y prendre.
1) Structure de base d’un projet Three.js
Tu as toujours :
• Scene : le monde
• Camera : ton “œil” (POV)
• Renderer : l’affichage
• Loop : requestAnimationFrame() (la “game loop”)
Setup minimal (POV)
Le plus pratique pour un FPS : Pointer Lock (souris capturée) + caméra qui bouge avec ZQSD/WASD.
import * as THREE from "three"; import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js"; const scene = new THREE.Scene(); scene.background = new THREE.Color(0x87ceeb); // ciel simple const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 2000); camera.position.set(0, 1.7, 5); // hauteur des yeux const renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setSize(innerWidth, innerHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); document.body.appendChild(renderer.domElement); // Lumière scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.0)); const sun = new THREE.DirectionalLight(0xffffff, 1.0); sun.position.set(50, 80, 20); scene.add(sun); // Contrôles FPS const controls = new PointerLockControls(camera, document.body); document.body.addEventListener("click", () => controls.lock()); scene.add(controls.getObject()); 
2) Faire le sol + quelques objets “ferme”
Commence simple : un sol, une grange (cube), des clôtures (boîtes), quelques arbres (cylindre + sphère).
// Sol const groundGeo = new THREE.PlaneGeometry(500, 500); const groundMat = new THREE.MeshStandardMaterial({ color: 0x3b7a3b }); const ground = new THREE.Mesh(groundGeo, groundMat); ground.rotation.x = -Math.PI / 2; scene.add(ground); // Grange simplifiée const barn = new THREE.Mesh( new THREE.BoxGeometry(6, 4, 8), new THREE.MeshStandardMaterial({ color: 0xaa3333 }) ); barn.position.set(10, 2, -10); scene.add(barn); 
3) Mouvement FPS “jeu vidéo”
Tu gères :
• une vitesse
• un vecteur direction
• et tu avances le “player object” (celui des controls)
const keys = { forward:false, back:false, left:false, right:false }; addEventListener("keydown", (e) => { if (e.code === "KeyW") keys.forward = true; if (e.code === "KeyS") keys.back = true; if (e.code === "KeyA") keys.left = true; if (e.code === "KeyD") keys.right = true; }); addEventListener("keyup", (e) => { if (e.code === "KeyW") keys.forward = false; if (e.code === "KeyS") keys.back = false; if (e.code === "KeyA") keys.left = false; if (e.code === "KeyD") keys.right = false; }); const clock = new THREE.Clock(); const speed = 6; // m/s function animate(){ const dt = clock.getDelta(); const dir = new THREE.Vector3(); if (keys.forward) dir.z -= 1; if (keys.back) dir.z += 1; if (keys.left) dir.x -= 1; if (keys.right) dir.x += 1; dir.normalize(); // avancer dans la direction de la caméra if (controls.isLocked) { controls.moveRight(dir.x * speed * dt); controls.moveForward(-dir.z * speed * dt); } renderer.render(scene, camera); requestAnimationFrame(animate); } animate(); 
4) Collisions (indispensable pour “monde libre”)
Sans collisions, tu traverses la grange et les clôtures.
Option A (simple au début) : collisions “maison” avec des boîtes (AABB)
• Tu donnes à chaque objet solide une Box3
• Tu testes si le joueur entre dedans
• Si oui, tu annules le mouvement
Option B (meilleure pour un vrai jeu) : moteur de physique
• Pour marcher sur des pentes, gérer gravité/sauts, collisions propres, etc.
5) Ajouter les vrais assets (modèles + textures)
Pour une ferme crédible, tu vas charger des modèles .glb/.gltf :
• grange détaillée
• outils agricoles
• animaux
• végétation
• props (barrières, bottes de foin, etc.)
Tu utilises le chargeur glTF (GLTFLoader) et idéalement :
• textures PBR (albedo/normal/roughness/metalness)
• compression textures (KTX2) si tu veux perf + qualité
6) “Monde libre” : comment tu le construis proprement
Tu découpes ton projet en systèmes :
• World : terrain, routes, clôtures, bâtiments
• Player : caméra POV, inventaire, interaction
• Interact : “E pour ramasser”, ouvrir porte, etc.
• AI/Animals : déplacement simple, animations
• Saving : position, inventaire, temps, cultures
Astuce : commence par une petite zone jouable (100×100 m) avant d’agrandir.
Mini-roadmap concrète (ultra efficace)
• POV + sol + quelques objets
• Collisions + gravité + saut
• Charger 1 modèle glb (grange) + textures
• Interactions : porte, ramasser un objet
• Terrain un peu plus riche (chemin, champs)
• Animaux simples + cycle jour/nuit
Si tu me dis :
• tu veux faire ça en HTML/JS simple, ou avec Vite + modules
• et si ton terrain doit être plat ou avec collines
je te donne un template complet prêt à lancer (structure de fichiers + code + contrôles FPS + collisions de base).
