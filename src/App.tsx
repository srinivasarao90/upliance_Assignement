import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useSpring, animated } from '@react-spring/web';
import { testLocalStorage } from './utils/persistence';
import Dashboard from './components/Dashboard';

import Counter from './components/Counter/Counter';
import UserForm from './components/UserForm/UserForm';
import RichTextEditor from './components/RichTextEditor/RichTextEditor';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary
import './App.css';
import './index.css';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('themeMode') === 'dark';
  });

  // Persist theme mode in localStorage
  useEffect(() => {
    localStorage.setItem('themeMode', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Check if LocalStorage is available
  useEffect(() => {
    if (!testLocalStorage()) {
      alert('LocalStorage is disabled! Features may not work properly.');
    }
  }, []);

  // Define Light and Dark themes
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: { main: '#2196f3' },
      secondary: { main: '#ff4081' },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#fff',
      },
    },
    typography: {
      fontSize: 16,
      fontFamily: 'Arial, sans-serif',
    },
  });

  // Background animation effect
  const backgroundAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 120, friction: 14 },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <animated.div style={{ ...backgroundAnimation, width: '100vw', height: '100vh' }}>
        <ErrorBoundary>
          <Router>
            <AppBar position="static">
              <Toolbar>
                <Button color="inherit" component={Link} to="/">Counter</Button>
                <Button color="inherit" component={Link} to="/form">User Form</Button>
                <Button color="inherit" component={Link} to="/editor">Editor</Button>

                {/* Theme Toggle Button */}
                <Button
                  color="inherit"
                  onClick={() => setDarkMode(!darkMode)}
                  sx={{ marginLeft: 'auto' }}
                >
                  {darkMode ? <Brightness7 /> : <Brightness4 />}
                </Button>
              </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
                transition: 'background-color 0.3s ease-in-out',
              }}
            >
              <Routes>
                <Route path="/" element={<ErrorBoundary><Counter /></ErrorBoundary>} />
                <Route path="/form" element={<ErrorBoundary><UserForm /></ErrorBoundary>} />
                <Route path="/editor" element={<ErrorBoundary><RichTextEditor /></ErrorBoundary>} />
              </Routes>
            </Box>
          </Router>
        </ErrorBoundary>
      </animated.div>
    </ThemeProvider>
  );
}
