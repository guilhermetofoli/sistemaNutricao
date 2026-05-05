import React, { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Layout.module.css'

const NAV_ITEMS = [
  { to: '/',             label: 'Dashboard',      icon: '◈' },
  { to: '/users',        label: 'Usuários',        icon: '◉' },
  { to: '/nutritionists',label: 'Nutricionistas',  icon: '✦' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.shell}>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
        <div className={styles.brand}>
          <span className={styles.brandIcon}>⊕</span>
          <span className={styles.brandName}>NutriSystem</span>
        </div>

        <nav className={styles.nav}>
          {NAV_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.active : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <span className={styles.navIcon}>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.userArea}>
          <div className={styles.avatar}>
            {(user?.nome || user?.email || 'U')[0].toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user?.nome || 'Usuário'}</span>
            <span className={styles.userRole}>{user?.tipo || 'ADMIN'}</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Sair">
            ⎋
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            className={styles.menuBtn}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <div className={styles.topbarRight}>
            <span className={styles.greeting}>
              Olá, <strong>{user?.nome || 'Usuário'}</strong>
            </span>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
