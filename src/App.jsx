import React from "react";
import { Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import './assets/css/Index.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
  )
}

export default App;
