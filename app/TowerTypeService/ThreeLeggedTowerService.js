import * as THREE from "three";
// for 3 legged tower
//for each level , we have 3 vertices and 3 edges
// vertices is the collection of the vector and
// edges is the collection of 6 numbers which are the index of the vertices
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
export const generateThreeLeggedTower = (width, height) => {
  const baseRadius = width / 2;
  const topRadius = baseRadius - 4;
  const levels = 6;
  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const vertices = [];
  const edges = [];
  for (let i = 0; i <= levels; i++) {
    let y = (i / levels) * height;
    let radius = baseRadius - ((baseRadius - topRadius) * i) / levels;
    vertices.push(new THREE.Vector3(-radius, y, -radius));
    vertices.push(new THREE.Vector3(radius, y, -radius));
    vertices.push(new THREE.Vector3(0, y, radius));
  }
  for (let i = 0; i < levels; i++) {
    let offset = i * 3;
    edges.push(
      offset,
      offset + 3,
      offset + 1,
      offset + 4,
      offset + 2,
      offset + 5
    ); //[0,3,1,4,2,5]
    edges.push(offset, offset + 1, offset + 1, offset + 2, offset + 2, offset); //[0,1,1,2,2,0]
    edges.push(
      offset,
      offset + 4,
      offset + 1,
      offset + 5,
      offset + 2,
      offset + 3
    ); //[0,4,1,5,2,3]
    // 0,3,1,4,2,5,0,1,1,2,2,0,0,4,1,5,2,3
  }
  let topOffset = levels * 3;
  edges.push(
    topOffset,
    topOffset + 1,
    topOffset + 1,
    topOffset + 2,
    topOffset + 2,
    topOffset
  );
  console.log(edges);
  console.log(vertices);
  return createEdgeGeometry(vertices, edges, material);
};
