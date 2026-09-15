import {
  Dialog, DialogContent, DialogTitle,
  Box, Typography, Chip, Divider, IconButton,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import MovieMeta from './MovieMeta'

export default function MovieDetailModal({ movie, open, onClose }) {
  if (!movie) return null

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        {movie.title}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" gap={2} mb={2}>
          <Box
            component="img"
            src={
              movie.poster_url && movie.poster_url !== 'N/A'
                ? movie.poster_url
                : 'https://via.placeholder.com/120x180?text=Sem+Poster'
            }
            alt={movie.title}
            sx={{ width: 120, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }}
          />
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {movie.year}
            </Typography>

            <MovieMeta rated={movie.rated} runtime={movie.runtime} />

            {movie.genre && movie.genre !== 'N/A' && (
              <Box display="flex" flexWrap="wrap" gap={0.5} mt={1}>
                {movie.genre.split(',').map((g) => (
                  <Chip key={g.trim()} label={g.trim()} size="small" variant="outlined" />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {movie.plot && movie.plot !== 'N/A' && (
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom>Sinopse</Typography>
            <Typography variant="body2">{movie.plot}</Typography>
          </Box>
        )}

        {movie.director && movie.director !== 'N/A' && (
          <Box mb={1}>
            <Typography variant="subtitle2" component="span">Direção: </Typography>
            <Typography variant="body2" component="span">{movie.director}</Typography>
          </Box>
        )}

        {movie.actors && movie.actors !== 'N/A' && (
          <Box>
            <Typography variant="subtitle2" component="span">Elenco: </Typography>
            <Typography variant="body2" component="span">{movie.actors}</Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}
