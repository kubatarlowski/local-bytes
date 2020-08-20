import React from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import { BrowserRouter } from 'react-router-dom'

function App() {

  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  
  return (
    <BrowserRouter basename="/">
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
