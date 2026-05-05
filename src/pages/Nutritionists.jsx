import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { nutritionistsApi } from '../services/api'
import styles from './ListPage.module.css'
import cardStyles from './Nutritionists.module.css'

export default function Nutritionists() {
  const [list, setList]       = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [deleting, setDeleting] = useState(null)

  const load = async () => {
    try {
      const { data } = await nutritionistsApi.getAll()
      setList(data)
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja excluir este nutricionista?')) return
    setDeleting(id)
    try {
      await nutritionistsApi.remove(id)
      setList((l) => l.filter((x) => x.id !== id))
    } finally {
      setDeleting(null)
    }
  }

  const filtered = list.filter(
    (n) =>
      n.especialidade?.toLowerCase().includes(search.toLowerCase()) ||
      n.crn?.toLowerCase().includes(search.toLowerCase()) ||
      n.user?.nome?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Nutricionistas</h1>
          <p className={styles.subtitle}>{list.length} profissionais cadastrados</p>
        </div>
        <Link to="/nutritionists/new" className={styles.btnNew}>
          + Novo nutricionista
        </Link>
      </div>

      <div className={styles.toolbar}>
        <input
          type="search"
          placeholder="Buscar por especialidade ou CRN..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <span>✦</span>
          <p>Nenhum nutricionista encontrado</p>
        </div>
      ) : (
        <div className={cardStyles.grid}>
          {filtered.map((n) => (
            <div key={n.id} className={cardStyles.card}>
              <div className={cardStyles.cardTop}>
                <div className={cardStyles.cardAvatar}>
                  {(n.user?.nome || 'N')[0].toUpperCase()}
                </div>
                <div>
                  <div className={cardStyles.cardName}>{n.user?.nome || `Nutricionista #${n.id}`}</div>
                  <div className={cardStyles.cardCrn}>CRN: {n.crn}</div>
                </div>
              </div>

              <div className={cardStyles.cardInfo}>
                <div className={cardStyles.infoRow}>
                  <span className={cardStyles.infoLabel}>Especialidade</span>
                  <span className={cardStyles.infoValue}>{n.especialidade}</span>
                </div>
                {n.valor_consulta && (
                  <div className={cardStyles.infoRow}>
                    <span className={cardStyles.infoLabel}>Consulta</span>
                    <span className={cardStyles.infoValue}>
                      {Number(n.valor_consulta).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                )}
                {n.endereco_atendimento && (
                  <div className={cardStyles.infoRow}>
                    <span className={cardStyles.infoLabel}>Endereço</span>
                    <span className={cardStyles.infoValue}>{n.endereco_atendimento}</span>
                  </div>
                )}
              </div>

              <div className={cardStyles.cardActions}>
                <Link
                  to={`/nutritionists/${n.id}/edit`}
                  className={styles.btnEdit}
                >
                  Editar
                </Link>
                <button
                  className={styles.btnDelete}
                  onClick={() => handleDelete(n.id)}
                  disabled={deleting === n.id}
                >
                  {deleting === n.id ? '...' : 'Excluir'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
