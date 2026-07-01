import { useState } from 'react'
import AppLayout from '../layouts/AppLayout'
import { tickets as initialTickets } from '../data/tickets'

function Tickets() {
  const [tickets, setTickets] = useState(initialTickets)

  const [formData, setFormData] = useState({
    title: '',
    category: 'Scanner',
    priority: 'Medium',
    location: '',
    assignedTo: 'Unassigned',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const newTicket = {
      id: `TCK-${1001 + tickets.length}`,
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      status: 'Open',
      location: formData.location,
      assignedTo: formData.assignedTo,
    }

    setTickets([newTicket, ...tickets])

    setFormData({
      title: '',
      category: 'Scanner',
      priority: 'Medium',
      location: '',
      assignedTo: 'Unassigned',
    })
  }

  return (
    <AppLayout title="Tickets" subtitle="Manage warehouse IT support requests">
      <div className="ticket-layout">
        <div className="panel">
          <div className="page-header">
            <h3>Create Ticket</h3>
          </div>

          <form className="ticket-form" onSubmit={handleSubmit}>
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
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </label>

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

            <button type="submit">Create Ticket</button>
          </form>
        </div>

        <div className="panel">
          <div className="page-header">
            <h3>Support Tickets</h3>
          </div>

          <div className="data-table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Issue</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Assigned To</th>
                </tr>
              </thead>

              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.category}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.location}</td>
                    <td>{ticket.assignedTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Tickets