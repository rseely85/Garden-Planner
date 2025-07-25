// GardenGridCodeV54
import React, { useState, useEffect } from "react";

function isGridEmpty(grid) {
  return grid.length === 0 || grid.every(row => row.every(cell => !cell?.planted));
}

export default function GardenGrid({
  width,
  height,
  grid,
  setGrid,
  onCellClick,
  zoom
}) {
  const [shiftStart, setShiftStart] = useState(null);

  useEffect(() => {
    const newGrid = [];
    for (let r = 0; r < height; r++) {
      const row = [];
      for (let c = 0; c < width; c++) {
        row.push(grid[r]?.[c] || { planted: false, crop: null, icon: null });
      }
      newGrid.push(row);
    }
    if (isGridEmpty(grid)) {
      setGrid(newGrid);
    }
  }, [width, height]);

  const handleClick = (r, c, e) => {
    if (e.shiftKey) {
      if (!shiftStart) {
        setShiftStart({ r, c });
      } else {
        onCellClick(r, c, true, shiftStart);
        setShiftStart(null);
      }
    } else {
      onCellClick(r, c, false, null);
      setShiftStart(null);
    }
  };

  const CELL_BASE_SIZE = 20;

  return (
    <div className="garden-grid-inner" style={{
      height: "auto", // Allow vertical expansion
      overflowY: "auto", // Enable vertical scrolling if needed
      flexGrow: 1, // Expand if inside a flexbox
      border: "2px solid #D0D0D0",
      background: "#e0f7ff",
      boxSizing: "border-box"
    }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${width}, ${CELL_BASE_SIZE * zoom}px)`,
          gridTemplateRows: `repeat(${height}, ${CELL_BASE_SIZE * zoom}px)`
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={(e) => handleClick(r, c, e)}
              style={{
                width: `${CELL_BASE_SIZE * zoom}px`,
                height: `${CELL_BASE_SIZE * zoom}px`,
                border: "1px solid #ccc",
                backgroundColor: cell.planted && cell.crop && cell.crop !== "Clear"
                  ? cell.crop === "Placeholder"
                    ? "#999"
                    : "green"
                  : "white",
                color: "black",
                fontSize: `${12 * zoom}px`,
                textAlign: "center",
                lineHeight: `${CELL_BASE_SIZE * zoom}px`
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