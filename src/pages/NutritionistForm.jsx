import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { nutritionistsApi, usersApi } from '../services/api'
import styles from './FormPage.module.css'

export default function NutritionistForm() {
  const { id } = useParams()
  const isEdit  = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    crn: '',
    especialidade: '',
    valor_consulta: '',
    endereco_atendimento: '',
    userId: '',
  })
  const [users, setUsers]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    const init = async () => {
      try {
        const { data: u } = await usersApi.getAll()
        setUsers(u.filter((x) => x.tipo === 'NUTRI'))

        if (isEdit) {
          const { data: n } = await nutritionistsApi.getOne(id)
          setForm({
            crn: n.crn || '',
            especialidade: n.especialidade || '',
            valor_consulta: n.valor_consulta || '',
            endereco_atendimento: n.endereco_atendimento || '',
            userId: n.userId || '',
          })
        }
      } catch {
        setError('Erro ao carregar dados.')
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [id, isEdit])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = {
        ...form,
        userId: Number(form.userId),
        valor_consulta: form.valor_consulta ? Number(form.valor_consulta) : null,
      }
      if (isEdit) await nutritionistsApi.update(id, payload)
      else        await nutritionistsApi.create(payload)
      navigate('/nutritionists')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className={styles.loading}>Carregando...</div>

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/nutritionists">Nutricionistas</Link>
        <span>›</span>
        <span>{isEdit ? 'Editar nutricionista' : 'Novo nutricionista'}</span>
      </div>

      <h1 className={styles.title}>
        {isEdit ? 'Editar nutricionista' : 'Novo nutricionista'}
      </h1>
      <p className={styles.subtitle}>
        {isEdit
          ? 'Atualize os dados do profissional abaixo'
          : 'Preencha os dados para cadastrar um nutricionista'}
      </p>

      {error && <div className={styles.alert}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Vínculo com usuário</h2>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Usuário (tipo NUTRI)</label>
              <select
                name="userId"
                value={form.userId}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Selecione um usuário...</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome} — {u.email}
                  </option>
                ))}
              </select>
              {users.length === 0 && (
                <span className={styles.hint}>
                  Nenhum usuário com tipo NUTRI encontrado. <Link to="/users/new">Criar usuário</Link>
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Dados profissionais</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>CRN</label>
              <input
                type="text"
                name="crn"
                value={form.crn}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: CRN-3 12345"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Especialidade</label>
              <input
                type="text"
                name="especialidade"
                value={form.especialidade}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: Nutrição Esportiva"
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Valor da consulta (R$)</label>
              <input
                type="number"
                name="valor_consulta"
                value={form.valor_consulta}
                onChange={handleChange}
                className={styles.input}
                placeholder="Ex: 200.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Endereço de atendimento</label>
              <input
                type="text"
                name="endereco_atendimento"
                value={form.endereco_atendimento}
                onChange={handleChange}
                className={styles.input}
                placeholder="Rua, número, bairro..."
              />
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          <Link to="/nutritionists" className={styles.btnCancel}>
            Cancelar
          </Link>
          <button type="submit" className={styles.btnSave} disabled={saving}>
            {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  )
}
