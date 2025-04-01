import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { generateMonopoleTower } from "../TowerTypeService/MonopoleService";
import { generateThreeLeggedTower } from "../TowerTypeService/ThreeLeggedTowerService";
import { generateFourLeggedTower } from "../TowerTypeService/FourLeggedService";
import { generateAxes } from "../components/axisservice";

const Viewer = ({ towerData }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const { towerType, width, height } = towerData || {}; 

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 450 / window.innerHeight, 0.1, 100);
    camera.position.set(0, 20, 35);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(450, window.innerHeight);
    renderer.shadowMap.enabled = true;

    if (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    //  Axes
    scene.add(generateAxes());

    //  Lighting
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(10, 20, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.enableZoom = true;
    controls.enablePan = false;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      controls.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, [towerData]);

  return <div ref={mountRef}></div>;
};

export default Viewer;
