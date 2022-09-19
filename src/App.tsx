import React from 'react';
import './App.css';
import Navigation from './common/components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/game/Game';
import { createGlobalStyle } from 'styled-components';
import GameBoard from './pages/game/GameBoard';

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <div className="App">
       <GlobalStyle/>
       <Navigation/>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/game" element={<GameBoard/>}/>
       </Routes>
    </div>
  );
}

export default App;
