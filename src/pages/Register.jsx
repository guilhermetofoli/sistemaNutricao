import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usersApi } from '../services/api'
import styles from './Auth.module.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', email: '', senha: '', tipo: 'PACIENTE' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await usersApi.create(form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar conta. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.leftContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>⊕</span>
            <span className={styles.logoText}>NutriSystem</span>
          </div>
          <h1 className={styles.headline}>
            Comece sua<br />jornada saudável
          </h1>
          <p className={styles.sub}>
            Crie sua conta e tenha acesso a nutricionistas qualificados, planos alimentares personalizados e acompanhamento contínuo.
          </p>
          <div className={styles.dots}>
            <span /><span /><span />
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Criar conta</h2>
          <p className={styles.cardSub}>Preencha seus dados abaixo</p>

          {error && <div className={styles.alert}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>Nome completo</label>
              <input
                type="text"
                name="nome"
                value={form.nome}
                onChange={handleChange}
                className={styles.input}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>E-mail</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Senha</label>
              <input
                type="password"
                name="senha"
                value={form.senha}
                onChange={handleChange}
                className={styles.input}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
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

            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className={styles.switch}>
            Já tem conta?{' '}
            <Link to="/login" className={styles.link}>
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
