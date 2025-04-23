"use client";
import React, { useState } from "react";
import "../styles/global.css";
import TowerDetailForm from "./components/TowerDetailForm";
import Viewer from "./components/Viewer";
import "bootstrap/dist/css/bootstrap.min.css";

const Page = () => {
  const [towerData, setTowerData] = useState(null);
  const [mountData, setMountData] = useState(null);
  const handleTowerDataChange = (data) => {
    console.log("Received Tower Data:", data); // Debugging log
    setTowerData(data);
  };
  const handleMountDataChange = (data) => {
    console.log("Received Mount Data:", data); // Debugging log
    setMountData(data);
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-md-8">
          {/* Fix: Pass `handleTowerDataChange` as `onTowerSubmit` */}
          <TowerDetailForm onTowerSubmit={handleTowerDataChange} onMountSubmit = {handleMountDataChange} />
        </div>
        <div className="col-md-4">
          <Viewer towerData={towerData} mountData={mountData}/>
        </div>
      </div>
    </div>
  );
};

export default Page;
