import React, { useEffect } from "react";
import * as THREE from "three";

const ThreeScene = ({ towerType, mountType }) => {
  useEffect(() => {
    // Initialize your Three.js scene here
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Cleanup on component unmount
      renderer.dispose();
    };
  }, [towerType, mountType]);

  return <div id="threejs-container" />;
};

export default ThreeScene;  // Make sure you export it correctly
