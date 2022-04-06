import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
let ratio = sizes.width / sizes.height

window.addEventListener('resize', (e) => {
  setTimeout(() => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    ratio = sizes.width / sizes.height
    camera.aspect = ratio
    camera.updateProjectionMatrix()
    renderer.setup(sizes)
  }, 100)
})

// cursor
const cursor = {
  x: 0,
  y: 0,
}

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5
  cursor.y = -(e.clientY / sizes.height - 0.5)
})

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 12, 12, 12),
  new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0099ee })
)
scene.add(mesh)

// Camera fov ratio near far
const camera = new THREE.PerspectiveCamera(75, ratio, 0.1, 100)
// Orthographic L R T B near far
// Fix ratio
// const camera = new THREE.OrthographicCamera(-2 * ratio, 2 * ratio, 2, -2, 0.1, 100)
// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 2
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})

renderer.setup = (sizes) => {
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}
renderer.setup(sizes)

// Animate
// const clock = new THREE.Clock()

const tick = () => {
  //   const elapsedTime = clock.getElapsedTime()

  // Update objects
  //   camera.position.x = cursor.x * 5
  //   camera.position.y = cursor.y * 5
  //
  //   camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  //   camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  //   camera.position.y = cursor.y * 5
  //   camera.lookAt(mesh.position)

  controls.update()

  // Render
  renderer.render(scene, camera)
  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
