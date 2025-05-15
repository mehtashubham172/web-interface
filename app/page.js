"use client";
import React, { useEffect, useState } from "react";
import "../styles/global.css";
import TowerDetailForm from "./components/TowerDetailForm";
import Viewer from "./components/Viewer";
import "bootstrap/dist/css/bootstrap.min.css";
import { generatePlatformNodes } from "./services/generatePlatformNodes";

const Page = () => {
  const [towerData, setTowerData] = useState(null);
  const [mountData, setMountData] = useState(null);
  const [mountMemberDetails, setMountMemberDetails] = useState(null);
  useEffect(() => {
    if (towerData && mountData) {
      console.log("Both towerData and mountData are available.");
      let mountDetails = {
        elevation: 10,
        height: mountData.height * 1,
        width: mountData.faceWidth * 1,
        standoff: (mountData.standoff || "2") * 1,
        azimuth: mountData.mountAzimuth * 1,
        location: mountData.location || "Face A",
        mountType: mountData.mountType,
        towerWidth: towerData.width * 1,
        Offsets: {
          vertical: 0,
          horizontal: 0,
          lateral: 0,
        },
        noOfLegs:
          towerData.towerType === "Monopole"
            ? 3
            : towerData.towerType === "3-Sided"
            ? 3
            : 4,
      };
      console.log("Mount Details:", mountDetails);
      const mountMembersInfo = generatePlatformNodes(mountDetails);
      setMountMemberDetails(mountMembersInfo);
      // Debugging log
    }

    console.log("Tower Data:", towerData); // Debugging log
    console.log("Mount Data:", mountData); // Debugging log
  }, [towerData, mountData]);
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
          <TowerDetailForm
            onTowerSubmit={handleTowerDataChange}
            onMountSubmit={handleMountDataChange}
          />
        </div>
        <div className="col-md-4">
          <Viewer
            towerData={towerData}
            mountData={mountData}
            mountMemberDetails={mountMemberDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
