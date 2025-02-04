import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ErrorBoundary from './components/ErrorBoundary';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import './App.css';  // Assuming the updated CSS is in this file

// Material UI Theme
const theme = createTheme({
  palette: {
    primary: { main: '#2196f3' },
    secondary: { main: '#ff4081' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ErrorBoundary>
          <div className="App">
            <header>
              <h1>Welcome to My App</h1>
            </header>
            <main>
              <Routes>
                <Route path="/" element={<Counter />} />
                <Route path="/form" element={<UserForm />} />
                <Route path="/editor" element={<RichTextEditor />} />
              </Routes>
            </main>
            <footer>
              <button>Click Me!</button>
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                Visit Site
              </a>
            </footer>
          </div>
        </ErrorBoundary>
      </Router>
    </ThemeProvider>
  );
}

