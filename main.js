import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById ('canvas');
//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#000000');

//Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z=5;

//Object
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshLambertMaterial({ Color: '#468585', emissive: '#468585'});
const dodecahedron = new THREE.Mesh(geometry,material);

const boxGeometry = new THREE.BoxGeometry(2,0.1,2);
const boxmaterial = new THREE.MeshStandardMaterial({ Color: '#B4B4B3', emissive: '#B4B4B3' });
const box = new THREE.Mesh(boxGeometry, boxmaterial);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

//Lights
const light = new THREE.SpotLight(0x006769, 100);
light.position.set(1,1,1);
scene.add(light);

//Renderer
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

//Add orbit Control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; //makes smoother 
controls.dampingFactor = 0.05;
controls.enableZoom = true; // to zoom in and out
controls.enablePan = true; // to pan the screen 

//Adding Animations 
function animate(){
  requestAnimationFrame(animate);
  
  dodecahedron.rotation.x += 0.01;
  dodecahedron.rotation.y += 0.01;
  
  box.rotation.y += 0.05;
  
  controls.update();
  
  renderer.render(scene,camera);
} 

//Handle Window resizing
window.addEventListener('resize', listener => {
  camera.aspect= window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
})

animate();





