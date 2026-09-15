import { useState } from 'react'
import {
  Card, CardContent, CardActions,
  Typography, IconButton, Box, Rating, CardActionArea, useTheme, useMediaQuery,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { updateMovie, deleteMovie } from '../api/movieApi'
import MovieMeta from './MovieMeta'
import MovieDetailModal from './MovieDetailModal'

const POSTER_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='220' viewBox='0 0 180 220'%3E%3Crect fill='%23222' width='180' height='220'/%3E%3Ctext x='50%25' y='50%25' fill='%23555' text-anchor='middle' dominant-baseline='middle' font-family='sans-serif' font-size='13'%3ESem Poster%3C/text%3E%3C/svg%3E"

export default function MovieCard({ movie, onRefresh, showSnackbar }) {
  const [modalOpen, setModalOpen] = useState(false)
  const theme    = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const posterSrc = movie.poster_url && movie.poster_url !== 'N/A'
    ? movie.poster_url
    : POSTER_FALLBACK

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

  if (isMobile) {
    return (
      <>
        <Card
          sx={{
            opacity: movie.is_watched ? 0.7 : 1,
            transition: 'opacity 0.3s',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            position: 'relative',
          }}
        >
          <CardActionArea
            onClick={() => setModalOpen(true)}
            sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', flexGrow: 1 }}
          >
            <Box
              sx={{
                width: 72,
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
                '& img': { transition: 'transform 0.3s ease' },
                '&:hover img': { transform: 'scale(1.05)' },
              }}
            >
              <Box
                component="img"
                src={posterSrc}
                alt={movie.title}
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>

            <CardContent sx={{ py: 1.25, px: 1.5, flexGrow: 1, '&:last-child': { pb: 1.25 } }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.3, mb: 0.25 }}>
                {movie.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                {movie.year}
              </Typography>
              <MovieMeta rated={movie.rated} runtime={movie.runtime} />
            </CardContent>
          </CardActionArea>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 0.5,
              py: 1,
              borderLeft: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
            }}
          >
            <IconButton
              size="small"
              onClick={handleToggleWatched}
              color={movie.is_watched ? 'success' : 'default'}
              sx={{ p: 0.5 }}
            >
              {movie.is_watched
                ? <CheckCircleIcon sx={{ fontSize: 18 }} />
                : <RadioButtonUncheckedIcon sx={{ fontSize: 18 }} />}
            </IconButton>
            <Rating
              size="small"
              value={movie.personal_rating}
              onChange={handleRating}
              max={5}
              sx={{
                fontSize: '0.9rem',
                '& .MuiRating-iconFilled': { color: '#F5C518' },
              }}
            />
            <IconButton size="small" color="error" onClick={handleDelete} sx={{ p: 0.5 }}>
              <DeleteIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Card>

        <MovieDetailModal movie={movie} open={modalOpen} onClose={() => setModalOpen(false)} />
      </>
    )
  }

  // Layout desktop — vertical
  return (
    <>
      <Card
        sx={{
          opacity: movie.is_watched ? 0.7 : 1,
          transition: 'opacity 0.3s, transform 0.2s, box-shadow 0.2s',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {movie.is_watched && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 2,
              bgcolor: 'success.main',
              borderRadius: '50%',
              p: 0.3,
              display: 'flex',
            }}
          >
            <CheckCircleIcon sx={{ color: '#fff', fontSize: 18 }} />
          </Box>
        )}

        <CardActionArea onClick={() => setModalOpen(true)} sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              position: 'relative',
              height: 240,
              overflow: 'hidden',
              '& .poster-img': { transition: 'transform 0.4s ease' },
              '&:hover .poster-img': { transform: 'scale(1.07)' },
              '& .poster-overlay': { opacity: 0, transition: 'opacity 0.35s ease' },
              '&:hover .poster-overlay': { opacity: 1 },
            }}
          >
            <Box
              className="poster-img"
              component="img"
              src={posterSrc}
              alt={movie.title}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
            <Box
              className="poster-overlay"
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                display: 'flex',
                alignItems: 'flex-end',
                p: 1.5,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                }}
              >
                Ver detalhes
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ pb: 0.5 }}>
            <Typography variant="subtitle1" fontWeight={700} noWrap>
              {movie.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {movie.year}
            </Typography>
            <MovieMeta rated={movie.rated} runtime={movie.runtime} />
          </CardContent>
        </CardActionArea>

        <CardActions
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 1.5,
            py: 1,
            borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton
              size="small"
              onClick={handleToggleWatched}
              color={movie.is_watched ? 'success' : 'default'}
              sx={{ p: 0.5 }}
            >
              {movie.is_watched
                ? <CheckCircleIcon fontSize="small" />
                : <RadioButtonUncheckedIcon fontSize="small" />}
            </IconButton>
            <Rating
              size="small"
              value={movie.personal_rating}
              onChange={handleRating}
              max={5}
              sx={{ '& .MuiRating-iconFilled': { color: '#F5C518' } }}
            />
          </Box>
          <IconButton size="small" color="error" onClick={handleDelete} sx={{ p: 0.5 }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>

      <MovieDetailModal movie={movie} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
