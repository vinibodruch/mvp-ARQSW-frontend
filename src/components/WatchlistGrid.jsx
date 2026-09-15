import { Grid, Typography, Box } from '@mui/material'
import MovieCard from './MovieCard'

export default function WatchlistGrid({ movies, onRefresh, showSnackbar }) {
  if (movies.length === 0) {
    return (
      <Box textAlign="center" py={4}>
        <Typography color="text.secondary">
          Sua watchlist está vazia. Busque um filme acima para começar!
        </Typography>
      </Box>
    )
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.ID}>
          <MovieCard movie={movie} onRefresh={onRefresh} showSnackbar={showSnackbar} />
        </Grid>
      ))}
    </Grid>
  )
}
