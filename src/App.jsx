import { useState, useEffect, useCallback } from 'react'
import { Container, Box, Typography, Divider } from '@mui/material'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import WatchlistGrid from './components/WatchlistGrid'
import FeedbackSnackbar from './components/FeedbackSnackbar'
import { useSnackbar } from './hooks/useSnackbar'
import { listMovies } from './api/movieApi'

export default function App() {
  const [movies, setMovies] = useState([])
  const { snackbar, showSnackbar, closeSnackbar } = useSnackbar()

  const fetchMovies = useCallback(async () => {
    try {
      const res = await listMovies()
      setMovies(res.data)
    } catch {
      showSnackbar('Erro ao carregar watchlist.', 'error')
    }
  }, [])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <SearchSection onMovieAdded={fetchMovies} showSnackbar={showSnackbar} />

        <Divider sx={{ my: 4 }} />

        <Box mb={2}>
          <Typography variant="h6">Minha Watchlist</Typography>
        </Box>

        <WatchlistGrid
          movies={movies}
          onRefresh={fetchMovies}
          showSnackbar={showSnackbar}
        />
      </Container>

      <FeedbackSnackbar snackbar={snackbar} onClose={closeSnackbar} />
    </>
  )
}
