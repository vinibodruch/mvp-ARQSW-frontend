import { Box, Tooltip, Typography } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { getRatingInfo } from '../utils/ratingUtils'

export default function MovieMeta({ rated, runtime }) {
  const ratingInfo = getRatingInfo(rated)

  return (
    <Box display="flex" alignItems="center" gap={1} mt={0.5}>
      {ratingInfo && (
        <Tooltip title={ratingInfo.title}>
          <Box
            sx={{
              bgcolor: ratingInfo.color,
              // Amarelo (12 anos) precisa de texto escuro para contraste
              color: ratingInfo.color === '#f5d800' ? '#000' : '#fff',
              fontWeight: 'bold',
              fontSize: '0.65rem',
              px: 0.6,
              py: 0.2,
              borderRadius: 0.5,
              minWidth: 20,
              textAlign: 'center',
              lineHeight: 1.4,
              userSelect: 'none',
            }}
          >
            {ratingInfo.label}
          </Box>
        </Tooltip>
      )}

      {runtime && runtime !== 'N/A' && (
        <Box display="flex" alignItems="center" gap={0.3}>
          <AccessTimeIcon sx={{ fontSize: '0.85rem', color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            {runtime}
          </Typography>
        </Box>
      )}
    </Box>
  )
}
