export const lineEquation = (
  topWidth,
  bottomWidth,
  topElevation,
  bottomElevation,
  currentElevation
) => {
  try {
    if (topWidth == bottomWidth) return topWidth;
    const x1 = 0;
    const y1 = 0;
    const x2 = bottomWidth - topWidth;
    const y2 = topElevation - bottomElevation;

    // Solve line equation: y = m * x + c
    const m = (y2 - y1) / (x2 - x1); // slope
    const c = y1 - m * x1; // intercept

    // Calculate new width
    const newWidth = bottomWidth - (currentElevation - bottomElevation - c) / m;

    return newWidth;
  } catch (error) {
    console.error("Error in lineEquation function:", error);
    return topWidth; // Return the original topWidth in case of an error
  }
};

export const roundOffValue = (num) => {
  if (isNaN(num)) {
    console.error("Invalid number:", num);
    return null; // or return a default value
  }
  return Math.round(num * 100) / 100;
};

export const generateCoordinates = (
  nodeIndex,
  angle,
  radius,
  elevation,
  temp_id = null,
  bearingAngle = 0
) => {
  if (nodeIndex === undefined || nodeIndex === null) {
    console.error("nodeIndex is undefined or null");
    return null;
  }
  try {
    console.log("radius:", radius);

    angle = angle + bearingAngle;
    const theta = (angle * Math.PI) / 180;

    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    const x = roundOffValue(radius * sinTheta);
    const y = roundOffValue(elevation);
    const z = -1 * roundOffValue(radius * cosTheta);

    let nodeObj = {};

    if (nodeIndex !== "None" && nodeIndex !== null && nodeIndex !== undefined) {
      nodeObj.id = nodeIndex;
    }

    nodeObj.x = x;
    nodeObj.y = y;
    nodeObj.z = z;

    if (temp_id !== null && temp_id !== undefined) {
      nodeObj.temp_id = temp_id;
    }

    return nodeObj;
  } catch (error) {
    console.error("Error in generateCoordinates:", error);
    return null;
  }
};
