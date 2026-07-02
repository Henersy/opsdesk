import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  Laptop,
  Users,
  BookOpen,
  Settings,
  Menu,
} from 'lucide-react'

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
        <Menu size={20} />
      </button>

      <div className="brand">
        <h1>OpsDesk</h1>
        <p>Enterprise IT Portal</p>
      </div>

      <nav>
        <NavLink to="/dashboard">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/tickets">
          <Ticket size={18} />
          <span>Tickets</span>
        </NavLink>

        <NavLink to="/assets">
          <Laptop size={18} />
          <span>Assets</span>
        </NavLink>

        <NavLink to="/users">
          <Users size={18} />
          <span>Users</span>
        </NavLink>

        <NavLink to="/knowledge-base">
          <BookOpen size={18} />
          <span>Knowledge Base</span>
        </NavLink>

        <NavLink to="/settings">
          <Settings size={18} />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar