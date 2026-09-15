import { Grid, Typography, Box, Skeleton, Card, CardContent } from '@mui/material'
import MovieCreationOutlinedIcon from '@mui/icons-material/MovieCreationOutlined'
import MovieCard from './MovieCard'

function SkeletonCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <Skeleton variant="rectangular" height={240} animation="wave" />
      <CardContent>
        <Skeleton variant="text" width="80%" height={24} animation="wave" />
        <Skeleton variant="text" width="40%" height={18} animation="wave" />
        <Skeleton variant="text" width="60%" height={18} animation="wave" />
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 10,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          bgcolor: 'rgba(229,9,20,0.08)',
          borderRadius: '50%',
          p: 3,
          display: 'flex',
        }}
      >
        <MovieCreationOutlinedIcon sx={{ fontSize: 48, color: 'primary.main', opacity: 0.7 }} />
      </Box>
      <Typography variant="h6" color="text.secondary" fontWeight={600}>
        Sua watchlist está vazia
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
        Use a busca acima para encontrar filmes e adicioná-los à sua lista.
      </Typography>
    </Box>
  )
}

export default function WatchlistGrid({ movies, onRefresh, showSnackbar, loading }) {
  if (loading) {
    return (
      <Grid container spacing={2}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
            <SkeletonCard />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (movies.length === 0) {
    return <EmptyState />
  }

  return (
    <Grid container spacing={2}>
      {movies.map((movie, index) => (
        <Grid
          item xs={12} sm={6} md={4} lg={3}
          key={movie.ID}
          sx={{
            animation: 'fadeSlideUp 0.35s ease both',
            animationDelay: `${Math.min(index * 0.05, 0.4)}s`,
            '@keyframes fadeSlideUp': {
              from: { opacity: 0, transform: 'translateY(16px)' },
              to:   { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <MovieCard movie={movie} onRefresh={onRefresh} showSnackbar={showSnackbar} />
        </Grid>
      ))}
    </Grid>
  )
}
