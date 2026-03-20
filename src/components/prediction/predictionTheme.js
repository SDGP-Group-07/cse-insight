import { createTheme } from '@mui/material/styles';

// MUI dark theme tuned to match the app's purple/dark palette
const predictionTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a1a2e',
      paper: '#24133a',
    },
    primary: {
      main: '#00f5d4',
    },
    success: {
      main: '#4ade80',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af',
    },
  },
  typography: {
    fontFamily: '"Google Sans", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(36, 19, 58, 0.6)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(36, 19, 58, 0.8)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(0,245,212,0.1)',
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '20px',
          '&:last-child': { paddingBottom: '20px' },
        },
      },
    },
  },
});

export default predictionTheme;
