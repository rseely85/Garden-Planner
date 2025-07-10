import React from "react";

export default function GardenGridMirror({ mirrorRows, viewMode }) {
  // Group line items by crop and icon, summing the qty
  const getGroupedItems = () => {
    const grouped = {};
    mirrorRows.forEach(item => {
      const key = `${item.crop}-${item.icon}`;
      if (!grouped[key]) {
        grouped[key] = { ...item };
      } else {
        grouped[key].qty += item.qty;
      }
    });
    return Object.values(grouped);
  };

  const groupedItems = getGroupedItems();

  return (
    <div
      style={{
        border: "2px solid green",
        width: "800px",
        height: "500px",
        overflow: "auto",
        padding: "4px",
        backgroundColor: "#fff",
        boxSizing: "border-box"
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", color: "black" }}>
        <thead>
          <tr>
            {viewMode === "single" ? (
              <>
                <th style={{ border: "1px solid #ccc" }}>Row</th>
                <th style={{ border: "1px solid #ccc" }}>Col</th>
              </>
            ) : null}
            <th style={{ border: "1px solid #ccc" }}>Crop</th>
            <th style={{ border: "1px solid #ccc" }}>Icon</th>
            <th style={{ border: "1px solid #ccc" }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {viewMode === "single"
            ? mirrorRows.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid #ccc" }}>{row.row}</td>
                  <td style={{ border: "1px solid #ccc" }}>{row.col}</td>
                  <td style={{ border: "1px solid #ccc" }}>{row.crop}</td>
                  <td style={{ border: "1px solid #ccc" }}>{row.icon}</td>
                  <td style={{ border: "1px solid #ccc" }}>{row.qty}</td>
                </tr>
              ))
            : groupedItems.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid #ccc" }}>{item.crop}</td>
                  <td style={{ border: "1px solid #ccc" }}>{item.icon}</td>
                  <td style={{ border: "1px solid #ccc" }}>{item.qty}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}