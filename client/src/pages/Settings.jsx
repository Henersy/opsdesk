import { useState } from 'react'
import AppLayout from '../layouts/AppLayout'

const initialCategories = [
  {
    id: 1,
    name: 'Scanner',
    priority: 'High',
    active: true,
    description: 'Hardware issue for barcode scanners',
  },
  {
    id: 2,
    name: 'Printer',
    priority: 'Critical',
    active: true,
    description: 'Printer and label output issues',
  },
  {
    id: 3,
    name: 'Network',
    priority: 'Medium',
    active: true,
    description: 'Wi-Fi and connectivity support',
  },
]

const initialAdmins = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@opsdesk.com',
    role: 'Administrator',
    active: true,
  },
  {
    id: 2,
    name: 'Henri Ortiz',
    email: 'technician@opsdesk.com',
    role: 'IT Technician',
    active: true,
  },
]

function Settings() {
  const [systemSettings, setSystemSettings] = useState({
    timezone: 'UTC-05:00 EST',
    defaultPriority: 'Medium',
    slaHours: 24,
    businessHours: '9:00 AM - 5:00 PM',
  })

  const [notificationPreferences, setNotificationPreferences] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushAlerts: true,
    assignmentUpdates: true,
    dailySummaries: false,
  })

  const [ticketCategories, setTicketCategories] = useState(initialCategories)
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    priority: 'Medium',
    description: '',
  })

  const [adminConfigs, setAdminConfigs] = useState(initialAdmins)
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    role: 'Administrator',
  })

  function updateSystemSetting(event) {
    const { name, value } = event.target
    setSystemSettings((prev) => ({ ...prev, [name]: value }))
  }

  function updateNotificationPreference(event) {
    const { name, checked } = event.target
    setNotificationPreferences((prev) => ({ ...prev, [name]: checked }))
  }

  function updateCategoryForm(event) {
    const { name, value } = event.target
    setCategoryForm((prev) => ({ ...prev, [name]: value }))
  }

  function addCategory(event) {
    event.preventDefault()
    if (!categoryForm.name.trim()) return

    setTicketCategories((prev) => [
      {
        id: prev.length + 1,
        name: categoryForm.name.trim(),
        priority: categoryForm.priority,
        active: true,
        description: categoryForm.description.trim(),
      },
      ...prev,
    ])

    setCategoryForm({ name: '', priority: 'Medium', description: '' })
  }

  function toggleCategoryActive(id) {
    setTicketCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, active: !category.active } : category,
      ),
    )
  }

  function updateAdminConfig(id, field, value) {
    setAdminConfigs((prev) =>
      prev.map((admin) => (admin.id === id ? { ...admin, [field]: value } : admin)),
    )
  }

  function addAdmin(event) {
    event.preventDefault()
    if (!newAdmin.name.trim() || !newAdmin.email.trim()) return

    setAdminConfigs((prev) => [
      {
        id: prev.length + 1,
        name: newAdmin.name.trim(),
        email: newAdmin.email.trim(),
        role: newAdmin.role,
        active: true,
      },
      ...prev,
    ])

    setNewAdmin({ name: '', email: '', role: 'Administrator' })
  }

  function updateNewAdmin(event) {
    const { name, value } = event.target
    setNewAdmin((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <AppLayout title="Settings" subtitle="Configure portal preferences and system options">
      <div className="settings-grid">
        <section className="panel">
          <div className="page-header">
            <div>
              <h3>System Settings</h3>
              <p>General configuration for ticket behavior and service levels.</p>
            </div>
          </div>

          <form className="settings-form">
            <div className="form-row">
              <label>
                Default Timezone
                <select
                  name="timezone"
                  value={systemSettings.timezone}
                  onChange={updateSystemSetting}
                >
                  <option>UTC-08:00 PST</option>
                  <option>UTC-06:00 CST</option>
                  <option>UTC-05:00 EST</option>
                  <option>UTC+00:00 GMT</option>
                </select>
              </label>

              <label>
                Default Ticket Priority
                <select
                  name="defaultPriority"
                  value={systemSettings.defaultPriority}
                  onChange={updateSystemSetting}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </label>
            </div>

            <div className="form-row">
              <label>
                SLA Response Window
                <input
                  name="slaHours"
                  type="number"
                  min="1"
                  value={systemSettings.slaHours}
                  onChange={updateSystemSetting}
                />
              </label>

              <label>
                Business Hours
                <input
                  name="businessHours"
                  value={systemSettings.businessHours}
                  onChange={updateSystemSetting}
                />
              </label>
            </div>

            <button type="button">Save System Settings</button>
          </form>
        </section>

        <section className="panel">
          <div className="page-header">
            <div>
              <h3>Notification Preferences</h3>
              <p>Control how the OpsDesk portal sends alerts and reports.</p>
            </div>
          </div>

          <div className="notification-list">
            {[
              { name: 'emailAlerts', label: 'Email Alerts' },
              { name: 'smsAlerts', label: 'SMS Alerts' },
              { name: 'pushAlerts', label: 'Push Notifications' },
              { name: 'assignmentUpdates', label: 'Ticket Assignment Updates' },
              { name: 'dailySummaries', label: 'Daily Summary Reports' },
            ].map((item) => (
              <label className="switch-row" key={item.name}>
                <span>{item.label}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={notificationPreferences[item.name]}
                    onChange={updateNotificationPreference}
                  />
                  <span className="switch-slider" />
                </label>
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="panel">
        <div className="page-header">
          <div>
            <h3>Ticket Categories</h3>
            <p>Manage categories that appear when creating or editing support requests.</p>
          </div>
          <button onClick={addCategory}>Add Category</button>
        </div>

        <div className="data-table-wrapper">
          <table className="data-table settings-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ticketCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{category.priority}</td>
                  <td>
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={category.active}
                        onChange={() => toggleCategoryActive(category.id)}
                      />
                      <span className="switch-slider" />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form className="settings-form settings-grid form-card" onSubmit={addCategory}>
          <div className="form-row">
            <label>
              Category Name
              <input
                name="name"
                value={categoryForm.name}
                onChange={updateCategoryForm}
                placeholder="Example: Software"
              />
            </label>

            <label>
              Default Priority
              <select
                name="priority"
                value={categoryForm.priority}
                onChange={updateCategoryForm}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </label>
          </div>

          <label>
            Category Description
            <textarea
              name="description"
              value={categoryForm.description}
              onChange={updateCategoryForm}
              rows={3}
              placeholder="Describe when this category should be used."
            />
          </label>

          <button type="submit">Save Category</button>
        </form>
      </div>

      <div className="panel admin-grid">
        <div className="panel-card">
          <div className="page-header">
            <div>
              <h3>Admin Configurations</h3>
              <p>Manage admin accounts, roles, and access status.</p>
            </div>
          </div>

          <div className="data-table-wrapper">
            <table className="data-table settings-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {adminConfigs.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <select
                        value={admin.role}
                        onChange={(event) => updateAdminConfig(admin.id, 'role', event.target.value)}
                      >
                        <option>Administrator</option>
                        <option>IT Technician</option>
                        <option>Support Agent</option>
                      </select>
                    </td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={admin.active}
                          onChange={(event) => updateAdminConfig(admin.id, 'active', event.target.checked)}
                        />
                        <span className="switch-slider" />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel-card">
          <div className="page-header">
            <div>
              <h3>Add Admin</h3>
              <p>Create additional administrators and support staff.</p>
            </div>
          </div>

          <form className="settings-form" onSubmit={addAdmin}>
            <label>
              Full Name
              <input
                name="name"
                value={newAdmin.name}
                onChange={updateNewAdmin}
                placeholder="Example: Jamie Park"
              />
            </label>
            <label>
              Email Address
              <input
                name="email"
                type="email"
                value={newAdmin.email}
                onChange={updateNewAdmin}
                placeholder="example@opsdesk.com"
              />
            </label>
            <label>
              Role
              <select name="role" value={newAdmin.role} onChange={updateNewAdmin}>
                <option>Administrator</option>
                <option>IT Technician</option>
                <option>Support Agent</option>
              </select>
            </label>

            <button type="submit">Add Admin</button>
          </form>
        </div>
      </div>
    </AppLayout>
  )
}

export default Settings