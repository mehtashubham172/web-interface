import React, { useState } from "react";
import Viewer from './Viewer'; // Import the Viewer component

const TowerConfigurator = () => {
  const [towerType, setTowerType] = useState('Monopole');
  const [width, setWidth] = useState(5); // Default width
  const [height, setHeight] = useState(6); // Default height

  return (
    <div>
      <h1>Tower Viewer</h1>
      
      {/* Inputs to capture width and height */}
      <div>
        <label>
          Width:
          <input 
            type="number" 
            value={width} 
            onChange={(e) => setWidth(Number(e.target.value))} 
          />
        </label>
      </div>
      
      <div>
        <label>
          Height:
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(Number(e.target.value))} 
          />
        </label>
      </div>

      {/* Dropdown to choose tower type */}
      <div>
        <label>
          Tower Type:
          <select onChange={(e) => setTowerType(e.target.value)} value={towerType}>
            <option value="Monopole">Monopole</option>
            <option value="3-Sided">3-Sided</option>
            <option value="4-Sided">4-Sided</option>
          </select>
        </label>
      </div>

      {/* Viewer Component */}
      <Viewer towerType={towerType} width={width} height={height} />
    </div>
  );
};

export default TowerConfigurator;
