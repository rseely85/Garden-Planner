import React, { useState, useEffect } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";

export default function App() {
  const [grid, setGrid] = useState([
    [
      { planted: true, crop: "TestCrop", icon: "🌱" },
      { planted: false, crop: null, icon: null }
    ],
    [
      { planted: false, crop: null, icon: null },
      { planted: true, crop: "TestCrop", icon: "🌱" }
    ]
  ]);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    setPlants(plantsData);
    setSelectedPlant(plantsData[0]);
  }, []);

  const handleCellClick = (r, c) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === r && colIndex === c) {
          if (selectedPlant.plant === "Clear") {
            return { planted: false, crop: null, icon: null };
          } else {
            return {
              planted: true,
              crop: selectedPlant.plant,
              icon: selectedPlant.icon
            };
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
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Robert's Garden Planner (Single-Click Apply)
      </h1>
      <label>
        Selected Plant:
        <select
          value={selectedPlant ? selectedPlant.plant : ""}
          onChange={(e) => {
            const plant = plants.find((p) => p.plant === e.target.value);
            setSelectedPlant(plant);
          }}
        >
          {plants.map((plant) => (
            <option key={plant.plant} value={plant.plant}>
              {plant.icon} {plant.plant}
            </option>
          ))}
        </select>
      </label>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GardenGrid grid={grid} onCellClick={handleCellClick} />
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>
    </div>
  );
}