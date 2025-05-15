import { generateCoordinates, lineEquation, roundOffValue } from "./utils";
import * as THREE from "three";

export function generatePlatformNodes(mountDetails) {
  const mountPointOnTowerByFaces = generateMountNodesPlatform(mountDetails);
  const faceData = generatePlatformFaceData(
    mountPointOnTowerByFaces,
    mountDetails
  );
  if (faceData !== null) {
    if (mountDetails.noOfLegs === 3) {
      return generate3PlatformMembersData(faceData, mountPointOnTowerByFaces);
    } else {
      /* generate4PlatformMembersData(
        mountsNodesNode,
        attachmentsInnerNode,
        faceData,
        mountPointOnTowerByFaces
      );*/
    }
  }
}
function generateMountNodesPlatform(mountDetails) {
  const mountPointOnTowerByFaces = [];
  let startFace = "A";
  for (let i = 0; i < parseInt(mountDetails.noOfLegs); i++) {
    mountDetails["Face Or Leg"] = startFace;
    const mountNodesResult = generateMountNodesonTower(mountDetails); // must exist
    console.log("MountNodesResult:", mountNodesResult);
    const mountPointOnTower = mountNodesResult.current_point;
    const radiusCenter = mountNodesResult.radiusCenter;
    mountPointOnTowerByFaces.push({
      Face: startFace,
      MountPointOnTower: mountPointOnTower,
      RadiusCenter: radiusCenter,
    });
    startFace = String.fromCharCode(startFace.charCodeAt(0) + 1);
  }

  return mountPointOnTowerByFaces;
}
function generateMountNodesonTower(mountDetails) {
  try {
    let currentPoint = [];
    const mountElevation = mountDetails.elevation;
    const mountHeight = mountDetails.height;

    const radiusCenter = findRadius(mountElevation, mountHeight);
    let legAAngle, legBAngle, legCAngle, legDAngle;

    if (parseInt(mountDetails.noOfLegs) !== 4) {
      legAAngle = 0;
      legBAngle = 120;
      legCAngle = 240;
    } else {
      legAAngle = 0;
      legBAngle = 90;
      legCAngle = 180;
      legDAngle = 270;
    }

    if (radiusCenter === "") {
      return { current_point: "", radiusCenter: "" };
    }

    let vertex1, vertex2;
    if (parseInt(mountDetails.noOfLegss) !== 4) {
      if (mountDetails["Face Or Leg"] === "B") {
        vertex1 = generateCoordinates(
          1,
          legBAngle,
          radiusCenter,
          mountElevation
        );
        vertex2 = generateCoordinates(
          1,
          legCAngle,
          radiusCenter,
          mountElevation
        );
      } else if (mountDetails["Face Or Leg"] === "C") {
        vertex1 = generateCoordinates(
          1,
          legCAngle,
          radiusCenter,
          mountElevation
        );
        vertex2 = generateCoordinates(
          1,
          legAAngle,
          radiusCenter,
          mountElevation
        );
      } else if (mountDetails["Face Or Leg"] === "A") {
        vertex1 = generateCoordinates(
          1,
          legAAngle,
          radiusCenter,
          mountElevation
        );
        vertex2 = generateCoordinates(
          1,
          legBAngle,
          radiusCenter,
          mountElevation
        );
      }
    } else {
      if (mountDetails["Face Or Leg"] === "B") {
        vertex1 = generateCoordinates(
          1,
          legBAngle,
          radiusCenter,
          mountElevation
        );
        vertex2 = generateCoordinates(
          1,
          legCAngle,
          radiusCenter,
          mountElevation
        );
      } else if (mountDetails["Face Or Leg"] === "C") {
        vertex1 = generateCoordinates(
          1,
          legCAngle,
          radiusCenter,
          mountElevation
        );
        vertex2 = generateCoordinates(
          1,
          legDAngle,
          radiusCenter,
          mountElevation
        );
      } else if (mountDetails["Face Or Leg"] === "D") {
        vertex1 = generateCoordinates(
          1,
          legDAngle,
          radiusCenter,
          mountElevation
        );
        vertex2 = generateCoordinates(
          1,
          legAAngle,
          radiusCenter,
          mountElevation
        );
      } else if (mountDetails["Face Or Leg"] === "A") {
        vertex1 = generateCoordinates(
          1,
          legAAngle,
          radiusCenter,
          mountElevation
        );
        vertex2 = generateCoordinates(
          1,
          legBAngle,
          radiusCenter,
          mountElevation
        );
      }
    }
    // Convert vertex1 to a Vector3 (used as both midpoint and direction vector)
    const midpoint = new THREE.Vector3(vertex1.x, vertex1.y, vertex1.z);
    const directionVector = new THREE.Vector3(vertex1.x, vertex1.y, vertex1.z);

    // Normalize the direction vector
    const normalizedVector = directionVector.clone().normalize();

    // Get vertical offset
    const offsets = mountDetails["Offsets"];
    const VerticalOffset = offsets["vertical"];
    const VerticalOffsetValue = VerticalOffset === 0 ? 0 : VerticalOffset;

    // Multiply normalizedVector by [0, VerticalOffsetValue, 0]
    const offsetVector = new THREE.Vector3(0, VerticalOffsetValue, 0);
    const scaledVector = new THREE.Vector3(
      normalizedVector.x * offsetVector.x,
      normalizedVector.y * offsetVector.y,
      normalizedVector.z * offsetVector.z
    );

    // Final point = midpoint + scaled vector
    currentPoint = midpoint.clone().add(scaledVector);

    return { current_point: currentPoint, radiusCenter: radiusCenter };
  } catch (e) {
    const py_error = e.stack || e.toString();
    return { current_point: "", radiusCenter: "" };
  }
}
function findRadius(mountElevation, towerWidth, numOfFaces = 3) {
  const panelWidthAtMountElevation = lineEquation(
    towerWidth,
    towerWidth,
    mountElevation + 5,
    mountElevation - 5,
    mountElevation
  );

  let radiusCenter;
  if (parseInt(numOfFaces) !== 4) {
    radiusCenter = roundOffValue(panelWidthAtMountElevation / Math.sqrt(3));
  } else {
    radiusCenter = roundOffValue(panelWidthAtMountElevation / Math.sqrt(2));
  }

  return radiusCenter;
}
function generatePlatformFaceData(mountPointOnTower, mountData) {
  try {
    const faceData = [];

    for (const mountPoint of mountPointOnTower) {
      let radiusTop;
      if (parseInt(mountData.noOfLegs) === 3) {
        radiusTop = mountData.width / Math.sqrt(3);
      } else {
        radiusTop = mountData.width / Math.sqrt(2);
      }

      mountData.mountFace = mountPoint["Face"];
      const result = getMountFaceLine(
        mountPoint["MountPointOnTower"],
        mountData,
        radiusTop
      );
      console.log("MountFaceLineResult:", result);
      if (!result.hasOwnProperty("status")) {
        const { mountFacePoints, mountFaceMidPoint } = result;
        faceData.push({
          Face: mountPoint["Face"],
          MountData: mountData,
          MountFacePoints: mountFacePoints,
          MountFaceMidPoint: mountFaceMidPoint,
        });
      }
    }

    return faceData;
  } catch (e) {
    const py_error = e.stack || e.toString();
    return null;
  }
}
function getMountFaceLine(mountPointOnTower, mountData, radiusTop) {
  try {
    const newRadius = mountData.standoff + radiusTop;

    let legAAngle = 0,
      legBAngle,
      legCAngle,
      legDAngle;
    if (parseInt(mountData.noOfLegs) !== 4) {
      legBAngle = 120;
      legCAngle = 240;
    } else {
      legBAngle = 90;
      legCAngle = 180;
      legDAngle = 270;
    }

    let vertex1;
    switch (mountData.mountFace) {
      case "B":
        vertex1 = generateCoordinates(
          1,
          legBAngle,
          newRadius,
          mountData.elevation
        );
        break;
      case "C":
        vertex1 = generateCoordinates(
          1,
          legCAngle,
          newRadius,
          mountData.elevation
        );
        break;
      case "D":
        vertex1 = generateCoordinates(
          1,
          legDAngle,
          newRadius,
          mountData.elevation
        );
        break;
      case "A":
        vertex1 = generateCoordinates(
          1,
          legAAngle,
          newRadius,
          mountData.elevation
        );
        break;
      default:
        throw new Error("Invalid mount face");
    }
    const locationVector = new THREE.Vector3(vertex1.x, vertex1.y, vertex1.z);
    const directionVector = locationVector.clone().sub(mountPointOnTower);
    // Calculate magnitude
    const normalisedVector = directionVector.clone().normalize();

    // Midpoint
    const mountFaceMidPoint = locationVector.clone();

    // Cross product with up vector [0, 1, 0]
    const crossVector = new THREE.Vector3(0, 1, 0).cross(normalisedVector);

    const offset = crossVector.clone().multiplyScalar(mountData.width * 0.5);

    // Mount face points
    const mountFacePoint1 = mountFaceMidPoint.clone().sub(offset);
    const mountFacePoint2 = mountFaceMidPoint.clone().add(offset);

    // Calculate mount face points
    const mountFacePoints = [mountFacePoint1, mountFacePoint2];

    return {
      mountFacePoints: mountFacePoints,
      mountFaceMidPoint: mountFaceMidPoint,
    };
  } catch (e) {
    const py_error = e.stack || e.toString();
  }
}
function generate3PlatformMembersData(faceData, mountPointOnTowerByFaces) {
  try {
    const memberNodes = [];
    const mountMembers = [];
    let nodeIndex = 1;
    let mountMemberIndex = 1;
    const mountData = faceData[0].MountData;
    const faceNodeIds = { A: null, B: null, C: null };
    const faceVertices = { A: null, B: null, C: null };

    for (let index = 0; index < faceData.length; index++) {
      let topNode1 = null;
      let bottomNode1 = null;
      let topNode2 = null;
      let bottomNode2 = null;
      const mountPointOnTower =
        mountPointOnTowerByFaces[index].MountPointOnTower;
      const mountElevationTop = mountPointOnTower.y + mountData.height / 2;
      const radiusTop = mountData.width / Math.sqrt(3);
      let vertexTop1,
        vertexTop2,
        vertexBottom1,
        vertexBottom2,
        vertexBottomCenter;

      if (mountPointOnTowerByFaces[index].Face === "B") {
        vertexTop1 = faceVertices["A"].top2;
        vertexTop2 = generateCoordinates(
          1,
          120,
          radiusTop + mountData.standoff,
          mountElevationTop
        );
      } else if (mountPointOnTowerByFaces[index].Face === "C") {
        vertexTop1 = faceVertices["B"].top2;
        vertexTop2 = faceVertices["A"].top1;
      } else if (mountPointOnTowerByFaces[index].Face === "A") {
        vertexTop1 = generateCoordinates(
          1,
          240,
          radiusTop + mountData.standoff,
          mountElevationTop
        );
        vertexTop2 = generateCoordinates(
          1,
          0,
          radiusTop + mountData.standoff,
          mountElevationTop
        );
      }

      const mountElevationBottom = mountPointOnTower.y - mountData.height / 2;
      const radiusBottom = mountData.width / Math.sqrt(3);
      const radiusCenterBottom = findRadius(
        mountElevationBottom,
        mountData.height
      );

      if (mountPointOnTowerByFaces[index].Face === "B") {
        vertexBottom1 = faceVertices["A"].bottom2;
        vertexBottom2 = generateCoordinates(
          1,
          120,
          radiusBottom + mountData.standoff,
          mountElevationBottom
        );
        vertexBottomCenter = generateCoordinates(
          1,
          120,
          radiusCenterBottom,
          mountElevationBottom
        );
      } else if (mountPointOnTowerByFaces[index].Face === "C") {
        vertexBottom1 = faceVertices["B"].bottom2;
        vertexBottom2 = faceVertices["A"].bottom1;
        vertexBottomCenter = generateCoordinates(
          1,
          240,
          radiusCenterBottom,
          mountElevationBottom
        );
      } else if (mountPointOnTowerByFaces[index].Face === "A") {
        vertexBottom1 = generateCoordinates(
          1,
          240,
          radiusBottom + mountData.standoff,
          mountElevationBottom
        );
        vertexBottom2 = generateCoordinates(
          1,
          0,
          radiusBottom + mountData.standoff,
          mountElevationBottom
        );
        vertexBottomCenter = generateCoordinates(
          1,
          0,
          radiusCenterBottom,
          mountElevationBottom
        );
      }

      const bottomCenterPoint = [
        vertexBottomCenter.x,
        vertexBottomCenter.y,
        vertexBottomCenter.z,
      ];
      const topFaceMemberPoint1 = [vertexTop1.x, vertexTop1.y, vertexTop1.z];
      const topFaceMemberPoint2 = [vertexTop2.x, vertexTop2.y, vertexTop2.z];
      const bottomFaceMemberPoint1 = [
        vertexBottom1.x,
        vertexBottom1.y,
        vertexBottom1.z,
      ];
      const bottomFaceMemberPoint2 = [
        vertexBottom2.x,
        vertexBottom2.y,
        vertexBottom2.z,
      ];

      if (mountPointOnTowerByFaces[index].Face === "A") {
        topNode1 = {
          ID: String(nodeIndex),
          X: topFaceMemberPoint1[0],
          Y: topFaceMemberPoint1[1],
          Z: topFaceMemberPoint1[2],
        };
        nodeIndex += 1;
        bottomNode1 = {
          ID: String(nodeIndex),
          X: bottomFaceMemberPoint1[0],
          Y: bottomFaceMemberPoint1[1],
          Z: bottomFaceMemberPoint1[2],
        };
        nodeIndex += 1;
        memberNodes.push(topNode1);
        memberNodes.push(bottomNode1);
        mountMembers.push({
          ID: String(mountMemberIndex),
          StartNodeID: topNode1.ID,
          EndNodeID: bottomNode1.ID,
        });
        mountMemberIndex += 1;
      }
      if (mountPointOnTowerByFaces[index].Face === "B") {
        topNode1 = faceNodeIds["A"]["top2"];
        bottomNode1 = faceNodeIds["A"]["bottom2"];
      }

      if (mountPointOnTowerByFaces[index]["Face"] == "C") {
        topNode1 = faceNodeIds["B"]["top2"];
        bottomNode1 = faceNodeIds["B"]["bottom2"];
        topNode2 = faceNodeIds["A"]["top1"];
        bottomNode2 = faceNodeIds["A"]["bottom1"];
      }
      if (mountPointOnTowerByFaces[index].Face !== "C") {
        topNode2 = {
          ID: String(nodeIndex),
          X: topFaceMemberPoint2[0],
          Y: topFaceMemberPoint2[1],
          Z: topFaceMemberPoint2[2],
        };
        nodeIndex += 1;
        memberNodes.push(topNode2);

        bottomNode2 = {
          ID: String(nodeIndex),
          X: bottomFaceMemberPoint2[0],
          Y: bottomFaceMemberPoint2[1],
          Z: bottomFaceMemberPoint2[2],
        };
        nodeIndex += 1;
        memberNodes.push(bottomNode2);
        mountMembers.push({
          ID: String(mountMemberIndex),
          StartNodeID: topNode2.ID,
          EndNodeID: bottomNode2.ID,
        });
        mountMemberIndex += 1;
      }
      const bottomCenterNode = {
        ID: String(nodeIndex),
        X: bottomCenterPoint[0],
        Y: bottomCenterPoint[1],
        Z: bottomCenterPoint[2],
      };
      nodeIndex += 1;
      memberNodes.push(bottomCenterNode);

      mountMembers.push({
        ID: String(mountMemberIndex),
        StartNodeID: topNode1.ID,
        EndNodeID: topNode2.ID,
      });
      mountMemberIndex += 1;

      mountMembers.push({
        ID: String(mountMemberIndex),
        StartNodeID: bottomNode1.ID,
        EndNodeID: bottomNode2.ID,
      });
      mountMemberIndex += 1;

      mountMembers.push({
        ID: String(mountMemberIndex),
        StartNodeID: bottomNode2.ID,
        EndNodeID: bottomCenterNode.ID,
      });
      mountMemberIndex += 1;

      faceVertices[mountPointOnTowerByFaces[index].Face] = {
        top1: vertexTop1,
        top2: vertexTop2,
        bottom1: vertexBottom1,
        bottom2: vertexBottom2,
      };
      faceNodeIds[mountPointOnTowerByFaces[index].Face] = {
        top1: topNode1,
        top2: topNode2,
        bottom1: bottomNode1,
        bottom2: bottomNode2,
      };
    }
    return {
      memberNodes: memberNodes,
      mountMembers: mountMembers,
    };
  } catch (e) {
    console.error(`Error: ${e.message}`);
    return null;
  }
}
