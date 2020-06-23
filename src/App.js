import React from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import Restaurants from './Components/Restaurants/Restaurants';

function App() {
  return (
    <div className="App">
      <Layout>
        <Restaurants />
      </Layout>
    </div>
  );
}

export default App;
