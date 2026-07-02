import React, { useState, useEffect } from 'react'

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

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{initial ? 'Edit User' : 'New User'}</h3>
        <form onSubmit={submit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={change} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={change} required />
          </label>
          <label>
            Role
            <select name="role" value={form.role} onChange={change}>
              <option>Technician</option>
              <option>Engineer</option>
              <option>Manager</option>
              <option>Admin</option>
            </select>
          </label>
          <label>
            Status
            <select name="status" value={form.status} onChange={change}>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
