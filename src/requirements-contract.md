🌱 Robert’s Garden Planner — Requirements Contract

This contract defines the expected baseline functionality of the app at all times unless explicitly changed.
 
📐 Layout + Frame
•	The garden grid frame and the Garden Grid Mirror frame is a fixed size of 800px wide x 500px tall (the blue-bordered box for Garden Grid and Green Border for Garden Grid Mirror).
•	The grid inside the frame is dynamic:
The number of cells adjusts based on the user-specified Width (ft) and Height (ft) inputs.
•	The grid scrolls if it overflows the frame.
 
🟩 Garden Grid Cells
•	All cells have a default size of 20px square.
•	The grid should visually display clear borders (1px light grey lines).
•	Clicking a cell:
o	If a crop exists: clears it first.
o	Then applies the currently selected crop (plant + icon).
o	This applies even if the clicked cell already had the same crop.
•	The placeholder crop displays as a grey cell.
•	Empty cells = white background.
 
🌱 Plant Selector + GridMirror
•	The plant dropdown always controls what crop is applied on click.
•	The GridMirror updates immediately after any planting change.
•	GridMirror displays all planted cells with correct row, col, crop name, and icon.
 
🔍 Zoom + Sizing Controls
•	The Width (ft) and Height (ft) inputs control the garden grid’s number of cells horizontally and vertically.
•	Zoom slider (when active) scales the visible size of the garden grid cells (visual only, not logic).
•	6”/12” cell toggle (planned, not yet active).
 
🖱 Interactions
•	Single click = clear + apply crop in one click.
•	Shift-click (future): will support selecting a cell range (row/col fill).
 
💡 Future Enhancements (Planned but not active)
•	Shift-click to select row/col ranges.
•	6”/12” cell size toggle.
•	Row/col header labels that dynamically update with zoom.
 
⚠ Notes
•	Any code generated must adhere to these baseline requirements unless explicitly approved otherwise.
•	Versioning for all components changed to include App.jsx (AppCodeV#), Garden Grid.jsx (GardenGridCodeV#), GardenGrid Mirror.jsx (Garden GridCodeV#) components should be tracked and incremented reliably.

