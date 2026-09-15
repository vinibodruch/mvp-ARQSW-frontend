import { useState } from 'react'
import {
  Card, CardMedia, CardContent, CardActions,
  Typography, IconButton, Box, Rating, Chip, CardActionArea,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { updateMovie, deleteMovie } from '../api/movieApi'
import MovieMeta from './MovieMeta'
import MovieDetailModal from './MovieDetailModal'

export default function MovieCard({ movie, onRefresh, showSnackbar }) {
  const [modalOpen, setModalOpen] = useState(false)

  const handleToggleWatched = async (e) => {
    e.stopPropagation()
    try {
      await updateMovie(movie.ID, { is_watched: !movie.is_watched })
      onRefresh()
    } catch {
      showSnackbar('Erro ao atualizar filme.', 'error')
    }
  }

  const handleRating = async (e, value) => {
    e.stopPropagation()
    try {
      await updateMovie(movie.ID, { personal_rating: value ?? 0 })
      onRefresh()
    } catch {
      showSnackbar('Erro ao salvar avaliação.', 'error')
    }
  }

  const handleDelete = async (e) => {
    e.stopPropagation()
    try {
      await deleteMovie(movie.ID)
      showSnackbar('Filme removido da watchlist.')
      onRefresh()
    } catch {
      showSnackbar('Erro ao excluir filme.', 'error')
    }
  }

  return (
    <>
      <Card
        sx={{
          opacity: movie.is_watched ? 0.65 : 1,
          transition: 'opacity 0.3s',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Área clicável para abrir o modal de detalhes */}
        <CardActionArea onClick={() => setModalOpen(true)} sx={{ flexGrow: 1 }}>
          <CardMedia
            component="img"
            height="220"
            image={
              movie.poster_url && movie.poster_url !== 'N/A'
                ? movie.poster_url
                : 'https://via.placeholder.com/180x220?text=Sem+Poster'
            }
            alt={movie.title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" noWrap>
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.year}
            </Typography>

            <MovieMeta rated={movie.rated} runtime={movie.runtime} />

            {movie.is_watched && (
              <Chip label="Assistido" color="success" size="small" sx={{ mt: 0.5 }} />
            )}
          </CardContent>
        </CardActionArea>

        <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton size="small" onClick={handleToggleWatched} color={movie.is_watched ? 'success' : 'default'}>
              {movie.is_watched ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
            </IconButton>
            <Rating
              size="small"
              value={movie.personal_rating}
              onChange={handleRating}
              max={5}
            />
          </Box>
          <IconButton size="small" color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <MovieDetailModal
        movie={movie}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
}
