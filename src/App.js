import './App.css';
import { CssVarsProvider } from '@mui/joy/styles';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Login from './components/Login';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GestionClient from './components/GestionClient/GestionClient.jsx';
import UpdateClient from './components/GestionClient/UpdateClient';
import AjouterClient from './components/GestionClient/AjouterClient';
import GestionCategorie from './components/GestionCategories/GestionCategories'
import GestionCommande from './components/GestionCommande/GestionCommande.jsx'
import AjouterCategorie from './components/GestionCategories/AjouterCategorie.jsx'
import UpdateCategory from './components/GestionCategories/UpdateCategory.jsx';
import AjouterCommande from './components/GestionCommande/AjouterCommande.jsx';
import GestionProduit from './components/GestionProduit/GestionProduit.jsx';
import AjouterProduit  from './components/GestionProduit/AjouterProduit.jsx';

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
            <Route path="/GestionClient/update" element={<UpdateClient />} />
            <Route path='/GestionClient/ajouter' element={<AjouterClient />}/>
            
            <Route path='/GestionCategories' element={<GestionCategorie />}/>
            <Route path='/GestionCategories/ajouterCategorie' element={<AjouterCategorie />}/>
            <Route path='/GestionCategories/update' element={<UpdateCategory />}/>

            <Route path='/GestionCommande' element={<GestionCommande />}/>
            <Route path='/GestionCommande/AjouterCommande' element={<AjouterCommande />}/>

            <Route path='/GestionProduit' element={<GestionProduit />}/>
            <Route path='/GestionProduit/ajouter' element={<AjouterProduit />}/>

          </Routes>
        </Router>
    </CssVarsProvider>
  </ThemeProvider>
  );
}

export default App;
