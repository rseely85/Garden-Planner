import React from "react";

export default function GardenGrid({ grid, onCellClick }) {
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
          gridTemplateColumns: `repeat(${grid[0].length}, 30px)`,
          gridTemplateRows: `repeat(${grid.length}, 30px)`,
          border: "2px solid black"
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => onCellClick(r, c)}
              style={{
                width: "30px",
                height: "30px",
                border: "1px solid #ccc",
                textAlign: "center",
                lineHeight: "30px",
                cursor: "pointer",
                backgroundColor: cell.planted
                  ? cell.crop === "Placeholder"
                    ? "grey"
                    : "green"
                  : "white"
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