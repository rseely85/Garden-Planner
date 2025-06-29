import React from "react";

export default function GardenGridMirror({ mirrorRows }) {
  return (
    <div
      style={{
        border: "4px solid green",
        backgroundColor: "#eee",
        width: 800,
        height: 500,
        overflow: "auto",
        padding: 10,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", borderBottom: "2px solid black" }}>Row</th>
            <th style={{ textAlign: "left", borderBottom: "2px solid black" }}>Col</th>
            <th style={{ textAlign: "left", borderBottom: "2px solid black" }}>Crop</th>
            <th style={{ textAlign: "left", borderBottom: "2px solid black" }}>Icon</th>
          </tr>
        </thead>
        <tbody>
          {mirrorRows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.row}</td>
              <td>{row.col}</td>
              <td>{row.crop}</td>
              <td>{row.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
