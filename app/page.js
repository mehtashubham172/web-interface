"use client";
import React, { useState } from "react";
import "../styles/global.css";
import TowerDetailForm from "./components/TowerDetailForm";
import Viewer from "./components/Viewer";
import "bootstrap/dist/css/bootstrap.min.css";

const Page = () => {
  const [towerData, setTowerData] = useState(null);

  const handleTowerDataChange = (data) => {
    setTowerData(data);
  };

  return (
    <div className="container-fluid">
      <div className="row g-4">
        <div className="col-md-8">
          <TowerDetailForm onTowerTypeChange={handleTowerDataChange} />
        </div>
        <div className="col-md-4">
          <Viewer towerData={towerData} />
        </div>
      </div>
    </div>
  );
};

export default Page;