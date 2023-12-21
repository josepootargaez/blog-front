import React from 'react';
import './App.css';
import List from './components/list';
import { Container } from '@mui/material';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Addblog from './components/addBlog'
import './css/style.css'
function App() {
  return (
    <Container maxWidth="lg" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:'70px'
    }}>

  <Router>
      <Routes>
        {/* Ruta para la página de inicio */}
        <Route path="/" element={<List />} />
        <Route path="/add" element={<Addblog />} />
        <Route path="*" element={<List />} />
      </Routes>
  </Router>
    </Container>
  );
}

export default App;