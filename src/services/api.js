import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nutri_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Redirect to login on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('nutri_token')
      localStorage.removeItem('nutri_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

// ── Auth ───────────────────────────────────────────────
export const authApi = {
  login: (email, senha) => api.post('/auth/login', { email, senha }),
}

// ── Users ──────────────────────────────────────────────
export const usersApi = {
  getAll:    ()           => api.get('/users'),
  getOne:    (id)         => api.get(`/users/${id}`),
  create:    (data)       => api.post('/users', data),
  update:    (id, data)   => api.patch(`/users/${id}`, data),
  remove:    (id)         => api.delete(`/users/${id}`),
}

// ── Nutritionists ──────────────────────────────────────
export const nutritionistsApi = {
  getAll:    ()           => api.get('/nutritionists'),
  getOne:    (id)         => api.get(`/nutritionists/${id}`),
  create:    (data)       => api.post('/nutritionists', data),
  update:    (id, data)   => api.patch(`/nutritionists/${id}`, data),
  remove:    (id)         => api.delete(`/nutritionists/${id}`),
}

export default api
