import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.2/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;

  controls.target.y = 3;

  // forward controls.update to our custom .tick method
  controls.tick = (delta) => controls.update(delta);

  return controls;
}

export { createControls };
