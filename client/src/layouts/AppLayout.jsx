import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'

function AppLayout({ children, title, subtitle }) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="page-shell">
        <div className="page-container">
          <Topbar title={title} subtitle={subtitle} />
          {children}
        </div>
      </main>
    </div>
  )
}

export default AppLayout