import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usersApi, nutritionistsApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const { user } = useAuth()
  const [counts, setCounts] = useState({ users: 0, nutritionists: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [u, n] = await Promise.all([
          usersApi.getAll(),
          nutritionistsApi.getAll(),
        ])
        setCounts({
          users: u.data?.length ?? 0,
          nutritionists: n.data?.length ?? 0,
        })
      } catch {
        // API pode estar offline, apenas mostra zeros
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>
            {greeting}, <span>{user?.nome || 'Administrador'}</span> 👋
          </h1>
          <p className={styles.subtitle}>
            Veja um resumo da sua plataforma de nutrição
          </p>
        </div>
        <div className={styles.date}>
          {new Date().toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
      </div>

      {/* Stats */}
      <div className={styles.stats}>
        <div className={`${styles.stat} ${styles.statGreen}`}>
          <div className={styles.statIcon}>◉</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>
              {loading ? '—' : counts.users}
            </span>
            <span className={styles.statLabel}>Usuários cadastrados</span>
          </div>
        </div>

        <div className={`${styles.stat} ${styles.statEarth}`}>
          <div className={styles.statIcon}>✦</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>
              {loading ? '—' : counts.nutritionists}
            </span>
            <span className={styles.statLabel}>Nutricionistas</span>
          </div>
        </div>

        <div className={`${styles.stat} ${styles.statCream}`}>
          <div className={styles.statIcon}>◈</div>
          <div className={styles.statInfo}>
            <span className={styles.statNum}>
              {loading ? '—' : counts.users - counts.nutritionists}
            </span>
            <span className={styles.statLabel}>Pacientes ativos</span>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <h2 className={styles.sectionTitle}>Acesso rápido</h2>
      <div className={styles.actions}>
        <Link to="/users/new" className={styles.action}>
          <div className={styles.actionIcon}>+</div>
          <div>
            <div className={styles.actionTitle}>Novo Usuário</div>
            <div className={styles.actionDesc}>Cadastrar paciente ou admin</div>
          </div>
        </Link>

        <Link to="/nutritionists/new" className={styles.action}>
          <div className={styles.actionIcon}>✦</div>
          <div>
            <div className={styles.actionTitle}>Novo Nutricionista</div>
            <div className={styles.actionDesc}>Cadastrar perfil profissional</div>
          </div>
        </Link>

        <Link to="/users" className={styles.action}>
          <div className={styles.actionIcon}>◉</div>
          <div>
            <div className={styles.actionTitle}>Ver Usuários</div>
            <div className={styles.actionDesc}>Gerenciar todos os usuários</div>
          </div>
        </Link>

        <Link to="/nutritionists" className={styles.action}>
          <div className={styles.actionIcon}>◈</div>
          <div>
            <div className={styles.actionTitle}>Ver Nutricionistas</div>
            <div className={styles.actionDesc}>Gerenciar profissionais</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
