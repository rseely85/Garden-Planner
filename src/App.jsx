import React, { useState, useEffect } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";

export default function App() {
  const [grid, setGrid] = useState([]);
  const [mirrorRows, setMirrorRows] = useState([]);
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [gardenWidth, setGardenWidth] = useState(10);
  const [gardenHeight, setGardenHeight] = useState(20);

  useEffect(() => {
    setPlants(plantsData);
    setSelectedPlant(plantsData[0]);
  }, []);

  const handleCellClick = (r, c) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === r && colIndex === c) {
          if (cell.planted) {
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

    const newMirror = [];
    newGrid.forEach((row, rIdx) =>
      row.forEach((cell, cIdx) => {
        if (cell.planted) {
          newMirror.push({
            row: rIdx,
            col: cIdx,
            crop: cell.crop,
            icon: cell.icon
          });
        }
      })
    );
    setMirrorRows(newMirror);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Robert's Garden Planner (Grid Size)
      </h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Width (ft):{" "}
          <input
            type="number"
            value={gardenWidth}
            onChange={(e) => setGardenWidth(parseInt(e.target.value) || 1)}
            style={{ width: "60px", marginRight: "1rem" }}
          />
        </label>
        <label>
          Height (ft):{" "}
          <input
            type="number"
            value={gardenHeight}
            onChange={(e) => setGardenHeight(parseInt(e.target.value) || 1)}
            style={{ width: "60px" }}
          />
        </label>
      </div>

      <label>
        Select Plant:
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

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <GardenGrid
          grid={grid}
          setGrid={setGrid}
          gardenWidth={gardenWidth}
          gardenHeight={gardenHeight}
          onCellClick={handleCellClick}
          selectedPlant={selectedPlant}
        />
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>
    </div>
  );
}