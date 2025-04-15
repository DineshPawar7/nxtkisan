import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Feed from './pages/Feed';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Feed />} />
        <Route path='/create' element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;