import React, { useState, useEffect } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";

export default function App() {
  const [grid, setGrid] = useState([]);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [gardenWidth, setGardenWidth] = useState(10);
  const [gardenHeight, setGardenHeight] = useState(10);

  useEffect(() => {
    setPlants(plantsData);
    setSelectedPlant(plantsData[0]);
    // Initialize grid
    const initialGrid = Array.from({ length: 10 }, () =>
      Array.from({ length: 10 }, () => ({ planted: false, crop: null, icon: null }))
    );
    setGrid(initialGrid);
  }, []);

  const handleCellClick = (r, c) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === r && colIndex === c) {
          if (selectedPlant.plant === "Clear") {
            return { planted: false, crop: null, icon: null };
          } else {
            return { planted: true, crop: selectedPlant.plant, icon: selectedPlant.icon };
          }
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const mirrorRows = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell.planted) {
        mirrorRows.push({ row: r, col: c, crop: cell.crop, icon: cell.icon });
      }
    });
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Robert's Garden Planner</h1>
      <div>
        Width (ft): <input type="number" value={gardenWidth} onChange={(e) => setGardenWidth(parseInt(e.target.value) || 0)} />
        Height (ft): <input type="number" value={gardenHeight} onChange={(e) => setGardenHeight(parseInt(e.target.value) || 0)} />
      </div>
      <div>
        Select Plant: 
        <select value={selectedPlant ? selectedPlant.plant : ""} onChange={(e) => setSelectedPlant(plants.find(p => p.plant === e.target.value))}>
          {plants.map((p) => (
            <option key={p.plant} value={p.plant}>{p.icon} {p.plant}</option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GardenGrid grid={grid} onCellClick={handleCellClick} width={gardenWidth} height={gardenHeight} />
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>
    </div>
  );
}