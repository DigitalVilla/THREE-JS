import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
  materialColor: '#ffeded',
  wireframe: false,
}

gui.addColor(parameters, 'materialColor').onChange((c) => material.color.set(c))
gui.add(parameters, 'wireframe').onChange((w) => (material.wireframe = w))
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter

// Material
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
  wireframe: parameters.wireframe,
})

// Meshes
const objectsDistance = 4
const objectsPlacement = 1.5

const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.3, 20, 60), material)
const mesh2 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2, 12, 12, 12), material)
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.3, 70, 30), material)
const mesh4 = new THREE.Mesh(new THREE.ConeGeometry(0.8, 1.6, 4, 12), material)
const meshes = [mesh1, mesh2, mesh3, mesh4]

meshes.forEach((el, i) => {
  el.position.y = -objectsDistance * i
  el.position.x = i % 2 !== 0 ? -objectsPlacement : objectsPlacement
})

mesh4.position.y -= 0.5
scene.add(...meshes)

// Particles
const particleCount = 300
const positions = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount; i++) {
  positions[i * 3 + 0] = (Math.random() - 0.5) * 10
  positions[i * 3 + 1] = objectsDistance * 0.5 - Math.random() * objectsDistance * meshes.length
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10
}

const particlesGeometry = new THREE.BufferGeometry()
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.materialColor,
  sizeAttenuation: true,
  size: 0.01,
})

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Scroll
 */
let scrollY = document.body.scrollTop
let currentSection = 0
document.body.addEventListener('scroll', (e) => {
  scrollY = e.target.scrollTop
  const newSection = Math.round(scrollY / sizes.height)

  if (newSection != currentSection) {
    currentSection = newSection

    gsap.to(meshes[currentSection].rotation, {
      duration: 2,
      ease: 'power2.inOut',
      x: '+=4',
      y: '+=2',
    })
  }
})

/**
 * Cursor
 */
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Camera
 */
// Base camera

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.position.set(1, 1, 0)
scene.add(directionalLight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
  const elapsedTime = clock.getElapsedTime()
  const deltaTime = elapsedTime - previousTime
  previousTime = elapsedTime

  // Animate camera
  camera.position.y = (-scrollY / sizes.height) * objectsDistance

  const parallaxX = cursor.x * 0.2
  const parallaxY = -cursor.y * 0.2

  particles.rotation.y -= deltaTime * 0.03

  cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 5 * deltaTime
  cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 5 * deltaTime

  meshes.forEach((el) => {
    el.rotation.x += deltaTime * 0.1
    el.rotation.y += deltaTime * 0.12
  })

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
