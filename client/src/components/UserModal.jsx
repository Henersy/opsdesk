import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

export default function UserModal({ open, onClose, onSave, initial }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'Technician', status: 'Active' })

  useEffect(() => {
    if (initial) setForm(initial)
    else setForm({ name: '', email: '', role: 'Technician', status: 'Active' })
  }, [initial])

  if (!open) return null

  function change(e) {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  function submit(e) {
    e.preventDefault()
    onSave(form)
  }

  function initials(name) {
    return (name || '')
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }

  return (
    <div className="modal-backdrop">
      <div className="modal modal-dark">
        <div className="modal-header">
          <div className="modal-title">
            <div className="avatar">{initial && initials(initial.name)}</div>
            <div>
              <h3>{initial ? 'Edit user' : 'New user'}</h3>
              <div className="muted">Manage employee accounts and roles</div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <form className="ticket-form" onSubmit={submit}>
          <label>
            <span className="label-text">Name</span>
            <input name="name" value={form.name} onChange={change} required />
          </label>

          <label>
            <span className="label-text">Email</span>
            <input name="email" type="email" value={form.email} onChange={change} required />
          </label>

          <div style={{ display: 'flex', gap: 8 }}>
            <label style={{ flex: 1 }}>
              <span className="label-text">Role</span>
              <select name="role" value={form.role} onChange={change}>
                <option>Technician</option>
                <option>Engineer</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </label>

            <label style={{ width: 140 }}>
              <span className="label-text">Status</span>
              <select name="status" value={form.status} onChange={change}>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
