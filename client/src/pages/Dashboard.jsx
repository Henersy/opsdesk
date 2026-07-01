import AppLayout from '../layouts/AppLayout'

function Dashboard() {
  return (
    <AppLayout
      title="IT Operations Dashboard"
      subtitle="Warehouse technology support overview"
    >
      <section className="stats">
        <div className="card">
          <p>Open Tickets</p>
          <h3>24</h3>
        </div>
        <div className="card">
          <p>Critical Issues</p>
          <h3>3</h3>
        </div>
        <div className="card">
          <p>Assets Tracked</p>
          <h3>148</h3>
        </div>
        <div className="card">
          <p>Devices in Repair</p>
          <h3>7</h3>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <h3>Recent IT Tickets</h3>
          <ul>
            <li>Zebra scanner not connecting — Shipping</li>
            <li>Label printer offline — Dock 12</li>
            <li>WMS login failed — Receiving</li>
            <li>Laptop setup needed — Office</li>
          </ul>
        </div>

        <div className="panel">
          <h3>Asset Status</h3>
          <ul>
            <li>Dell Latitude 5540 — Active</li>
            <li>Zebra TC57 — Repair</li>
            <li>HP Label Printer — Active</li>
            <li>Cisco Access Point — Online</li>
          </ul>
        </div>
      </section>
    </AppLayout>
  )
}

export default Dashboard