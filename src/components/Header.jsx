import { AppBar, Toolbar, Typography } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <MovieIcon sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          Movie Watchlist
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
