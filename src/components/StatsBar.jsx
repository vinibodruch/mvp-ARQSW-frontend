import { Grid, Card, CardContent, Typography, Box, useTheme } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import StarIcon from '@mui/icons-material/Star'

function StatCard({ icon: Icon, label, value, color, subtitle, clickable, active, onClick }) {
  const theme = useTheme()

  return (
    <Card
      onClick={clickable ? onClick : undefined}
      sx={{
        height: '100%',
        cursor: clickable ? 'pointer' : 'default',
        background: theme.palette.mode === 'dark'
          ? `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(${color},0.08) 100%)`
          : `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(${color},0.05) 100%)`,
        border: active
          ? `2px solid rgb(${color})`
          : `1px solid rgba(${color},0.2)`,
        boxShadow: active ? `0 0 16px rgba(${color},0.35)` : undefined,
        '&:hover': clickable ? { transform: 'translateY(-4px)' } : {},
      }}
    >
      <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom sx={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              {label}
              {active && (
                <Box component="span" sx={{ ml: 1, color: `rgb(${color})`, fontSize: '0.65rem' }}>
                  ● filtro ativo
                </Box>
              )}
            </Typography>
            <Typography variant="h4" sx={{ color: `rgb(${color})`, lineHeight: 1.1 }}>
              {value}
            </Typography>
            {subtitle != null && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              bgcolor: active ? `rgba(${color},0.25)` : `rgba(${color},0.12)`,
              borderRadius: 2,
              p: 1,
              display: 'flex',
              transition: 'background 0.2s',
            }}
          >
            <Icon sx={{ color: `rgb(${color})`, fontSize: 22 }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default function StatsBar({ movies, filter, onFilterChange }) {
  const total     = movies.length
  const watched   = movies.filter((m) => m.is_watched).length
  const pending   = total - watched
  const pct       = total > 0 ? Math.round((watched / total) * 100) : 0
  const rated     = movies.filter((m) => m.personal_rating > 0)
  const avgRating = rated.length > 0
    ? (rated.reduce((s, m) => s + m.personal_rating, 0) / rated.length).toFixed(1)
    : '—'

  const toggle = (value) => onFilterChange(filter === value ? null : value)

  const stats = [
    { icon: MovieIcon,              label: 'Total',      value: total,     color: '229,9,20',   subtitle: 'na watchlist',   filterKey: 'all' },
    { icon: CheckCircleOutlineIcon, label: 'Assistidos', value: watched,   color: '72,199,100', subtitle: `${pct}% concluídos`, filterKey: 'watched' },
    { icon: HourglassBottomIcon,    label: 'Pendentes',  value: pending,   color: '245,197,24', subtitle: 'para assistir',  filterKey: 'pending' },
    { icon: StarIcon,               label: 'Nota média', value: avgRating, color: '99,179,237', subtitle: rated.length > 0 ? `de ${rated.length} avaliados` : 'sem avaliações', filterKey: null },
  ]

  return (
    <Grid container spacing={2}>
      {stats.map((s) => (
        <Grid item xs={6} sm={3} key={s.label}>
          <StatCard
            {...s}
            clickable={s.filterKey !== null}
            active={s.filterKey === 'all' ? filter === null : filter === s.filterKey}
            onClick={() => s.filterKey === 'all' ? onFilterChange(null) : toggle(s.filterKey)}
          />
        </Grid>
      ))}
    </Grid>
  )
}
