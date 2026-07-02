import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import Assets from './pages/Assets'
import Users from './pages/Users'
import KnowledgeBase from './pages/KnowledgeBase'
import Settings from './pages/Settings'
import Login from './pages/Login'
import './App.css'

function App() {
  const isLoggedIn = localStorage.getItem('opsdeskUser')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/dashboard' : '/login'} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/tickets" element={isLoggedIn ? <Tickets /> : <Navigate to="/login" />} />
        <Route path="/assets" element={isLoggedIn ? <Assets /> : <Navigate to="/login" />} />
        <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} />
        <Route path="/knowledge-base" element={isLoggedIn ? <KnowledgeBase /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isLoggedIn ? <Settings /> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App