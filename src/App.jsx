import React, { useState } from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";

export default function App() {
  const [grid, setGrid] = useState([]);
  const [mirrorRows, setMirrorRows] = useState([]);
  const [gardenWidth, setGardenWidth] = useState(10);
  const [gardenHeight, setGardenHeight] = useState(20);
  const [scale, setScale] = useState(12);
  const [zoom, setZoom] = useState(1);

  console.log("App is rendering", { grid, mirrorRows });

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Robert's Garden Planner</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label>Garden Width (ft): </label>
        <input
          type="number"
          value={gardenWidth}
          onChange={(e) => setGardenWidth(parseInt(e.target.value) || 0)}
          style={{ marginRight: "1rem" }}
        />
        <label>Garden Height (ft): </label>
        <input
          type="number"
          value={gardenHeight}
          onChange={(e) => setGardenHeight(parseInt(e.target.value) || 0)}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>6"</label>
        <input
          type="radio"
          name="scale"
          value={6}
          checked={scale === 6}
          onChange={() => setScale(6)}
          style={{ margin: "0 0.5rem" }}
        />
        <label>12"</label>
        <input
          type="radio"
          name="scale"
          value={12}
          checked={scale === 12}
          onChange={() => setScale(12)}
          style={{ margin: "0 0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Zoom: {Math.round(zoom * 100)}%</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <GardenGrid
          grid={grid}
          setGrid={setGrid}
          setMirrorRows={setMirrorRows}
          width={gardenWidth}
          height={gardenHeight}
          scale={scale}
          zoom={zoom}
        />
        <GardenGridMirror mirrorRows={mirrorRows} />
      </div>
    </div>
  );
}
