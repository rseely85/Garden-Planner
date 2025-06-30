import React from "react";

export default function GardenGridMirror({ mirrorRows }) {
  return (
    <div
      style={{
        padding: 10,
        border: "4px solid green",
        width: 800,
        height: 500,
        overflow: "auto",
        backgroundColor: "white"
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "black",
          backgroundColor: "white"
        }}
      >
        <thead>
          <tr>
            <th>Row</th>
            <th>Col</th>
            <th>Crop</th>
            <th>Icon</th>
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