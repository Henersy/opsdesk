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
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div className="modal modal-dark" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <div className={`avatar ${initial ? 'avatar-filled' : ''}`}>{initial ? initials(initial.name) : '+'}</div>
            <div>
              <h3>{initial ? 'Edit user' : 'Add new user'}</h3>
              <div className="muted">{initial ? 'Update profile details and access level' : 'Create a new account and assign a role'}</div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div className="profile-card">
            <div>
              <p className="profile-eyebrow">Account preview</p>
              <h4>{form.name || 'New employee'}</h4>
              <p className="profile-copy">{form.email || 'Add an email to continue'}</p>
            </div>
            <div className="profile-badges">
              <span className="pill pill-blue">{form.role}</span>
              <span className={`pill ${form.status === 'Active' ? 'pill-green' : form.status === 'Pending' ? 'pill-amber' : 'pill-red'}`}>
                {form.status}
              </span>
            </div>
          </div>

          <form className="ticket-form" onSubmit={submit}>
            <div className="form-grid">
              <label className="field-group full">
                <span className="label-text">Full name</span>
                <input name="name" value={form.name} onChange={change} required placeholder="Enter full name" />
              </label>

              <label className="field-group full">
                <span className="label-text">Email address</span>
                <input name="email" type="email" value={form.email} onChange={change} required placeholder="name@company.com" />
              </label>

              <label className="field-group">
                <span className="label-text">Role</span>
                <select name="role" value={form.role} onChange={change}>
                  <option>Technician</option>
                  <option>Engineer</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </label>

              <label className="field-group">
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
                {initial ? 'Save changes' : 'Create user'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
