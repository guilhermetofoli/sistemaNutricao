import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { usersApi } from '../services/api'
import styles from './FormPage.module.css'

export default function UserForm() {
  const { id } = useParams()
  const isEdit  = Boolean(id)
  const navigate = useNavigate()

  const [form, setForm] = useState({ nome: '', email: '', senha: '', tipo: 'PACIENTE' })
  const [loading, setLoading]   = useState(isEdit)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  useEffect(() => {
    if (!isEdit) return
    usersApi.getOne(id)
      .then(({ data }) => {
        setForm({ nome: data.nome || '', email: data.email || '', senha: '', tipo: data.tipo || 'PACIENTE' })
      })
      .catch(() => setError('Usuário não encontrado.'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const payload = { ...form }
      if (isEdit && !payload.senha) delete payload.senha
      if (isEdit) await usersApi.update(id, payload)
      else        await usersApi.create(payload)
      navigate('/users')
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
        <Link to="/users">Usuários</Link>
        <span>›</span>
        <span>{isEdit ? 'Editar usuário' : 'Novo usuário'}</span>
      </div>

      <h1 className={styles.title}>
        {isEdit ? 'Editar usuário' : 'Novo usuário'}
      </h1>
      <p className={styles.subtitle}>
        {isEdit ? 'Atualize os dados do usuário abaixo' : 'Preencha os dados para cadastrar um novo usuário'}
      </p>

      {error && <div className={styles.alert}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Dados pessoais</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Nome completo</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className={styles.input}
                placeholder="Nome do usuário"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tipo de conta</label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="PACIENTE">Paciente</option>
                <option value="NUTRI">Nutricionista</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="email@exemplo.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>
                Senha {isEdit && <span className={styles.optional}>(deixe em branco para manter)</span>}
              </label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                className={styles.input}
                placeholder={isEdit ? '••••••••' : 'Mínimo 6 caracteres'}
                required={!isEdit}
                minLength={isEdit ? 0 : 6}
              />
            </div>
          </div>
        </div>

        <div className={styles.formFooter}>
          <Link to="/users" className={styles.btnCancel}>
            Cancelar
          </Link>
          <button type="submit" className={styles.btnSave} disabled={saving}>
            {saving ? 'Salvando...' : isEdit ? 'Salvar alterações' : 'Criar usuário'}
          </button>
        </div>
      </form>
    </div>
  )
}
