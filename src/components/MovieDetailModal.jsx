import {
  Dialog, DialogContent, DialogTitle,
  Box, Typography, Chip, Divider, IconButton, Button, CircularProgress,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TranslateIcon from '@mui/icons-material/Translate'
import MovieMeta from './MovieMeta'
import { useState } from 'react'

async function translateToPortuguese(text) {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|pt-BR`
  const res = await fetch(url)
  const data = await res.json()
  if (data.responseStatus === 200) return data.responseData.translatedText
  throw new Error('Falha na tradução')
}

export default function MovieDetailModal({ movie, open, onClose }) {
  const [translation, setTranslation] = useState(null)
  const [translating, setTranslating] = useState(false)
  const [translateError, setTranslateError] = useState(false)

  // Reseta estado ao fechar
  const handleClose = () => {
    setTranslation(null)
    setTranslateError(false)
    onClose()
  }

  const handleTranslate = async () => {
    setTranslating(true)
    setTranslateError(false)
    try {
      const result = await translateToPortuguese(movie.plot)
      setTranslation(result)
    } catch {
      setTranslateError(true)
    } finally {
      setTranslating(false)
    }
  }

  if (!movie) return null

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ pr: 6 }}>
        {movie.title}
        <IconButton
          onClick={handleClose}
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
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
              <Typography variant="subtitle2">Sinopse</Typography>
              {/* Botão só aparece se ainda não traduziu */}
              {!translation && (
                <Button
                  size="small"
                  startIcon={translating ? <CircularProgress size={12} /> : <TranslateIcon fontSize="small" />}
                  onClick={handleTranslate}
                  disabled={translating}
                  sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                >
                  {translating ? 'Traduzindo...' : 'Traduzir'}
                </Button>
              )}
            </Box>

            <Typography variant="body2">{movie.plot}</Typography>

            {translation && (
              <Box mt={1} pl={1} borderLeft="3px solid" borderColor="primary.main">
                <Typography variant="caption" color="primary" fontWeight="bold">
                  Tradução
                </Typography>
                <Typography variant="body2" mt={0.5}>{translation}</Typography>
              </Box>
            )}

            {translateError && (
              <Typography variant="caption" color="error" display="block" mt={0.5}>
                Falha ao traduzir. Tente novamente.
              </Typography>
            )}
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
