import React, { useEffect, useState } from "react";

const PLANTING_INTERVAL = 4;
const CELL_SIZE = 30; // base pixel size

export default function GardenGrid({ gardenWidth, gardenHeight, zoom = 1, cellScale = 12, setMirrorRows }) {
  const [grid, setGrid] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState({ plant: "Tomato", icon: "🍅" });

  const numCols = Math.floor((gardenWidth * 12) / cellScale);
  const numRows = Math.floor((gardenHeight * 12) / cellScale);
  const scaledSize = CELL_SIZE * zoom;

  useEffect(() => {
    const newGrid = Array.from({ length: numRows }, () =>
      Array.from({ length: numCols }, () => ({ planted: false, crop: null, icon: null }))
    );
    setGrid(newGrid);
  }, [numCols, numRows]);

  const handleClick = (r, c) => {
    const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
    const cell = newGrid[r][c];
    
    if (cell.planted) {
      newGrid[r][c] = { planted: false, crop: null, icon: null };
    } else {
      newGrid[r][c] = { planted: true, crop: selectedPlant.plant, icon: selectedPlant.icon };
    }

    setGrid(newGrid);

    // Update mirror rows
    const mirrorData = [];
    newGrid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.planted) {
          mirrorData.push({ row: rowIndex + 1, col: colIndex + 1, crop: cell.crop, icon: cell.icon });
        }
      });
    });
    setMirrorRows(mirrorData);
  };

  return (
    <div style={{ backgroundColor: "#e0f7ff", padding: 10, border: "4px solid blue", width: 800, height: 500, overflow: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${numCols}, ${scaledSize}px)`, gridTemplateRows: `repeat(${numRows}, ${scaledSize}px)`, border: "2px solid black" }}>
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => handleClick(r, c)}
              style={{
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                backgroundColor: cell.planted ? "lightgreen" : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc"
              }}
            >
              {cell.planted ? cell.icon : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
}