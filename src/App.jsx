import React from "react";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import './assets/css/Index.css'
import Header from './components/Header';
import Registrar from "./pages/Registrar";
import Home from "./pages/Home";
import CadProjetos from "./pages/CadProjetos";

function App() {
  return (
    <Routes>
      <Route path="/" element={< Home />}></Route>
      <Route path="/registrar" element={< Registrar />}></Route>
      <Route path="/login" element={< Login />}></Route>
      <Route path="/cadProjetos" element={< CadProjetos />}></Route>
    </Routes>
  )
}

export default App;
