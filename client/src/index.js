import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
         <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
