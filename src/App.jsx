// AppCodeV29
import React, { useState } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";

export default function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [grid, setGrid] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(plantsData[0]);
  const [zoom, setZoom] = useState(1.0);

  const handleCellClick = (r, c, isShift, shiftStart) => {
    let newGrid = [...grid];

    if (isShift && shiftStart) {
      if (r === shiftStart.r) {
        // Fill row
        const min = Math.min(c, shiftStart.c);
        const max = Math.max(c, shiftStart.c);
        for (let i = min; i <= max; i++) {
          newGrid[r][i] = {
            planted: true,
            crop: selectedPlant.plant,
            icon: selectedPlant.icon
          };
        }
      } else if (c === shiftStart.c) {
        // Fill column
        const min = Math.min(r, shiftStart.r);
        const max = Math.max(r, shiftStart.r);
        for (let i = min; i <= max; i++) {
          newGrid[i][c] = {
            planted: true,
            crop: selectedPlant.plant,
            icon: selectedPlant.icon
          };
        }
      }
    } else {
      // Single cell
      newGrid[r][c] = {
        planted: true,
        crop: selectedPlant.plant,
        icon: selectedPlant.icon
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
        Select Plant:
        <select
          value={selectedPlant.plant}
          onChange={(e) =>
            setSelectedPlant(
              plantsData.find((p) => p.plant === e.target.value)
            )
          }
        >
          {plantsData.map((p) => (
            <option key={p.plant} value={p.plant}>
              {p.icon} {p.plant}
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