import React from "react";

export default function GardenGrid({ grid, onCellClick, zoom = 1 }) {
  const CELL_BASE_SIZE = 20; // Base size in px before zoom

  return (
    <div
      style={{
        width: "800px",
        height: "500px",
        border: "4px solid blue",
        overflow: "auto",
        backgroundColor: "#e0f7ff",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid[0]?.length || 0}, ${
            CELL_BASE_SIZE * zoom
          }px)`,
          gridTemplateRows: `repeat(${grid.length}, ${CELL_BASE_SIZE * zoom}px)`,
          border: "2px solid black",
        }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              onClick={() => onCellClick(r, c)}
              style={{
                width: `${CELL_BASE_SIZE * zoom}px`,
                height: `${CELL_BASE_SIZE * zoom}px`,
                border: "1px solid #ccc",
                backgroundColor: cell.planted
                  ? cell.crop === "Placeholder"
                    ? "#999"
                    : "green"
                  : "white",
                color: "black",
                fontSize: `${12 * zoom}px`,
                textAlign: "center",
                lineHeight: `${CELL_BASE_SIZE * zoom}px`,
                cursor: "pointer",
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