import { Points } from 'https://cdn.skypack.dev/three@0.136.2';

function convertMeshToPoints(mesh, material) {
  const points = new Points(mesh.geometry, material);

  return points;
}

export { convertMeshToPoints };
