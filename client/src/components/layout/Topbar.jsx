function Topbar({ title, subtitle }) {
  return (
    <header className="topbar">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <button>New Ticket</button>
      </div>
    </header>
  )
}

export default Topbar