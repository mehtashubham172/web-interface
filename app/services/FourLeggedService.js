import * as THREE from "three";
// for 4 legged tower
//for each level , we have 4 vertices and 4 edges
// vertices is the collection of the vector and
// edges is the collection of 8 numbers which are the index of the vertices
const createEdgeGeometry = (vertices, edges, material) => {
  const geometry = new THREE.BufferGeometry();
  const verticesArray = new Float32Array(
    edges.flatMap((index) => vertices[index].toArray())
  );
  console.log(verticesArray);
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(verticesArray, 3)
  );
  return new THREE.LineSegments(geometry, material);
};
export const generateFourLeggedTower = (width, height) => {
  const baseSize = width / 2;
  const topSize = baseSize - 4;
  console.log("baseSize", baseSize);
  console.log("topSize", topSize);
  const levels = 6;
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const vertices = [];
  const edges = [];
  for (let i = 0; i <= levels; i++) {
    let y = (i / levels) * height;
    let size = baseSize - ((baseSize - topSize) * i) / levels;
    vertices.push(new THREE.Vector3(-size, y, -size));
    vertices.push(new THREE.Vector3(size, y, -size));
    vertices.push(new THREE.Vector3(size, y, size));
    vertices.push(new THREE.Vector3(-size, y, size));
  }
  for (let i = 0; i < levels; i++) {
    let offset = i * 4;
    edges.push(
      offset,
      offset + 4,
      offset + 1,
      offset + 5,
      offset + 2,
      offset + 6,
      offset + 3,
      offset + 7
    );
    edges.push(
      offset,
      offset + 1,
      offset + 1,
      offset + 2,
      offset + 2,
      offset + 3,
      offset + 3,
      offset
    );
    edges.push(
      offset,
      offset + 5,
      offset + 1,
      offset + 6,
      offset + 2,
      offset + 7,
      offset + 3,
      offset + 4
    );
  }
  let topOffset = levels * 4;
  edges.push(
    topOffset,
    topOffset + 1,
    topOffset + 1,
    topOffset + 2,
    topOffset + 2,
    topOffset + 3,
    topOffset + 3,
    topOffset
  );

  return createEdgeGeometry(vertices, edges, material);
};
