import { useState, useEffect, useCallback } from 'react'
import { Container, Box, Typography } from '@mui/material'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import WatchlistGrid from './components/WatchlistGrid'
import StatsBar from './components/StatsBar'
import FeedbackSnackbar from './components/FeedbackSnackbar'
import { useSnackbar } from './hooks/useSnackbar'
import { listMovies } from './api/movieApi'

export default function App({ toggleMode, mode }) {
  const [movies, setMovies]   = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState(null)
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar()

  const fetchMovies = useCallback(async () => {
    setLoading(true)
    try {
      const res = await listMovies()
      setMovies(res.data)
    } catch {
      showSnackbar('Erro ao carregar watchlist.', 'error')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <>
      <Header toggleMode={toggleMode} mode={mode} />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <SearchSection onMovieAdded={fetchMovies} showSnackbar={showSnackbar} />

        <Box sx={{ mt: 4, mb: 3 }}>
          <StatsBar movies={movies} filter={filter} onFilterChange={setFilter} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2.5,
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={800}>
              Minha Watchlist
            </Typography>
            {!loading && (
              <Typography variant="body2" color="text.secondary">
                {filter === 'watched' && 'Mostrando: assistidos'}
                {filter === 'pending' && 'Mostrando: pendentes'}
                {!filter && `${movies.length} ${movies.length === 1 ? 'filme' : 'filmes'} na lista`}
              </Typography>
            )}
          </Box>
        </Box>

        <WatchlistGrid
          movies={
            filter === 'watched' ? movies.filter((m) => m.is_watched) :
            filter === 'pending' ? movies.filter((m) => !m.is_watched) :
            movies
          }
          onRefresh={fetchMovies}
          showSnackbar={showSnackbar}
          loading={loading}
        />
      </Container>

      <FeedbackSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </>
  )
}
