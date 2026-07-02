import AppLayout from '../layouts/AppLayout'
import { Activity, AlertTriangle, Laptop, TicketCheck } from 'lucide-react'

function Dashboard() {
  return (
    <AppLayout
      title="Welcome back, Henri"
      subtitle="Enterprise warehouse IT operations overview"
    >
      <section className="stats">
        <div className="metric-card">
          <TicketCheck size={24} />
          <p>Open Tickets</p>
          <h3>24</h3>
          <span>+6 today</span>
        </div>

        <div className="metric-card">
          <AlertTriangle size={24} />
          <p>Critical Issues</p>
          <h3>3</h3>
          <span>Requires attention</span>
        </div>

        <div className="metric-card">
          <Laptop size={24} />
          <p>Assets Tracked</p>
          <h3>148</h3>
          <span>12 locations</span>
        </div>

        <div className="metric-card">
          <Activity size={24} />
          <p>System Uptime</p>
          <h3>99.8%</h3>
          <span>Last 30 days</span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel large-panel">
          <h3>Ticket Trends</h3>
          <div className="fake-chart">
            <div style={{ height: '40%' }}></div>
            <div style={{ height: '65%' }}></div>
            <div style={{ height: '50%' }}></div>
            <div style={{ height: '80%' }}></div>
            <div style={{ height: '55%' }}></div>
            <div style={{ height: '90%' }}></div>
            <div style={{ height: '70%' }}></div>
          </div>
        </div>

        <div className="panel">
          <h3>Device Health</h3>
          <div className="health-list">
            <p><span className="dot green"></span> 126 Online</p>
            <p><span className="dot yellow"></span> 15 Needs Updates</p>
            <p><span className="dot red"></span> 7 In Repair</p>
          </div>
        </div>

        <div className="panel">
          <h3>Recent Incidents</h3>
          <div className="activity-list">
            <p>Label printer offline — Dock 12</p>
            <p>Zebra scanner battery failure — Shipping</p>
            <p>WMS login issue — Receiving</p>
          </div>
        </div>
      </section>
    </AppLayout>
  )
}

export default Dashboard