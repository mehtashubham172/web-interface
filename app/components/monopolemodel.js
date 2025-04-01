import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const MonopoleModel = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(300, 300); // Adjust size as needed
    mountRef.current.appendChild(renderer.domElement);

    // Create the Monopole shape
    const geometry = new THREE.CylinderGeometry(0.5, 0.5, 10, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const monopole = new THREE.Mesh(geometry, material);
    
    scene.add(monopole);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      monopole.rotation.y += 0.01; // Rotate the model slightly
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default MonopoleModel;
