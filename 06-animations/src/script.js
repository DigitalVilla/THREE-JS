import './style.css'
import * as THREE from 'three'
import gs from 'gsap'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: 0x005599,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

//Animations

// Time inJS
// let time = Date.now()
// const current = Date.now()
// const deltaTime = current - time
// time = Date.now()

// Three's clock
// const clock = new THREE.Clock()

// GSAP
gs.to(mesh.position, { delay: 0.1, duration: 1, x: 2 })
gs.to(mesh.position, { delay: 3, duration: 1, x: 0 })

const tick = () => {
  // const elapsedTime = clock.getElapsedTime()
  //   mesh.rotation.x = elapsedTime
  // camera.position.x = Math.cos(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)
  // mesh.rotation.y = elapsedTime
  // mesh.rotation.z = (elapsedTime * Math.PI) / 2

  //
  camera.lookAt(mesh.position)
  renderer.render(scene, camera)

  // get next tick
  window.requestAnimationFrame(tick)
}

tick()
