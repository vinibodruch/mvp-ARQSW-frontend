import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { buildTheme } from './theme'
import App from './App'

function Root() {
  const [mode, setMode] = useState('dark')
  const theme = useMemo(() => buildTheme(mode), [mode])
  const toggleMode = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App toggleMode={toggleMode} mode={mode} />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
