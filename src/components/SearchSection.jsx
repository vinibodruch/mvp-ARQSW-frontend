import { useState } from 'react'
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { searchMovie } from '../api/movieApi'
import SearchResultCard from './SearchResultCard'

export default function SearchSection({ onMovieAdded, showSnackbar }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setResult(null)
    setNotFound(false)
    try {
      const res = await searchMovie(query.trim())
      setResult(res.data)
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Buscar Filme
      </Typography>

      <Box display="flex" gap={1} mb={2}>
        <TextField
          fullWidth
          label="Nome do filme"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          size="small"
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <SearchIcon />}
        >
          Buscar
        </Button>
      </Box>

      {notFound && (
        <Typography color="error" variant="body2">
          Filme não encontrado.
        </Typography>
      )}

      {result && (
        <SearchResultCard
          movie={result}
          onMovieAdded={onMovieAdded}
          showSnackbar={showSnackbar}
          onClear={() => setResult(null)}
        />
      )}
    </Box>
  )
}
