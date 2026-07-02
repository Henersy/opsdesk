import AppLayout from '../layouts/AppLayout'
import { assets } from '../data/assets'

function Assets() {
  return (
    <AppLayout title="Assets" subtitle="Track warehouse IT equipment and devices">
      <div className="panel">
        <div className="page-header">
          <h3>Asset Inventory</h3>
          <button>Add Asset</button>
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
    </AppLayout>
  )
}

export default Assets