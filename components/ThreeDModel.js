"export default function ThreeDModel() { return <div>3D Model</div>; }" 
"use client";
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box } from "@react-three/drei";

export default function ThreeDModel() {
  return (
    <Canvas style={{ width: "100%", height: "400px", background: "#eee" }}>
      <ambientLight intensity={0.5} />
      <OrbitControls />
      <Box args={[1, 1, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial attach="material" color="blue" />
      </Box>
    </Canvas>
  );
}
