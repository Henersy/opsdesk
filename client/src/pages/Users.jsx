import { useState, useMemo } from 'react'
import AppLayout from '../layouts/AppLayout'
import usersSeed from '../data/users'
import UsersTable from '../components/UsersTable'
import UserModal from '../components/UserModal'
import '../pages/Users.css'

function Users() {
  const [users, setUsers] = useState(usersSeed)
  const [query, setQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const roles = useMemo(() => ['All', ...Array.from(new Set(users.map((u) => u.role)))], [users])

  function filtered() {
    return users.filter((u) => {
      const q = query.toLowerCase()
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      const matchRole = roleFilter === 'All' || u.role === roleFilter
      return matchQ && matchRole
    })
  }

  function openNew() {
    setEditing(null)
    setModalOpen(true)
  }

  function handleEdit(user) {
    setEditing(user)
    setModalOpen(true)
  }

  function handleDelete(user) {
    if (!window.confirm(`Delete ${user.name}?`)) return
    setUsers((s) => s.filter((x) => x.id !== user.id))
  }

  function handleSave(user) {
    if (user.id) {
      setUsers((s) => s.map((x) => (x.id === user.id ? user : x)))
    } else {
      const nextId = Math.max(0, ...users.map((u) => u.id)) + 1
      setUsers((s) => [...s, { ...user, id: nextId }])
    }
    setModalOpen(false)
  }

  return (
    <AppLayout title="Users" subtitle="Manage employees, technicians, and access roles">
      <div className="users-page panel">
        <div className="users-toolbar">
          <div className="search">
            <input placeholder="Search by name or email" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>
          <div className="filters">
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <button className="btn primary" onClick={openNew}>
              New user
            </button>
          </div>
        </div>

        <UsersTable users={filtered()} onEdit={handleEdit} onDelete={handleDelete} />

        <UserModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} initial={editing} />
      </div>
    </AppLayout>
  )
}

export default Users