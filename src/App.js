import React from 'react';
import Main from './Pages/Main';
import About from './Pages/About';
import Style from'./Components/Style.css'
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Main/>} />
      <Route path='/about' element={<About/>} />
    </Routes>
    </>
  );
}

export default App;