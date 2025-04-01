import * as THREE from "three";

export function TriangleScene() {
  // Triangle vertices centered at (0,0,0)
  const vertices = new Float32Array([
    -1.75,
    0,
    0, // Left base (1)
    1.75,
    0,
    0, // Right base (2)
    0,
    0,
    2.65, // Top vertex (3)
  ]);

  // Create geometry and set positions
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  // Define edges
  const edges = new Uint16Array([
    0,
    1, // Base edge
    1,
    2, // Right edge
    2,
    0, // Left edge
  ]);

  geometry.setIndex(new THREE.BufferAttribute(edges, 1));

  // Create Line Material (White)
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

  // Create Triangle Edges
  const triangleEdges = new THREE.LineSegments(geometry, lineMaterial);

  // Move Triangle to y = 2
  triangleEdges.position.y = 2;

  return triangleEdges;
}
