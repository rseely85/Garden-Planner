// AppCodeV29
import React, { useState } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";
import plantsData from "./data/plants.json";
import './planner-theme.css';

export default function App() {
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedLight, setSelectedLight] = useState("");
  const [selectedSoil, setSelectedSoil] = useState("");
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [grid, setGrid] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(plantsData[0]);
  const [zoom, setZoom] = useState(1.0);
  const [cellSize, setCellSize] = useState(12); // default to 12"
  const [viewMode, setViewMode] = useState("single"); // "single" or "grouped"

  const handleCellClick = (r, c, isShift, shiftStart) => {
    let newGrid = [...grid];

    if (isShift && shiftStart) {
      if (r === shiftStart.r) {
        // Fill row
        const min = Math.min(c, shiftStart.c);
        const max = Math.max(c, shiftStart.c);
        for (let i = min; i <= max; i++) {
          newGrid[r][i] = {
            planted: selectedPlant.plant !== "Clear",
            crop: selectedPlant.plant !== "Clear" ? selectedPlant.plant : null,
            icon: selectedPlant.plant !== "Clear" ? selectedPlant.icon : null,
          };
        }
      } else if (c === shiftStart.c) {
        // Fill column
        const min = Math.min(r, shiftStart.r);
        const max = Math.max(r, shiftStart.r);
        for (let i = min; i <= max; i++) {
          newGrid[i][c] = {
            planted: selectedPlant.plant !== "Clear",
            crop: selectedPlant.plant !== "Clear" ? selectedPlant.plant : null,
            icon: selectedPlant.plant !== "Clear" ? selectedPlant.icon : null,
          };
        }
      }
    } else {
      // Single cell
      newGrid[r][c] = {
        planted: selectedPlant.plant !== "Clear",
        crop: selectedPlant.plant !== "Clear" ? selectedPlant.plant : null,
        icon: selectedPlant.plant !== "Clear" ? selectedPlant.icon : null,
      };
    }

    setGrid(newGrid);
  };

  const mirrorRows = [];
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (cell && cell.planted) {
        let plantData = plantsData.find((p) => p.plant === cell.crop);
        // If Planter Border, override spacing to match cellSize
        let spacing = 12;
        if (plantData) {
          if (plantData.plant === "Planter Border") {
            spacing = cellSize;
          } else {
            spacing = plantData.spacing ? plantData.spacing : 12;
          }
        }
        const qtyRaw = 1 + cellSize / spacing;
        const qty = qtyRaw > 1.75 ? Math.ceil(qtyRaw) : 1;

        mirrorRows.push({
          row: r,
          col: c,
          crop: cell.crop,
          icon: cell.icon,
          qty,
        });
      }
    });
  });
  console.log("mirrorRows with qty:", mirrorRows);
  const gridWidthInCells = Math.floor((width * 12) / cellSize);
  const gridHeightInCells = Math.floor((height * 12) / cellSize);
  const filteredPlants = plantsData.filter(
    (p) =>
      p.plant === "Clear" ||
      p.plant === "Placeholder" ||
      ((selectedZone === "" || p.zone.includes(selectedZone)) &&
        (selectedLight === "" || p.light.includes(selectedLight)) &&
        (selectedSoil === "" || p.soil.includes(selectedSoil)))
  );
  return (
    <div className="planner-root">
      <header className="planner-header">
        <h1 className="planner-title">
          Garden Planner <span style={{ fontWeight: 400, fontSize: '0.7em', color: '#3AB86F' }}>(Beta)</span>
        </h1>
        <div className="planner-controls">
          <div>
            <div className="version-tag">Build: v1.0.2 — July 26</div>
            Width (ft):
<input
  type="number"
  inputMode="numeric"
  pattern="[0-9]*"
  value={width.toString().replace(/^0+/, '')}
  onChange={(e) => {
    const value = e.target.value.replace(/^0+/, '');
    setWidth(parseInt(value || '0', 10));
  }}
/>
Height (ft):
<input
  type="number"
  inputMode="numeric"
  pattern="[0-9]*"
  value={height.toString().replace(/^0+/, '')}
  onChange={(e) => {
    const value = e.target.value.replace(/^0+/, '');
    setHeight(parseInt(value || '0', 10));
  }}
/>
          </div>
          <div>
            <label>Cell Size:</label>
            <label>
              <input
                type="radio"
                value={6}
                checked={cellSize === 6}
                onChange={() => setCellSize(6)}
              />
              6"
            </label>
            <label>
              <input
                type="radio"
                value={12}
                checked={cellSize === 12}
                onChange={() => setCellSize(12)}
              />
              12"
            </label>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                {filteredPlants.map((p) => (
                  <option key={p.plant} value={p.plant}>
                    {p.icon} {p.plant}
                  </option>
                ))}
              </select>
            </div>
            <div>
              Zone:
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
              >
                <option value="">All</option>
                <option value="5">5</option>
                <option value="5b">5b</option>
                <option value="6">6</option>
                <option value="6b">6b</option>
                <option value="7">7</option>
                <option value="7b">7b</option>
              </select>
            </div>
            <div>
              Light:
              <select
                value={selectedLight}
                onChange={(e) => setSelectedLight(e.target.value)}
              >
                <option value="">All</option>
                <option value="full sun">Full Sun</option>
                <option value="partial shade">Partial Shade</option>
                <option value="shade">Shade</option>
              </select>
            </div>
            <div>
              Soil:
              <select
                value={selectedSoil}
                onChange={(e) => setSelectedSoil(e.target.value)}
              >
                <option value="">All</option>
                <option value="loamy">Loamy</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
              </select>
            </div>
            <div style={{ marginLeft: "2em", textAlign: "center" }}>
              <label>
                <input
                  type="radio"
                  value="single"
                  checked={viewMode === "single"}
                  onChange={() => setViewMode("single")}
                />
                Single Row
              </label>
              <label style={{ marginLeft: "1em" }}>
                <input
                  type="radio"
                  value="grouped"
                  checked={viewMode === "grouped"}
                  onChange={() => setViewMode("grouped")}
                />
                Grouped
              </label>
            </div>
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
        </div>
      </header>
      <div className="planner-grids">
        <div className="garden-grid-outer">
          <div className="garden-grid-inner">
            <GardenGrid
              width={gridWidthInCells}
              height={gridHeightInCells}
              grid={grid}
              setGrid={setGrid}
              onCellClick={handleCellClick}
              cellSize={cellSize}
              zoom={zoom}
            />
          </div>
        </div>
        <div className="mirror-grid-outer">
          <div className="mirror-grid-inner">
            <GardenGridMirror mirrorRows={mirrorRows} viewMode={viewMode} />
          </div>
        </div>
      </div>
    </div>
  );
}