import { useState } from 'react'
import {
  Box, TextField, Button, CircularProgress, Typography,
  Card, CardContent, InputAdornment, useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { searchMovie } from '../api/movieApi'
import SearchResultCard from './SearchResultCard'

export default function SearchSection({ onMovieAdded, showSnackbar }) {
  const [query, setQuery]       = useState('')
  const [result, setResult]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [notFound, setNotFound] = useState(false)
  const theme = useTheme()

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
    <Card
      sx={{
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1a0a0a 0%, #1F1F1F 100%)'
          : 'linear-gradient(135deg, #fff5f5 0%, #FFFFFF 100%)',
        border: `1px solid rgba(229,9,20,0.2)`,
        mb: 1,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ fontWeight: 800, mb: 0.5 }}
        >
          Descobrir Filmes
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Busque por título e adicione à sua watchlist
        </Typography>

        <Box display="flex" gap={1.5}>
          <TextField
            fullWidth
            placeholder="Ex: Inception, The Godfather..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            sx={{ px: 3, whiteSpace: 'nowrap', minWidth: 100 }}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </Button>
        </Box>

        {notFound && (
          <Box
            sx={{
              mt: 2,
              p: 1.5,
              bgcolor: 'rgba(229,9,20,0.08)',
              border: '1px solid rgba(229,9,20,0.2)',
              borderRadius: 2,
            }}
          >
            <Typography color="error" variant="body2" fontWeight={600}>
              Filme não encontrado. Tente outro título.
            </Typography>
          </Box>
        )}

        {result && (
          <Box mt={2}>
            <SearchResultCard
              movie={result}
              onMovieAdded={onMovieAdded}
              showSnackbar={showSnackbar}
              onClear={() => setResult(null)}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
