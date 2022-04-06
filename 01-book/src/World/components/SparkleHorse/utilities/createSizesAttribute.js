import { Float32BufferAttribute } from 'https://cdn.skypack.dev/three@0.136.2';

function createSizesAttribute(geometry) {
  const positions = geometry.attributes.position;
  const count = positions.count;
  const sizes = [];
  for (let i = 0; i < count; i++) {
    sizes.push(1);
  }
  const sizeAttribute = new Float32BufferAttribute(sizes, 1);
  return sizeAttribute;
}

export { createSizesAttribute };
