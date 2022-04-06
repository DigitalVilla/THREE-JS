import * as THREE from 'three'
import './style.css'

// Sizes
const sizes = {
  width: 800,
  height: 600,
}

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x0077aa })
const mesh = new THREE.Mesh(geometry, material)

const c1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x9933aa })
)
const c2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x3344aa })
)
const c3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0077aa })
)

scene.add(mesh)

c3.position.set(1, 0, 0)
c2.position.set(2, 0, 0)

// Move group
const group = new THREE.Group()
group.add(c1)
group.add(c2)
group.add(c3)
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1
mesh.position.set(0.7, -0.6, 1)
// mesh.position.normalize() // reduce the length of the vector to 1 unit but preserve its direction):
// console.log(mesh.position.length())

// SCALE
// mesh.scale.x = 2
// mesh.scale.y = 1
// mesh.scale.z = 1
mesh.scale.set(1, 1, 2)

// Rotation
// mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.5
mesh.rotation.y = Math.PI * 0.1
// mesh.rotation.z = Math.PI * 0.25

// Axes Helper
const axes = new THREE.AxesHelper()
scene.add(axes)

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 1
// camera.position.y = 1
// camera.position.z = 4
camera.position.set(1, 1, 5)
scene.add(camera)

camera.lookAt(mesh.position)

console.log(mesh.position.distanceTo(camera.position))

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('canvas.webgl'),
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
