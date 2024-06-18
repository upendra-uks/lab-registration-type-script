import React from 'react';
import './App.css';
//import { ThemeProvider, createTheme } from '@mui/material/styles';
import RegistrationForm from './components/LabRegistrationForm';
//const theme = createTheme();

const App: React.FC = () => {
  return (
   
      <div className="App">
        <RegistrationForm />
      </div>
   
  );
};

export default App;