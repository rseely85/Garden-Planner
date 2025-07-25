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
  // Restrict to first 4 rows in single+compact mode
  let displayRows = mirrorRows;
  if (viewMode === "single" && styleMode === "compact") {
    displayRows = mirrorRows.slice(0, 4);
  }

  return (
    <div className="mirror-wrapper">
      <div className="mirror-viewmode-label">View Mode: {viewMode}</div>
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
            {displayRows && displayRows.length > 0 ? (
              viewMode === "single"
                ? displayRows.map((row) => (
                    <tr key={`${row.crop}-${row.row}-${row.col}`}>
                      <td className="mirror-td">{row.row}</td>
                      <td className="mirror-td">{row.col}</td>
                      <td className="mirror-td">{row.crop}</td>
                      <td className="mirror-td">{row.icon}</td>
                      <td className="mirror-td">{row.qty}</td>
                    </tr>
                  ))
                : getGroupedItems().map((row, index) => (
                    <tr key={`${row.crop}-${row.icon}-${row.qty}-${index}`}>
                      <td className="mirror-td">{row.crop}</td>
                      <td className="mirror-td">{row.icon}</td>
                      <td className="mirror-td">{row.qty}</td>
                    </tr>
                  ))
            ) : (
              <tr>
                <td className="mirror-no-data" colSpan={viewMode === "single" ? 5 : 3}>No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}