import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { verificaLogado, getToken, logout } from '../config/auth';
import { useState } from 'react';

import '../assets/css/Header.css';
 
export default function Header() {
    const [redirecionaLogin, setRedirecionaLogin] = useState(false);
    const navigate = useNavigate();
    
    const handleDeslogar = ()=>{
        logout();
        navigate("/login");
    }

    if(redirecionaLogin){
        return <Navigate to={"/login"} />
    }

    return (
        <>
            <nav class="navbar">
                <ul>
                    <li><Link to="/">Página Inicial</Link></li>
                    <li><a href="#">Cadastrar Projeto</a></li>
                    <li><a href="#">Buscar Projetos</a></li>
                    { verificaLogado() && (<><li><a onClick={handleDeslogar} className='deslogar'>Deslogar</a></li></>)}
                    { !verificaLogado() && (<><li><Link to="/login">Login/Registro</Link></li></>)} 
                </ul>
            </nav>
        </>
    )
}
