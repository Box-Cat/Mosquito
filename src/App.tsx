import React from 'react';
import './App.css';
import Navigation from './common/components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
       <Navigation/>
       <Routes>
          <Route path="/" element={<Home/>}/>
       </Routes>
    </div>
  );
}

export default App;
