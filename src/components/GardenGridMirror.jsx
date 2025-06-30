import React from "react";

export default function GardenGridMirror() {
  const hardCodedRows = [
    { row: 0, col: 0, crop: "TestCrop", icon: "🌱" },
    { row: 0, col: 1, crop: "TestCrop", icon: "🌱" },
    { row: 1, col: 0, crop: "TestCrop", icon: "🌱" },
    { row: 1, col: 1, crop: "TestCrop", icon: "🌱" },
  ];

  return (
    <div
      style={{
        border: "4px solid green",
        padding: 10,
        width: 800,
        height: 500,
        overflow: "auto",
        backgroundColor: "#eee",
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
          {hardCodedRows.map((entry, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ccc", textAlign: "center" }}>{entry.row}</td>
              <td style={{ border: "1px solid #ccc", textAlign: "center" }}>{entry.col}</td>
              <td style={{ border: "1px solid #ccc", textAlign: "center" }}>{entry.crop}</td>
              <td style={{ border: "1px solid #ccc", textAlign: "center" }}>{entry.icon}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}