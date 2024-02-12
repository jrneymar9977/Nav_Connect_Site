import './App.css';
import React from "react";
import {Routes, Route } from 'react-router-dom';
import Home from './Home';
import Drivers from './Drivers';
import AddRoutes from './AddRoutes';
import AddBus from './AddBus';
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="flex"> 
        <Navbar /> 
          <Routes>
            <Route path="/" element={<Home/>}/> 
            <Route path="/drivers" element={<Drivers/>}/>
            <Route path="/buses" element={<AddBus/>}/>
            <Route path="/add-routes" element={<AddRoutes/>}/>
          </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;