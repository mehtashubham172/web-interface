import * as THREE from "three";

export function generateSectorMount(width, height) {
  const group = new THREE.Group();
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const topFaceGeometry = generateMountFace(halfWidth, halfHeight);
  group.add(topFaceGeometry);
  const bottomFaceGeometry = generateMountFace(halfWidth, -halfHeight);
  group.add(bottomFaceGeometry);

  const cornerEdges = connectCornerPoints(halfWidth, height);
  group.add(cornerEdges);
  const faceEdges = connectFacePoints(halfWidth, height);
  group.add(faceEdges);

  return group;
}
function generateMountFace(width, elevation) {
  const sideLength = (3 / 4) * width;

  // Triangle vertices centered at (0,0,0)
  const vertices = new Float32Array([
    -sideLength,
    0,
    -sideLength / 2, // Left base (1)
    sideLength,
    0,
    -sideLength / 2, // Right base (2)
    0,
    0,
    sideLength / 2, // Top vertex (3)
  ]);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  const edges = new Uint16Array([
    0,
    1, // Base edge
    1,
    2, // Right edge
    2,
    0, // Left edge
  ]);

  geometry.setIndex(new THREE.BufferAttribute(edges, 1));
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const triangleEdges = new THREE.LineSegments(geometry, lineMaterial);
  triangleEdges.position.y = elevation;
  return triangleEdges;
}

function connectCornerPoints(width, height) {
  const halfHeight = height / 2;
  const sideLength = (3 / 4) * width;
  const vertices = new Float32Array([
    // Top face
    -sideLength,
    halfHeight,
    -sideLength / 2,
    sideLength,
    halfHeight,
    -sideLength / 2,
    0,
    halfHeight,
    sideLength / 2,

    // Bottom face
    -sideLength,
    -halfHeight,
    -sideLength / 2,
    sideLength,
    -halfHeight,
    -sideLength / 2,
    0,
    -halfHeight,
    sideLength / 2,
  ]);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  const edges = new Uint16Array([
    0,
    3, // Left base
    1,
    4, // Right base
    2,
    5, // Top vertex
  ]);

  geometry.setIndex(new THREE.BufferAttribute(edges, 1));
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

  return new THREE.LineSegments(geometry, lineMaterial);
}
function connectFacePoints(width, height) {
  const halfHeight = height / 2;
  const sideLength = (3 / 4) * width;
  const faceLineLength = (1 / 4) * width;
  const vertices = new Float32Array([
    -sideLength,
    halfHeight,
    -sideLength / 2,
    -(sideLength + faceLineLength),
    halfHeight,
    -sideLength / 2,
    sideLength,
    halfHeight,
    -sideLength / 2,
    sideLength + faceLineLength,
    halfHeight,
    -sideLength / 2,
    -sideLength,
    -halfHeight,
    -sideLength / 2,
    -(sideLength + faceLineLength),
    -halfHeight,
    -sideLength / 2,
    sideLength,
    -halfHeight,
    -sideLength / 2,
    sideLength + faceLineLength,
    -halfHeight,
    -sideLength / 2,
  ]);

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  const edges = new Uint16Array([
    0,
    1, // Left (top face)
    2,
    3, // Right (top face)
    4,
    5, // Left (bottom face)
    6,
    7, // Right (bottom face)
  ]);

  geometry.setIndex(new THREE.BufferAttribute(edges, 1));
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

  return new THREE.LineSegments(geometry, lineMaterial);
}
