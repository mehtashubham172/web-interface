import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateMonopoleTower } from "../services/MonopoleService";
import { generateThreeLeggedTower } from "../services/ThreeLeggedTowerService";
import { generateFourLeggedTower } from "../services/FourLeggedService";
import { generateAxes } from "../components/axisservice";
let scene, camera, renderer, controls;
const Viewer = ({ towerData, mountData, mountMemberDetails }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    viewerInit();
  }, []);

  useEffect(() => {
    console.log("Tower Data useEffect:", towerData);
    const { towerType, width, height } = towerData || {};

    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);
    let object = null;

    // If no tower data, just show axes
    if (towerData) {
      const towerWidth = width ? parseFloat(width) : 12;
      const towerHeight = height ? parseFloat(height) : 20;

      if (towerType === "Monopole") {
        object = generateMonopoleTower(towerWidth, towerHeight);
      } else if (towerType === "3-Sided") {
        object = generateThreeLeggedTower(towerWidth, towerHeight);
      } else if (towerType === "4-Sided") {
        object = generateFourLeggedTower(towerWidth, towerHeight);
      }

      if (object) {
        scene.add(object);
      }
    }
  }, [towerData]);
  useEffect(() => {
    console.log("Mount MembersDetails useEffect:", mountData);
    console.log(mountRef.current);
    if (mountMemberDetails) {
      const { memberNodes, mountMembers } = mountMemberDetails;
      mountMembers.forEach((member) => {
        const startNode = memberNodes.find(
          (node) => node.ID === member.StartNodeID
        );
        const endNode = memberNodes.find(
          (node) => node.ID === member.EndNodeID
        );
        const point1 = new THREE.Vector3(startNode.X, startNode.Y, startNode.Z);
        const point2 = new THREE.Vector3(endNode.X, endNode.Y, endNode.Z);
        console.log("Point1:", point1);
        console.log("Point2:", point2);
        // Create geometry and add the two points
        const geometry = new THREE.BufferGeometry().setFromPoints([
          point1,
          point2,
        ]);
        console.log("Geometry:", geometry);
        // Create a basic line material
        const material = new THREE.LineBasicMaterial({
          color: 0xff0000,
          linewidth: 5,
        }); // red color

        // Create the line
        const line = new THREE.Line(geometry, material);
        console.log("Line:", line);
        scene.add(line);
      });
    }
  }, [mountMemberDetails]);

  const viewerInit = () => {
    if (scene)
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    scene = null;
    if (renderer) {
      renderer.clear();
      const cur = viewer.current;
      const ren = renderers;
      if (renderers) {
        ren.domElement.remove();
        //cur.removeChild(ren.domElement);
      }
      //cur.appendChild(renderer.domElement);
    }
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      450 / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 20, 35);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(450, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //  Axes
    scene.add(generateAxes());

    //  Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.enableZoom = true;
    controls.enablePan = false;

    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  };
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  return <div ref={mountRef}></div>;
};

export default Viewer;
