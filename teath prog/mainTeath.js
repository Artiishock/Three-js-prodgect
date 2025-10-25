import { backdropClasses } from '@mui/material'
import { grey } from '@mui/material/colors'
import * as THREE from 'three'
import { color } from 'three/tsl'
// НУЖНО СОЗДАТЬ НАШ ЭКРАН
const screen = new THREE.Scene()
screen.background = new THREE.TextureLoader().load("assets/bg.jpg")
//НУЖНО СДЕЛАТЬ КАМЕРУ (75- УГОЛ ВИДИМОСТИ W.I-СЩЩТНОШЕНИЕ СТОРОН 0.1 МИН ВИДИМОСТЬ 100- МАКС ВИДИМОСТЬ)
const camera = new THREE.PerspectiveCamera(
    75,
     window.innerWidth / window.innerHeight,
    0.1,
    100 
) 
// ПОЗИЦИЯ КАМЕРЫ
camera.position.z = 5
//НУЖЕН РЕНДЕР СЦЕНЫ 
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
//ЗАГРУКА В ДОК
document.body.appendChild(renderer.domElement)
// СОЗДАНИЕ ФИГУР + МАТЕРИАЛОА ТЕКСТУР И ТД 
const geonetry = new THREE.BoxGeometry(2 , 2 , 2)
const textute1 = new THREE.TextureLoader().load('assets/grass.jpg') 
const textuteMaterial1 = new THREE.MeshBasicMaterial({map: textute1})
const geomSurc = new THREE.SphereGeometry(0.5, 9, 9, 9)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.2, 6, 100),
    new THREE.MeshBasicMaterial({color:"#f27500"})
)

torus.position.set(-5, 0, 0)

const shere = new THREE.MeshPhongMaterial({
    emissive: "#ff0000"
   

})

const Plain = new THREE.Mesh( 
new THREE.PlaneGeometry( 2, 2),
    textuteMaterial1
)
Plain.position.set(5,2,0)

const material = new THREE.MeshBasicMaterial({color: '#4b5edc'})




const cube = new THREE.Mesh(geonetry, material)
const cube1 = new THREE.Mesh(geonetry, textuteMaterial1)
cube.position.set(5, 0, 0)

cube1.position.set(0, 2, 0)
const surcle = new THREE.Mesh(geomSurc, shere)

// const loader = new THREE.TextureLoader();
// const texture = loader.load( 'assets/beagle.jpg' );
// texture.colorSpace = THREE.SRGBColorSpace;

// const material = new THREE.MeshBasicMaterial({
//   map: texture,
// });


// texture.colorSpace = THREE.SRGBColorSpace;
// ЗДЕСЬ КОНЕЦ   СЩЗДАНИЕ ФИГУР + МАТЕРИАЛОА ТЕКСТУР И ТД
//НУЖНО ДОБАВИТЬ ФИГУРЫ НА СЦЕНУ 
screen.add(cube ,cube1 , surcle , torus , Plain )

//ФНКЦИЯ ПОСТОЯННОГО РЕНДЕРИНГА НУЖНО ДЛЯ ОДНОВЛЕНИЯ КАРТИНКИ 
function animate(){
    requestAnimationFrame(animate)
//ПОНИМАНИЕ ЧТО ОБЬЕКТЫ 3D
    cube.rotation.x +=0.01
    cube.rotation.y +=0.01
    cube1.rotation.x +=0.01
    cube1.rotation.y +=0.01

    torus.rotation.x +=0.01
    torus.rotation.y +=0.01
    
    surcle.rotation.x +=0.01
    surcle.rotation.y +=0.01

    renderer.render(screen, camera)
}

animate()