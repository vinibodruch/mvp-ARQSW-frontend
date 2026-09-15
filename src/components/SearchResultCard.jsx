import { useState } from 'react'
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, Button, CircularProgress, Box, IconButton,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { addMovie } from '../api/movieApi'
import MovieMeta from './MovieMeta'
import MovieDetailModal from './MovieDetailModal'

export default function SearchResultCard({ movie, onMovieAdded, showSnackbar, onClear }) {
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const handleAdd = async () => {
    setLoading(true)
    try {
      await addMovie({
        imdb_id:   movie.imdb_id,
        title:     movie.title,
        year:      movie.year,
        poster_url: movie.poster_url,
        rated:     movie.rated,
        runtime:   movie.runtime,
        plot:      movie.plot,
        director:  movie.director,
        genre:     movie.genre,
        actors:    movie.actors,
      })
      showSnackbar('Filme adicionado à watchlist!')
      onMovieAdded()
      onClear()
    } catch {
      showSnackbar('Filme já está na watchlist.', 'warning')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card sx={{ display: 'flex', maxWidth: 480 }}>
        <CardMedia
          component="img"
          sx={{ width: 120, objectFit: 'cover' }}
          image={
            movie.poster_url && movie.poster_url !== 'N/A'
              ? movie.poster_url
              : 'https://via.placeholder.com/120x180?text=Sem+Poster'
          }
          alt={movie.title}
        />
        <Box display="flex" flexDirection="column" flex={1}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.year}
            </Typography>
            <MovieMeta rated={movie.rated} runtime={movie.runtime} />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              startIcon={loading ? <CircularProgress size={14} color="inherit" /> : <AddIcon />}
              onClick={handleAdd}
              disabled={loading}
            >
              Adicionar
            </Button>
            <IconButton size="small" onClick={() => setModalOpen(true)}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </CardActions>
        </Box>
      </Card>

      <MovieDetailModal
        movie={movie}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
