import { createTheme } from '@mui/material/styles'

const CINEMA_PALETTE = {
  dark: {
    primary:    '#E50914',
    secondary:  '#F5C518',
    bg:         '#141414',
    paper:      '#1F1F1F',
    paperHover: '#2A2A2A',
    border:     'rgba(255,255,255,0.08)',
    text:       '#FFFFFF',
    subtext:    '#A0A0A0',
  },
  light: {
    primary:    '#E50914',
    secondary:  '#B5860A',
    bg:         '#F4F4F4',
    paper:      '#FFFFFF',
    paperHover: '#F0F0F0',
    border:     'rgba(0,0,0,0.1)',
    text:       '#0A0A0A',
    subtext:    '#555555',
  },
}

export function buildTheme(mode) {
  const p = CINEMA_PALETTE[mode]

  return createTheme({
    palette: {
      mode,
      primary:    { main: p.primary },
      secondary:  { main: p.secondary },
      background: { default: p.bg, paper: p.paper },
      text:       { primary: p.text, secondary: p.subtext },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h4: { fontWeight: 800, letterSpacing: '-0.5px' },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 600 },
      subtitle2: { fontWeight: 600 },
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${p.border}`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: mode === 'dark'
                ? '0 12px 32px rgba(0,0,0,0.6)'
                : '0 12px 32px rgba(0,0,0,0.15)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 600, borderRadius: 8 },
          containedPrimary: {
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 4px 16px rgba(229,9,20,0.4)' },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': { borderRadius: 8 },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 500 },
        },
      },
    },
  })
}
