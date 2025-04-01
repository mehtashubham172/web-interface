import { useState } from "react";
import TowerDetailForm from "./TowerDetailForm";
import Viewer from "./Viewer";

export default function App() {
  const [towerData, setTowerData] = useState(null);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <TowerDetailForm onTowerDataChange={setTowerData} />
      <Viewer towerData={towerData} />
    </div>
  );
}
