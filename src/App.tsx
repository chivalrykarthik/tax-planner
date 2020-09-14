import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderCmp from './components/header/Header';
import FormCmp from './components/form/Form';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import './App.css';
// style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
function App() {
  return (
    <>
      <HeaderCmp />
      <Container maxWidth="sm">
        <Typography component="div">
          <FormCmp />
        </Typography>
      </Container>
    </>
  );
}

export default App;
