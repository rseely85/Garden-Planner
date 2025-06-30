import React from "react";

export default function GardenGrid() {
  // Hard-coded 3x3 grid for safe rendering
  const grid = [
    [ { planted: false }, { planted: true }, { planted: false } ],
    [ { planted: false }, { planted: false }, { planted: true } ],
    [ { planted: true }, { planted: false }, { planted: false } ]
  ];

  return (
    <div style={{ backgroundColor: "#e0f7ff", padding: 10, border: "4px solid blue", width: 800, height: 500, overflow: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 60px)", gridTemplateRows: "repeat(3, 60px)", gap: "2px" }}>
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div key={`${rIdx}-${cIdx}`} style={{
              width: "60px",
              height: "60px",
              backgroundColor: cell.planted ? "green" : "white",
              border: "1px solid #ccc"
            }}>
            </div>
          ))
        )}
      </div>
    </div>
  );
}