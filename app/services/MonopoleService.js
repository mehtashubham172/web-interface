import * as THREE from "three";

export const generateMonopoleTower = (width, height) => {
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(width / 2, width / 2, height, 32),
    new THREE.MeshStandardMaterial({ color: 0x00ff00 })
  );
  mesh.position.y = 0.5 * height;
  return mesh;
};
