import { Bell, Search, UserCircle } from 'lucide-react'

function Topbar({ title, subtitle }) {
  const user = JSON.parse(localStorage.getItem('opsdeskUser'))

  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-right">
        <div className="search-box">
          <Search size={16} />
          <input placeholder="Search tickets, assets, users..." />
        </div>

        <button className="icon-button">
          <Bell size={18} />
        </button>

        <div className="user-chip">
          <UserCircle size={22} />
          <div>
            <strong>{user?.name || 'Demo User'}</strong>
            <span>{user?.role || 'IT Technician'}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar