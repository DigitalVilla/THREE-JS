import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
const al = gui.addFolder('Ambient Light')
al.add(ambientLight, 'intensity').max(1).min(0).step(0.1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x0ffffc, 0.3)
directionalLight.position.set(-1.5, 2, 1)
directionalLight.target.position.x = 3
directionalLight.target.position.z = -3

directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 1024
directionalLight.shadow.mapSize.height = 1024
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 7
directionalLight.shadow.camera.top = 0.5
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2.3
directionalLight.shadow.camera.left = -2
directionalLight.shadow.radius = 4

// directionalLight.shadow.mapSize.height = 1024

const directionalLightShadowCamera = new THREE.CameraHelper(directionalLight.shadow.camera)
directionalLightShadowCamera.visible = false
scene.add(directionalLightShadowCamera)

const dl = gui.addFolder('Directional Light')
dl.add(directionalLight, 'intensity').max(1).min(0).step(0.1)
dl.addColor(directionalLight, 'color')
dl.add(directionalLight.position, 'x')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => directionalLightHelper.update())
dl.add(directionalLight.position, 'y')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => directionalLightHelper.update())
dl.add(directionalLight.position, 'z')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => directionalLightHelper.update())

const dlt = gui.addFolder('Directional Light Target')
dlt
  .add(directionalLight.target.position, 'x')
  .max(20)
  .min(-20)
  .step(0.1)
  .onChange(() => directionalLightHelper.update())
dlt
  .add(directionalLight.target.position, 'y')
  .max(20)
  .min(-20)
  .step(0.1)
  .onChange(() => directionalLightHelper.update())
dlt
  .add(directionalLight.target.position, 'z')
  .max(20)
  .min(-20)
  .step(0.1)
  .onChange(() => directionalLightHelper.update())

scene.add(directionalLight, directionalLight.target)

const hemisphereLight = new THREE.HemisphereLight(0xaafff9, 0xffe1a6, 0.3)
const hl = gui.addFolder('Hemisphere Light')
hl.add(hemisphereLight, 'intensity').max(1).min(0).step(0.1)
hl.addColor(hemisphereLight, 'color')
hl.addColor(hemisphereLight, 'groundColor')
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 0.5)
const pl = gui.addFolder('Point Light')
pl.add(pointLight, 'intensity').max(1).min(0).step(0.1)
pl.add(pointLight, 'decay').max(10).min(0).step(0.1)
pl.addColor(pointLight, 'color')
pl.add(pointLight.position, 'x').max(10).min(-10).step(0.1)
pl.add(pointLight.position, 'y').max(10).min(-10).step(0.1)
pl.add(pointLight.position, 'z').max(10).min(-10).step(0.1)
pl.add(pointLight, 'visible')
pointLight.visible = false

scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 0.5, 2, 2)
const rl = gui.addFolder('Rect Area Light')
rl.add(rectAreaLight, 'intensity').max(10).min(0).step(0.1)
rl.add(rectAreaLight, 'width').max(10).min(0).step(0.1)
rl.add(rectAreaLight, 'height').max(10).min(0).step(0.1)
rl.addColor(rectAreaLight, 'color')
rl.add(rectAreaLight.position, 'x').max(10).min(-10).step(0.1)
rl.add(rectAreaLight.position, 'y').max(10).min(-10).step(0.1)
rl.add(rectAreaLight.position, 'z').max(10).min(-10).step(0.1)
rl.add(rectAreaLight, 'visible')
rectAreaLight.visible = false
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
const sl = gui.addFolder('Spot Light')
spotLight.castShadow = true
spotLight.visible = false
sl.add(spotLight, 'visible')
sl.add(spotLight, 'intensity').max(10).min(0).step(0.1)
sl.add(spotLight, 'penumbra')
  .max(1)
  .min(0)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
sl.add(spotLight, 'distance')
  .max(20)
  .min(0)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
sl.add(spotLight, 'angle')
  .max(2)
  .min(0)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
sl.addColor(spotLight, 'color')
sl.add(spotLight.position, 'x')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
sl.add(spotLight.position, 'y')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
sl.add(spotLight.position, 'z')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
scene.add(spotLight)
const slt = gui.addFolder('Spot Light Target')
spotLight.target.position.x = 1
slt
  .add(spotLight.target.position, 'x')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
slt
  .add(spotLight.target.position, 'y')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => spotLightHelper.update())
slt
  .add(spotLight.target.position, 'z')
  .max(10)
  .min(-10)
  .step(0.1)
  .onChange(() => spotLightHelper.update())

scene.add(spotLight.target)

const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)
window.requestAnimationFrame(() => directionalLightHelper.update())

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)
spotLightHelper.visible = false
window.requestAnimationFrame(() => spotLightHelper.update())

// Best perf ambient and Hemisphere
// Medium Directional and Point
// Low Spot and Rect

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.x = -1.5
sphere.castShadow = true
const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)
cube.castShadow = true

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
torus.castShadow = true
torus.position.x = 1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), material)
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.65
plane.receiveShadow = true

scene.add(sphere, cube, torus, plane)

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
