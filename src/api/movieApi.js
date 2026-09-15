import axios from 'axios'

// Em produção (Docker) o Nginx faz proxy de /api para o backend
// Em desenvolvimento o vite.config.js faz o proxy
const BASE = '/api'

export const searchMovie = (title) =>
  axios.get(`${BASE}/search`, { params: { title } })

export const listMovies = (watched) => {
  const params = watched !== undefined ? { watched } : {}
  return axios.get(`${BASE}/movies`, { params })
}

export const addMovie = (movie) =>
  axios.post(`${BASE}/movies`, movie)

export const updateMovie = (id, data) =>
  axios.put(`${BASE}/movies/${id}`, data)

export const deleteMovie = (id) =>
  axios.delete(`${BASE}/movies/${id}`)
