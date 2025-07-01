import React, { useState, useEffect } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";

export default function App() {
  const [width, setWidth] = useState(10); // initial width in ft
  const [height, setHeight] = useState(10); // initial height in ft
  const [grid, setGrid] = useState([]);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    setPlants(plantsData);
    setSelectedPlant(plantsData[0]);
  }, []);

  useEffect(() => {
    // Rebuild grid whenever width/height change
    const newGrid = [];
    for (let r = 0; r < height; r++) {
      const row = [];
      for (let c = 0; c < width; c++) {
        row.push({ planted: false, crop: null, icon: null });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, [width, height]);

  const handleCellClick = (r, c) => {
    const newGrid = grid.map((row, rIdx) =>
      row.map((cell, cIdx) => {
        if (rIdx === r && cIdx === c) {
          return {
            planted: true,
            crop: selectedPlant.plant,
            icon: selectedPlant.icon
          };
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  const mirrorRows = [];
  grid.forEach((row, rIdx) => {
    row.forEach((cell, cIdx) => {
      if (cell.planted) {
        mirrorRows.push({
          row: rIdx,
          col: cIdx,
          crop: cell.crop,
          icon: cell.icon
        });
      }
    });
  });

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Robert's Garden Planner</h1>
      <label>
        Width (ft):
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
        />
      </label>
      <label style={{ marginLeft: "1rem" }}>
        Height (ft):
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
        />
      </label>
      <div>
        Select Plant:
        <select
          value={selectedPlant ? selectedPlant.plant : ""}
          onChange={(e) => {
            const plant = plants.find((p) => p.plant === e.target.value);
            setSelectedPlant(plant);
          }}
        >
          {plants.map((p) => (
            <option key={p.plant} value={p.plant}>
              {p.icon} {p.plant}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GardenGrid
          grid={grid}
          onCellClick={handleCellClick}
          width={width}
          height={height}
        />
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>
    </div>
  );
}