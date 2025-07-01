import React from "react";

export default function GardenGrid({ grid, onCellClick }) {
  const cellSize = 20;
  const frameWidth = 800;
  const frameHeight = 500;

  return (
    <div
      style={{
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        border: "4px solid blue",
        overflow: "auto",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${grid.length}, ${cellSize}px)`,
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => onCellClick(r, c)}
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
                border: "1px solid lightgrey",
                backgroundColor: cell.planted
                  ? cell.crop === "Placeholder"
                    ? "#999"
                    : "#4caf50"
                  : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
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