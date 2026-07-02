import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const demoUsers = [
  {
    name: 'Henri Ortiz',
    email: 'technician@opsdesk.com',
    role: 'IT Technician',
  },
  {
    name: 'Admin User',
    email: 'admin@opsdesk.com',
    role: 'Administrator',
  },
  {
    name: 'Warehouse Employee',
    email: 'employee@opsdesk.com',
    role: 'Warehouse Employee',
  },
]

function Login() {
  const navigate = useNavigate()
  const [selectedUser, setSelectedUser] = useState(demoUsers[0])

  function handleLogin(event) {
    event.preventDefault()
    localStorage.setItem('opsdeskUser', JSON.stringify(selectedUser))
    navigate('/dashboard')
    window.location.reload()
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>OpsDesk</h1>
        <p>Enterprise IT Portal</p>

        <form onSubmit={handleLogin} className="login-form">
          <label>
            Demo Account
            <select
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser(demoUsers.find((user) => user.email === e.target.value))
              }
            >
              {demoUsers.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.role} — {user.email}
                </option>
              ))}
            </select>
          </label>

          <label>
            Password
            <input type="password" value="password123" readOnly />
          </label>

          <button type="submit">Sign In</button>
        </form>

        <div className="login-note">
          Demo role: <strong>{selectedUser.role}</strong>
        </div>
      </div>
    </div>
  )
}

export default Login