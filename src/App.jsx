// AppCodeV29
import React, { useState } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";

export default function App() {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedLight, setSelectedLight] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [grid, setGrid] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(plantsData[0]);
  const [shiftStart, setShiftStart] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [scale, setScale] = useState(12); // default 12"
  const [cellSize, setCellSize] = useState(12); // default to 12"
 

  const handleCellClick = (r, c, isShift, shiftStart) => {
    let newGrid = [...grid];

    if (isShift && shiftStart) {
      if (r === shiftStart.r) {
        // Fill row
        const min = Math.min(c, shiftStart.c);
        const max = Math.max(c, shiftStart.c);
        for (let i = min; i <= max; i++) {
          newGrid[r][i] = {
  planted: selectedPlant.plant !== 'Clear',
  crop: selectedPlant.plant !== 'Clear' ? selectedPlant.plant : null,
  icon: selectedPlant.plant !== 'Clear' ? selectedPlant.icon : null
};
        }
      } else if (c === shiftStart.c) {
        // Fill column
        const min = Math.min(r, shiftStart.r);
        const max = Math.max(r, shiftStart.r);
        for (let i = min; i <= max; i++) {
          newGrid[i][c] = {
  planted: selectedPlant.plant !== 'Clear',
  crop: selectedPlant.plant !== 'Clear' ? selectedPlant.plant : null,
  icon: selectedPlant.plant !== 'Clear' ? selectedPlant.icon : null
};
        }
      }
    } else {
      // Single cell
      newGrid[r][c] = {
  planted: selectedPlant.plant !== 'Clear',
  crop: selectedPlant.plant !== 'Clear' ? selectedPlant.plant : null,
  icon: selectedPlant.plant !== 'Clear' ? selectedPlant.icon : null
};
    }

    setGrid(newGrid);
  };

  const mirrorRows = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell && cell.planted) {
        mirrorRows.push({
          row: r,
          col: c,
          crop: cell.crop,
          icon: cell.icon
        });
      }
    });
  });
  const gridWidthInCells = Math.floor((width * 12) / cellSize);
const gridHeightInCells = Math.floor((height * 12) / cellSize);
const filteredPlants = plantsData.filter(p => 
  (selectedZone === "" || p.zone.includes(selectedZone)) &&
  (selectedLight === "" || p.light.includes(selectedLight)) &&
  (selectedSoil === "" || p.soil.includes(selectedSoil))
);
  return (
    <div>
      <h1>Robert's Garden Planner</h1>
      <div>
        Width (ft):
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
        />
        Height (ft):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
        />
      </div>
      <div>
  <label>Cell Size:</label>
  <label>
    <input
      type="radio"
      value={6}
      checked={cellSize === 6}
      onChange={() => setCellSize(6)}
    />
    6"
  </label>
  <label>
    <input
      type="radio"
      value={12}
      checked={cellSize === 12}
      onChange={() => setCellSize(12)}
    />
    12"
  </label>
</div>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
  <div>
    Select Plant:
    <select
      value={selectedPlant.plant}
      onChange={(e) =>
        setSelectedPlant(
          plantsData.find((p) => p.plant === e.target.value)
        )
      }
    >
      {filteredPlants.map((p) => (
        <option key={p.plant} value={p.plant}>
          {p.icon} {p.plant}
        </option>
      ))}
    </select>
  </div>

  <div>
    Zone:
    <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
      <option value="">All</option>
      <option value="5">5</option>
      <option value="5b">5b</option>
      <option value="6">6</option>
      <option value="6b">6b</option>
      <option value="7">7</option>
      <option value="7b">7b</option>
    </select>
  </div>

  <div>
    Light:
    <select value={selectedLight} onChange={(e) => setSelectedLight(e.target.value)}>
      <option value="">All</option>
      <option value="full sun">Full Sun</option>
      <option value="partial shade">Partial Shade</option>
      <option value="shade">Shade</option>
    </select>
  </div>

  <div>
    Soil:
    <select value={selectedSoil} onChange={(e) => setSelectedSoil(e.target.value)}>
      <option value="">All</option>
      <option value="loamy">Loamy</option>
      <option value="sandy">Sandy</option>
      <option value="clay">Clay</option>
    </select>
  </div>
</div>
      <div>
        Zoom: {Math.round(zoom * 100)}%{" "}
        <input
          type="range"
          min="0.5"
          max="2.0"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
        />
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GardenGrid
  width={gridWidthInCells}
  height={gridHeightInCells}
  grid={grid}
  setGrid={setGrid}
  onCellClick={handleCellClick}
  cellSize={cellSize}
  zoom={zoom}
        /><div>
 
</div>
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>      
    </div>
  );
}