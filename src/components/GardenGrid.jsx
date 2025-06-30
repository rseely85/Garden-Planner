import React, { useEffect } from "react";

export default function GardenGrid({
  grid,
  setGrid,
  gardenWidth,
  gardenHeight,
  onCellClick,
  selectedPlant
}) {
  useEffect(() => {
    const numCols = Math.max(Math.floor((gardenWidth * 12) / 12), 1);
    const numRows = Math.max(Math.floor((gardenHeight * 12) / 12), 1);
    const newGrid = Array.from({ length: numRows }, (_, r) =>
      Array.from({ length: numCols }, (_, c) =>
        grid[r] && grid[r][c] ? grid[r][c] : { planted: false, crop: null, icon: null }
      )
    );
    setGrid(newGrid);
  }, [gardenWidth, gardenHeight]);

  return (
    <div
      style={{
        width: 800,
        height: 500,
        border: "4px solid blue",
        overflow: "auto",
        backgroundColor: "#e0f7ff"
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${grid[0]?.length || 1}, 30px)`,
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
                textAlign: "center",
                lineHeight: "30px",
                border: "1px solid #ccc",
                cursor: "pointer",
                backgroundColor: cell.planted
                  ? cell.crop === "Placeholder"
                    ? "#999"
                    : "green"
                  : "white",
                color: "black",
                fontSize: "16px"
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