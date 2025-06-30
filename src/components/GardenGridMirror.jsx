import React from "react";

export default function GardenGridMirror({ mirrorRows }) {
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: 10,
        border: "4px solid green",
        width: 800,
        height: 500,
        overflow: "auto"
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc" }}>Row</th>
            <th style={{ border: "1px solid #ccc" }}>Col</th>
            <th style={{ border: "1px solid #ccc" }}>Crop</th>
            <th style={{ border: "1px solid #ccc" }}>Icon</th>
          </tr>
        </thead>
        <tbody>
          {mirrorRows.map((row, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid #ccc" }}>{row.row}</td>
              <td style={{ border: "1px solid #ccc" }}>{row.col}</td>
              <td style={{ border: "1px solid #ccc" }}>{row.crop}</td>
              <td style={{ border: "1px solid #ccc" }}>{row.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}