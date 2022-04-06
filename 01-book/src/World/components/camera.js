import { PerspectiveCamera } from 'https://cdn.skypack.dev/three@0.136.2';

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);

  camera.position.set(7, 2, 10);

  return camera;
}

export { createCamera };
