import React from "react";
import GardenGrid from "./components/GardenGrid";
import GardenGridMirror from "./components/GardenGridMirror";

export default function App() {
  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Robert's Garden Planner (Debug Mode)</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GardenGrid />
        <GardenGridMirror />
      </div>
    </div>
  );
}