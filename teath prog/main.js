import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';


// Сцена, камера, рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Загрузчик для текстур
const textureLoader = new THREE.TextureLoader();

// Загружаем ваш собственный фон
// ЗАМЕНИТЕ ЭТУ ССЫЛКУ НА ПУТЬ К ВАШЕМУ ИЗОБРАЖЕНИЮ
const backgroundTexture = textureLoader.load('assets/bg.jpg');
scene.background = backgroundTexture;

// Создаем окружение для отражений из того же изображения
const envMap = backgroundTexture;
envMap.mapping = THREE.EquirectangularReflectionMapping;

// Освещение
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(5, 5, 5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight2.position.set(-5, 3, -5);
scene.add(directionalLight2);

// Точечный свет для дополнительных отражений
const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Создаем куб со скругленными углами
const geometry = new RoundedBoxGeometry(2, 2, 2, 16, 0.2);

// Глянцевый материал с отражениями вашего фона
const material = new THREE.MeshPhysicalMaterial({
  color: "#000000",
  metalness: 0.8,
  roughness: 0.1,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  envMap: envMap,
  envMapIntensity: 0.8
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Параметры для отслеживания мыши
const mouse = new THREE.Vector2();
const targetRotation = { x: 0, y: 0 };

// Обработчик движения мыши
document.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Функция обновления вращения
function updateRotation() {
  targetRotation.x = THREE.MathUtils.lerp(targetRotation.x, mouse.y * -0.5, 0.1);
  targetRotation.y = THREE.MathUtils.lerp(targetRotation.y, mouse.x * 0.5, 0.1);
  cube.rotation.x = targetRotation.x;
  cube.rotation.y = targetRotation.y;
}

// Позиционируем камеру
camera.position.z = 5;

// Анимация
function animate() {
  requestAnimationFrame(animate);
  updateRotation();
  renderer.render(scene, camera);
}

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();