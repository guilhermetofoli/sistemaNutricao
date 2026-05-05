import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usersApi } from '../services/api'
import styles from './ListPage.module.css'

const ROLE_LABEL = { ADMIN: 'Admin', NUTRI: 'Nutricionista', PACIENTE: 'Paciente' }
const ROLE_COLOR = { ADMIN: 'green', NUTRI: 'blue', PACIENTE: 'gray' }

export default function Users() {
  const [users, setUsers]     = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [deleting, setDeleting] = useState(null)

  const load = async () => {
    try {
      const { data } = await usersApi.getAll()
      setUsers(data)
    } catch {
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja excluir este usuário?')) return
    setDeleting(id)
    try {
      await usersApi.remove(id)
      setUsers((u) => u.filter((x) => x.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  const filtered = users.filter(
    (u) =>
      u.nome?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Usuários</h1>
          <p className={styles.subtitle}>{users.length} cadastrados no sistema</p>
        </div>
        <Link to="/users/new" className={styles.btnNew}>
          + Novo usuário
        </Link>
      </div>

      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Buscar por nome ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <span>◉</span>
          <p>Nenhum usuário encontrado</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Tipo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td className={styles.idCell}>#{u.id}</td>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.avatar}>
                        {(u.nome || u.email || '?')[0].toUpperCase()}
                      </div>
                      {u.nome || '—'}
                    </div>
                  </td>
                  <td className={styles.emailCell}>{u.email}</td>
                  <td>
                    <span className={`${styles.badge} ${styles[ROLE_COLOR[u.tipo] || 'gray']}`}>
                      {ROLE_LABEL[u.tipo] || u.tipo}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/users/${u.id}/edit`} className={styles.btnEdit}>
                        Editar
                      </Link>
                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDelete(u.id)}
                        disabled={deleting === u.id}
                      >
                        {deleting === u.id ? '...' : 'Excluir'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
