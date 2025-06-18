import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './assets/css/Index.css'
import Header from './components/Header';
import Registrar from "./pages/Registrar";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={< Home />}></Route>
      <Route path="/registrar" element={< Registrar />}></Route>
      <Route path="/login" element={< Login />}></Route>
    </Routes>
  )
}

export default App;
