import React from 'react'
import { Edit2, Trash2 } from 'lucide-react'
import { getStatusClass } from '../utils/badgeClass'

export default function UsersTable({ users, onEdit, onDelete }) {
  return (
    <table className="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 && (
          <tr>
            <td colSpan="5" className="empty">No users found</td>
          </tr>
        )}
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              <span className={getStatusClass(u.status)}>{u.status}</span>
            </td>
            <td>
              <button className="icon-btn" onClick={() => onEdit(u)} title="Edit">
                <Edit2 size={16} />
              </button>
              <button className="icon-btn danger" onClick={() => onDelete(u)} title="Delete">
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
