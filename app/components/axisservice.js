import * as THREE from "three";

export const generateAxes = () => {
  const axesGroup = new THREE.Group();
  const createAxis = (color, length, step, axis) => {
    const material = new THREE.LineBasicMaterial({ color });
    const points = [];
    for (let i = 0; i <= length; i += step) {
      points.push(
        new THREE.Vector3(
          axis === "x" ? i : 0,
          axis === "y" ? i : 0,
          axis === "z" ? i : 0
        )
      );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, material);
  };

  // X-Axis (Red)
  const xAxis = createAxis(0xff0000, 20, 1, "x");
  axesGroup.add(xAxis);

  // Y-Axis (Green)
  const yAxis = createAxis(0x00ff00, 20, 1, "y");
  axesGroup.add(yAxis);

  // Z-Axis (Blue)
  const zAxis = createAxis(0x0000ff, 20, 1, "z");
  axesGroup.add(zAxis);

  return axesGroup;
};
