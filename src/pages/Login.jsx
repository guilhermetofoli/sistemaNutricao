import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function Login() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form, setForm]     = useState({ email: '', senha: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.senha)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'E-mail ou senha inválidos.')
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
            Cuide da saúde<br />com inteligência
          </h1>
          <p className={styles.sub}>
            Plataforma completa para nutricionistas e pacientes. Gerencie consultas, planos alimentares e muito mais.
          </p>
          <div className={styles.dots}>
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Entrar na plataforma</h2>
          <p className={styles.cardSub}>Insira suas credenciais abaixo</p>

          {error && <div className={styles.alert}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
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
                autoComplete="email"
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
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className={styles.btn}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className={styles.switch}>
            Não tem conta?{' '}
            <Link to="/register" className={styles.link}>
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
