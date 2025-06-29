import React from 'react'

export default function SettingsPanel({ settings, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    const numeric = ['cellScale', 'gardenWidth', 'gardenHeight', 'zoom'].includes(name)
    onChange(name, numeric ? parseFloat(value) : value)
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6 max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-3">🛠 Garden Settings</h2>

      <div className="grid grid-cols-2 gap-4">
        <label>
          Cell Scale (inches):
          <select name="cellScale" value={settings.cellScale} onChange={handleChange} className="ml-2">
            <option value={6}>6"</option>
            <option value={12}>12"</option>
          </select>
        </label>

        <label>
          Frame Shape:
          <select name="frameShape" value={settings.frameShape} onChange={handleChange} className="ml-2">
            <option value="rectangle-horizontal">Horizontal</option>
            <option value="rectangle-vertical">Vertical</option>
            <option value="square">Square</option>
          </select>
        </label>

        <label>
          Garden Width (ft):
          <input
            type="number"
            name="gardenWidth"
            value={settings.gardenWidth}
            onChange={handleChange}
            className="ml-2 w-20"
          />
        </label>

        <label>
          Garden Height (ft):
          <input
            type="number"
            name="gardenHeight"
            value={settings.gardenHeight}
            onChange={handleChange}
            className="ml-2 w-20"
          />
        </label>

        <label>
          Zoom (%):
          <input
            type="range"
            name="zoom"
            min={0.5}
            max={2}
            step={0.1}
            value={settings.zoom}
            onChange={handleChange}
            className="ml-2"
          />
          <span className="ml-2">{Math.round(settings.zoom * 100)}%</span>
        </label>
      </div>
    </div>
  )
}