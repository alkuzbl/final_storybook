import React, { useEffect } from 'react';

import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import { ErrorBar } from '../components/ErrorBar/ErrorBar';
import { Header } from '../features/Header/Header';
import { Login } from '../features/Login/Login';
import { Todolists } from '../features/Todolists/Todolists';
import { initializeApp } from '../redux/app-reducer';
import { RootStateType } from '../redux/store';

const App = () => {
  const isInitialized = useSelector<RootStateType, boolean>(
    state => state.app.isInitialized,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) {
    return <CircularProgress />;
  }

  return (
    <div className="App">
      <Header />
      <div className="App-container" />
      <Routes>
        <Route path="*" element={<Todolists />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <ErrorBar />
    </div>
  );
};

export default App;
