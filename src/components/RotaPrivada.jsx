import React from "react";
import {Navigate } from 'react-router-dom';
import { verificaLogado, getToken, logout } from '../config/auth';

const RotaPrivada = ({children}) =>{
    const logado = verificaLogado();

    return logado ? children : <Navigate to={"/login"} />;
}

export default RotaPrivada;