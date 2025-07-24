import React from "react";
import "./GardenGridMirror.css";

export default function GardenGridMirror({ mirrorRows, viewMode = "grouped", styleMode = "full" }) {
  // Group by crop and icon, summing qty for grouped mode
  const getGroupedItems = () => {
    const grouped = {};
    mirrorRows.forEach(item => {
      const key = `${item.crop}-${item.icon}`;
      if (!grouped[key]) {
        grouped[key] = { crop: item.crop, icon: item.icon, qty: 0 };
      }
      grouped[key].qty += item.qty;
    });
    return Object.values(grouped);
  };

  const tableClass = `mirror-table ${styleMode === "compact" ? "mirror-compact" : "mirror-full"}`;
  console.debug("GardenGridMirror styleMode:", styleMode);
  console.debug("GardenGridMirror tableClass:", tableClass);

  // Restrict to first 4 rows in single+compact mode
  let displayRows = mirrorRows;
  if (viewMode === "single" && styleMode === "compact") {
    displayRows = mirrorRows.slice(0, 4);
  }

  return (
    <div>
      <div style={{ color: 'red', fontWeight: 'bold' }}>View Mode: {viewMode} | Style Mode: {styleMode}</div>
      <div className="mirror-grid-inner">
        <table className={tableClass}>
          <thead>
            <tr>
              {viewMode === "single" && (
                <>
                  <th className="mirror-th">Row</th>
                  <th className="mirror-th">Col</th>
                </>
              )}
              <th className="mirror-th">Crop</th>
              <th className="mirror-th">Icon</th>
              <th className="mirror-th">Qty</th>
            </tr>
          </thead>
          <tbody>
            {viewMode === "single"
              ? displayRows.map((item, idx) => (
                  <tr key={idx}>
                    <td className="mirror-td">{item.row}</td>
                    <td className="mirror-td">{item.col}</td>
                    <td className="mirror-td">{item.crop}</td>
                    <td className="mirror-td">{item.icon}</td>
                    <td className="mirror-td">{item.qty}</td>
                  </tr>
                ))
              : getGroupedItems().map((item, idx) => (
                  <tr key={idx}>
                    <td className="mirror-td">{item.crop}</td>
                    <td className="mirror-td">{item.icon}</td>
                    <td className="mirror-td">{item.qty}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}