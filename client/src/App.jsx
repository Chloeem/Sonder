import React from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';

import Login from './screens/Login.js';
import SignUpPage from './screens/SignUpPage.js';
import RequestPage from './screens/RequestPage.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </BrowserRouter>
  
  );
}
export default App;
