import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Users from './pages/Users';
import Products from './pages/Products';

const App = () => (
  <Router>
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  </Router>
);

export default App;
