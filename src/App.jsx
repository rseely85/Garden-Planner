import React, { useState } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";

export default function App() {
  const [grid, setGrid] = useState([
    [
      { planted: true, crop: "TestCrop", icon: "🌱" },
      { planted: false },
    ],
    [
      { planted: false },
      { planted: true, crop: "TestCrop", icon: "🌱" }
    ]
  ]);

  // Derive mirrorRows from grid
  const mirrorRows = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell.planted) {
        mirrorRows.push({
          row: r,
          col: c,
          crop: cell.crop,
          icon: cell.icon
        });
      }
    });
  });

  const handleCellClick = (r, c) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === r && colIndex === c) {
          return cell.planted
            ? { planted: false }
            : { planted: true, crop: "TestCrop", icon: "🌱" };
        }
        return cell;
      })
    );
    setGrid(newGrid);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
        Robert's Garden Planner (Toggle Test)
      </h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GardenGrid grid={grid} onCellClick={handleCellClick} />
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>
    </div>
  );
}