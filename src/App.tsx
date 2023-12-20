import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/list';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:'70px'
    }}>
     <List></List>
    </Container>
  );
}

export default App;