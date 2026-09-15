import * as THREE from 'https://esm.sh/three@0.160.0';
import { OrbitControls } from 'https://esm.sh/three@0.160.0/examples/jsm/controls/OrbitControls.js';
const brunoImage = './assets/bruno.png';
const giggsImage = './assets/giggs.png';
const logoImage = './assets/logo.png'; 
const ronaldoImage = './assets/ronaldo.png';
const rooneyImage = './assets/rooney.png';
const canvas = document.getElementById('NONO');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 6); 
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(0, 5, 5);
scene.add(dirLight);
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const carpetMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xff0000,
    roughness: 0.8 
});
const floor = new THREE.Mesh(floorGeometry, carpetMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -0.5; // 
const podiumGeometry = new THREE.BoxGeometry(0.8, 1, 0.8);
const podiumMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9 });
const podiums = [
    { x: -1.2, z: -1.5 },
    { x: 0, z: -1.5 },
    { x: 1.2, z: -1.5 }
];
podiums.forEach(pos => {
    const podium = new THREE.Mesh(podiumGeometry, podiumMaterial);
    podium.position.set(pos.x, 0, pos.z);
    scene.add(podium);
});
const basicMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.8, roughness: 0.2 });
const trophy1 = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 12, 48), basicMaterial);
trophy1.position.set(-1.2, 0.7, -1.5);
trophy1.rotation.x = Math.PI / 2;
scene.add(trophy1);
const trophy2Group = new THREE.Group();
trophy2Group.add(new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32), basicMaterial));
trophy2Group.add(new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.03, 10, 32), basicMaterial));
trophy2Group.position.set(0, 0.75, -1.5);
scene.add(trophy2Group);
const ballGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const ballMaterial = new THREE.MeshStandardMaterial({ color: 0xDAA520, metalness: 0.9, roughness: 0.1 });
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(1.2, 0.75, -1.5);
scene.add(ball);
const ballLight = new THREE.PointLight(0xFFD700, 10, 3);
ballLight.position.set(1.2, 0.75, -1.5);
scene.add(ballLight);
const paintingsData = [
    { 
        url: ronaldoImage, 
        position: [-2.5, 0.8, -1], 
        rotation: [0, Math.PI / 4, 0] 
    },
    { 
        url: brunoImage, 
        position: [2.5, 0.8, -1], 
        rotation: [0, -Math.PI / 4, 0] 
    },
    { 
        url: rooneyImage, 
        position: [-4.5, 0.8, 0.5], 
        rotation: [0, Math.PI / 2.5, 0] 
    },
    { 
        url: giggsImage, 
        position: [4.5, 0.8, 0.5], 
        rotation: [0, -Math.PI / 2.5, 0] 
    },
    { 
        url: logoImage, 
        position: [0, 1, -2], 
        rotation: [0, 0, 0],
        scale: [1, 1, 1] 
    }
];
const textureLoader = new THREE.TextureLoader();
paintingsData.forEach(data => {
    textureLoader.load(data.url, (texture) => {
        const aspect = texture.image.width / texture.image.height;
        const imageHeight = (data.scale) ? data.scale[1] : 1.8;
        const imageWidth = imageHeight * aspect;
        const imageGeo = new THREE.PlaneGeometry(imageWidth, imageHeight);
        const imageMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const imageMesh = new THREE.Mesh(imageGeo, imageMat);
        const frameGeo = new THREE.BoxGeometry(imageWidth + 0.1, imageHeight + 0.1, 0.08);
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
        const frameMesh = new THREE.Mesh(frameGeo, frameMat);
        frameMesh.position.z = -0.05;
        const paintingGroup = new THREE.Group();
        paintingGroup.add(imageMesh);
        paintingGroup.add(frameMesh);
        paintingGroup.position.set(...data.position);
        paintingGroup.rotation.set(...data.rotation);
        scene.add(paintingGroup);
    });
});
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();