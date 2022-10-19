import React from 'react';
import './App.css';
import Navigation from './common/components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/game/Game';
import Login from './pages/Login'
import SignUp from 'pages/SignUp';
import { createGlobalStyle } from "styled-components";

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
          <Route path="/game" element={<Game/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
       </Routes>
    </div>
  );
}

export default App;
