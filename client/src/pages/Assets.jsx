import { useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import { assets as initialAssets } from '../data/assets'

function Assets() {
  const [assets, setAssets] = useState(initialAssets)
  const [showCreateDrawer, setShowCreateDrawer] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'Laptop',
    status: 'Active',
    assignedTo: '',
    location: '',
    serialNumber: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!formData.name.trim() || !formData.serialNumber.trim()) return

    const nextIdNumber = assets.length
      ? Math.max(...assets.map((asset) => Number(asset.id.replace('AST-', '')))) + 1
      : 1001

    const newAsset = {
      id: `AST-${nextIdNumber}`,
      name: formData.name.trim(),
      type: formData.type,
      status: formData.status,
      assignedTo: formData.assignedTo.trim() || 'Unassigned',
      location: formData.location.trim() || 'Unassigned',
      serialNumber: formData.serialNumber.trim(),
    }

    setAssets([newAsset, ...assets])
    setShowCreateDrawer(false)
    setFormData({ name: '', type: 'Laptop', status: 'Active', assignedTo: '', location: '', serialNumber: '' })
  }

  return (
    <AppLayout title="Assets" subtitle="Track warehouse IT equipment and devices">
      <div className="panel">
        <div className="page-header">
          <h3>Asset Inventory</h3>
          <button onClick={() => setShowCreateDrawer(true)}>Add Asset</button>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Location</th>
                <th>Serial Number</th>
              </tr>
            </thead>

            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td>{asset.status}</td>
                  <td>{asset.assignedTo}</td>
                  <td>{asset.location}</td>
                  <td>{asset.serialNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showCreateDrawer && (
        <div className="drawer-overlay" onClick={() => setShowCreateDrawer(false)}>
          <aside className="ticket-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <span className="drawer-id">New Asset</span>
                <h2>Add Asset</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setShowCreateDrawer(false)}>
                ×
              </button>
            </div>

            <form className="ticket-form drawer-form" onSubmit={handleSubmit}>
              <label>
                Asset Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Zebra TC57 Scanner"
                  required
                />
              </label>

              <label>
                Type
                <select name="type" value={formData.type} onChange={handleChange}>
                  <option>Laptop</option>
                  <option>Scanner</option>
                  <option>Printer</option>
                  <option>Router</option>
                  <option>Server</option>
                  <option>Software</option>
                </select>
              </label>

              <label>
                Status
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option>Active</option>
                  <option>Repair</option>
                  <option>Decommissioned</option>
                  <option>Reserved</option>
                </select>
              </label>

              <label>
                Assigned To
                <input
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  placeholder="Assigned person or team"
                />
              </label>

              <label>
                Location
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Warehouse, Dock, Office"
                />
              </label>

              <label>
                Serial Number
                <input
                  name="serialNumber"
                  value={formData.serialNumber}
                  onChange={handleChange}
                  placeholder="ZTC57-88321"
                  required
                />
              </label>

              <div className="drawer-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateDrawer(false)}>
                  Cancel
                </button>
                <button type="submit">Add Asset</button>
              </div>
            </form>
          </aside>
        </div>
      )}
    </AppLayout>
  )
}

export default Assets