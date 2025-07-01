import React from "react";

export default function GardenGrid({ grid, onCellClick, width, height }) {
  const cellSize = 20;

  return (
    <div
      style={{
        backgroundColor: "#e0f7ff",
        padding: 10,
        border: "4px solid blue",
        width: 800,
        height: 500,
        overflow: "auto"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${cellSize}px)`
        }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => onCellClick(rIdx, cIdx)}
              style={{
                width: cellSize,
                height: cellSize,
                border: "1px solid #ccc",
                backgroundColor: cell.planted
                  ? cell.crop === "Placeholder"
                    ? "grey"
                    : "green"
                  : "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
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