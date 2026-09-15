import { Snackbar, Alert, useTheme } from '@mui/material'

export default function FeedbackSnackbar({ snackbar, onClose }) {
  const theme = useTheme()

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3500}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={onClose}
        severity={snackbar.severity}
        variant="filled"
        sx={{
          width: '100%',
          fontWeight: 600,
          borderRadius: 2,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 24px rgba(0,0,0,0.5)'
            : '0 8px 24px rgba(0,0,0,0.15)',
        }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  )
}
