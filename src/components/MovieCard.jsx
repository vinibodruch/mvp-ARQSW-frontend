import { useState } from 'react'
import {
  Card, CardContent, CardActions,
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
          {/* Container da imagem com overlay de hover */}
          <Box
            sx={{
              position: 'relative',
              height: 220,
              overflow: 'hidden',
              backgroundImage: `url(${
                movie.poster_url && movie.poster_url !== 'N/A'
                  ? movie.poster_url
                  : 'https://via.placeholder.com/180x220?text=Sem+Poster'
              })`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Escala sutil na imagem ao hover
              '& .poster-img': {
                transition: 'transform 0.4s ease',
              },
              '&:hover .poster-img': {
                transform: 'scale(1.05)',
              },
              // Overlay escurece ao hover
              '& .poster-overlay': {
                opacity: 0,
                transition: 'opacity 0.4s ease',
              },
              '&:hover .poster-overlay': {
                opacity: 1,
              },
            }}
          >
            {/* Imagem real para animação de escala */}
            <Box
              className="poster-img"
              component="img"
              src={
                movie.poster_url && movie.poster_url !== 'N/A'
                  ? movie.poster_url
                  : 'https://via.placeholder.com/180x220?text=Sem+Poster'
              }
              alt={movie.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Overlay gradiente */}
            <Box
              className="poster-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                p: 1.5,
              }}
            >
              <Typography variant="body2" color="#fff" fontWeight="bold" sx={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                Ver detalhes
              </Typography>
            </Box>
          </Box>
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
