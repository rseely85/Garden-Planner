// AppCodeV26
import React, { useState, useEffect } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";

export default function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [grid, setGrid] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(plantsData[0]);
  const [zoom, setZoom] = useState(1.0);

  // ✅ Rebuild grid when width/height change
  useEffect(() => {
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
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === r && colIndex === c) {
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
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell.planted) {
        mirrorRows.push({ row: r, col: c, crop: cell.crop, icon: cell.icon });
      }
    });
  });

  return (
    <div>
      <h1>Robert's Garden Planner</h1>
      <div>
        Width (ft):{" "}
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
        />
        Height (ft):{" "}
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
        />
      </div>
      <div>
        Select Plant:{" "}
        <select
          value={selectedPlant.plant}
          onChange={(e) =>
            setSelectedPlant(plantsData.find((p) => p.plant === e.target.value))
          }
        >
          {plantsData.map((plant) => (
            <option key={plant.plant} value={plant.plant}>
              {plant.icon} {plant.plant}
            </option>
          ))}
        </select>
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
          width={width}
          height={height}
          grid={grid}
          setGrid={setGrid}
          onCellClick={handleCellClick}
          zoom={zoom}
        />
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>
    </div>
  );
}