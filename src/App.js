import React from 'react';
import './App.css';
import Home from './Components/Home/Home';
import Restaurants from './Components/Restaurants/Restaurants';

function App() {
  return (
    <div className="App">
      <Home>
        <Restaurants />
      </Home>
    </div>
  );
}

export default App;
