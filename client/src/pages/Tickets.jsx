import { useEffect, useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import { getTickets, createTicket } from '../services/ticketService'
import { getPriorityClass, getStatusClass } from '../utils/badgeClass'
import { X } from 'lucide-react'

function Tickets() {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [showCreateDrawer, setShowCreateDrawer] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const [formData, setFormData] = useState({
    title: '',
    category: 'Scanner',
    priority: 'Medium',
    location: '',
    assignedTo: 'Unassigned',
    description: '',
    attachment: null,
  })

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTickets()
        setTickets(data)
      } catch (error) {
        console.error('Failed to load tickets:', error)
      }
    }

    loadTickets()
  }, [])

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleFileChange(event) {
    setFormData({ ...formData, attachment: event.target.files[0] || null })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const newTicket = await createTicket({
        title: formData.title,
        category: formData.category,
        priority: formData.priority,
        location: formData.location,
        assignedTo: formData.assignedTo,
        description: formData.description || 'New support request created from OpsDesk portal.',
      })

      setTickets([newTicket, ...tickets])
      setShowCreateDrawer(false)

      setFormData({
        title: '',
        category: 'Scanner',
        priority: 'Medium',
        location: '',
        assignedTo: 'Unassigned',
        description: '',
        attachment: null,
      })
    } catch (error) {
      console.error('Failed to create ticket:', error)
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <AppLayout title="Tickets" subtitle="Manage warehouse IT support requests">
      <div className="panel">
        <div className="page-header">
          <h3>Support Tickets</h3>
          <button onClick={() => setShowCreateDrawer(true)}>New Ticket</button>
        </div>

        <div className="ticket-toolbar">
          <input
            placeholder="Search by issue, category, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>
        </div>

        <div className="ticket-list">
          {filteredTickets.map((ticket) => (
            <button
              className="ticket-card"
              key={ticket.id}
              type="button"
              onClick={() => setSelectedTicket(ticket)}
            >
              <div>
                <div className="ticket-card-top">
                  <span>{ticket.id}</span>
                  <span className={getStatusClass(ticket.status)}>{ticket.status}</span>
                </div>

                <h4>{ticket.title}</h4>

                <p>
                  {ticket.location} • {ticket.category} • Assigned to {ticket.assignedTo}
                </p>
              </div>

              <span className={getPriorityClass(ticket.priority)}>{ticket.priority}</span>
            </button>
          ))}
        </div>
      </div>

      {showCreateDrawer && (
        <div className="drawer-overlay" onClick={() => setShowCreateDrawer(false)}>
          <aside className="ticket-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <span className="drawer-id">New Request</span>
                <h2>Create Ticket</h2>
              </div>

              <button className="icon-button" onClick={() => setShowCreateDrawer(false)}>
                <X size={18} />
              </button>
            </div>

            <form className="ticket-form drawer-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h5 className="form-section-title">General</h5>

                <label>
                  Issue Title
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Example: Zebra scanner not connecting"
                    required
                  />
                </label>

                <label>
                  Category
                  <select name="category" value={formData.category} onChange={handleChange}>
                    <option>Scanner</option>
                    <option>Printer</option>
                    <option>Network</option>
                    <option>Computer</option>
                    <option>Software</option>
                    <option>Password</option>
                    <option>WMS</option>
                  </select>
                </label>

                <label>
                  Priority
                  <select name="priority" value={formData.priority} onChange={handleChange}>
                    <option value="Low">🟢 Low</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="High">🟠 High</option>
                    <option value="Critical">🔴 Critical</option>
                  </select>
                </label>
              </div>

              <div className="form-section">
                <h5 className="form-section-title">Assignment</h5>

                <label>
                  Location
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Example: Dock 12"
                    required
                  />
                </label>

                <label>
                  Assigned To
                  <select name="assignedTo" value={formData.assignedTo} onChange={handleChange}>
                    <option>Unassigned</option>
                    <option>Henri Ortiz</option>
                    <option>IT Support</option>
                    <option>Network Team</option>
                  </select>
                </label>
              </div>

              <div className="form-section">
                <h5 className="form-section-title">Description</h5>

                <label>
                  Details
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue, when it started, and any steps already taken..."
                    rows={5}
                  />
                </label>
              </div>

              <div className="form-section">
                <h5 className="form-section-title">Attachments</h5>

                <label>
                  Upload File
                  <input type="file" name="attachment" onChange={handleFileChange} />
                </label>
                {formData.attachment && (
                  <p className="form-file-name">{formData.attachment.name}</p>
                )}
              </div>

              <div className="drawer-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateDrawer(false)}>
                  Cancel
                </button>
                <button type="submit">Create Ticket</button>
              </div>
            </form>
          </aside>
        </div>
      )}

      {selectedTicket && (
        <div className="drawer-overlay" onClick={() => setSelectedTicket(null)}>
          <aside className="ticket-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div>
                <span className="drawer-id">{selectedTicket.id}</span>
                <h2>{selectedTicket.title}</h2>
              </div>

              <button className="icon-button" onClick={() => setSelectedTicket(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="drawer-badges">
              <span className={getStatusClass(selectedTicket.status)}>{selectedTicket.status}</span>
              <span className={getPriorityClass(selectedTicket.priority)}>
                {selectedTicket.priority}
              </span>
            </div>

            <div className="drawer-section">
              <h4>Ticket Details</h4>
              <p><strong>Category:</strong> {selectedTicket.category}</p>
              <p><strong>Location:</strong> {selectedTicket.location}</p>
              <p><strong>Assigned To:</strong> {selectedTicket.assignedTo}</p>
              <p><strong>Description:</strong> {selectedTicket.description || 'Warehouse IT support issue requiring review.'}</p>
            </div>

            <div className="drawer-section">
              <h4>Activity Timeline</h4>
              <div className="timeline">
                <div><span></span><p>Ticket created by warehouse user</p></div>
                <div><span></span><p>Priority set to {selectedTicket.priority}</p></div>
                <div><span></span><p>Assigned to {selectedTicket.assignedTo}</p></div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </AppLayout>
  )
}

export default Tickets