import { AppBar, Toolbar, Typography, IconButton, Box, useTheme } from '@mui/material'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LocalMoviesIcon from '@mui/icons-material/LocalMovies'

export default function Header({ toggleMode, mode }) {
  const theme = useTheme()
  const isDark = mode === 'dark'

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #0A0A0A 0%, #1a0a0a 50%, #0A0A0A 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #fff5f5 50%, #FFFFFF 100%)',
        borderBottom: `1px solid ${isDark ? 'rgba(229,9,20,0.3)' : 'rgba(229,9,20,0.15)'}`,
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              bgcolor: 'primary.main',
              borderRadius: 2,
              p: 0.75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(229,9,20,0.5)',
            }}
          >
            <LocalMoviesIcon sx={{ color: '#fff', fontSize: 22 }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: 'text.primary',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.3px',
              }}
            >
              CineList
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', lineHeight: 1 }}
            >
              Sua watchlist de filmes
            </Typography>
          </Box>
        </Box>

        <IconButton
          onClick={toggleMode}
          size="small"
          sx={{
            color: 'text.secondary',
            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
            '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' },
          }}
        >
          {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
