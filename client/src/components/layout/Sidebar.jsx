import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  Laptop,
  Users,
  BookOpen,
  Settings,
} from 'lucide-react'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h1>OpsDesk</h1>
        <p>Enterprise IT Portal</p>
      </div>

      <nav>
        <NavLink to="/dashboard">
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/tickets">
          <Ticket size={18} />
          Tickets
        </NavLink>

        <NavLink to="/assets">
          <Laptop size={18} />
          Assets
        </NavLink>

        <NavLink to="/users">
          <Users size={18} />
          Users
        </NavLink>

        <NavLink to="/knowledge-base">
          <BookOpen size={18} />
          Knowledge Base
        </NavLink>

        <NavLink to="/settings">
          <Settings size={18} />
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar