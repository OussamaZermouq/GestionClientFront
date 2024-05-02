import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GestionClient from './components/GestionClient/GestionClient.jsx';


function App() {
  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
    <CssVarsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/GestionClient" element={<GestionClient />} />
          </Routes>
        </Router>
    </CssVarsProvider>
  </ThemeProvider>
  );
}

export default App;
