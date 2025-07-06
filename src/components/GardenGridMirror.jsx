export default function GardenGridMirror({ mirrorRows }) {  
  console.log("GardenGridMirror received:", mirrorRows);
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
            <th style={{ border: "1px solid #ccc" }}>Row</th>
            <th style={{ border: "1px solid #ccc" }}>Col</th>
            <th style={{ border: "1px solid #ccc" }}>Crop</th>
            <th style={{ border: "1px solid #ccc" }}>Icon</th>
            <th style={{ border: "1px solid #ccc" }}>Qty</th>
          </tr>
        </thead>
        <tbody>
          {mirrorRows.map((row, idx) => (
            <tr key={idx}>
              <td style={{ border: "1px solid #ccc" }}>{row.row}</td>
              <td style={{ border: "1px solid #ccc" }}>{row.col}</td>
              <td style={{ border: "1px solid #ccc" }}>{row.crop}</td>
              <td style={{ border: "1px solid #ccc" }}>{row.icon}</td>
              <td style={{ border: "1px solid #ccc" }}>{row.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}