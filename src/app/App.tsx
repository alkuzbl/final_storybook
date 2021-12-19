import React from 'react';

import { Routes, Route } from 'react-router-dom';
import './App.css';

import { ErrorBar } from '../components/ErrorBar/ErrorBar';
import { Header } from '../features/Header/Header';
import { Login } from '../features/Login/Login';
import { Todolists } from '../features/Todolists/Todolists';

const App = () => (
  <div className="App">
    <Header />
    <div className="App-container" />
    <Routes>
      <Route path="/" element={<Todolists />} />
      <Route path="login" element={<Login />} />
    </Routes>
    <ErrorBar />
  </div>
);

export default App;
