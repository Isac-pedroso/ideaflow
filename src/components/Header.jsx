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
                    { verificaLogado() && localStorage.getItem('tp_usuario') === "1" && (<> <li><Link to="/cadProjetos">Cadastrar Projeto</Link></li> </>)}
                    { verificaLogado() && localStorage.getItem('tp_usuario') === "2" && (<> <li><Link to="/">Meus investimentos</Link></li> </>)}
                    { verificaLogado() && (<><li><a onClick={handleDeslogar} className='deslogar'>Deslogar</a></li></>)}
                    { !verificaLogado() && (<><li><Link to="/login">Login/Registro</Link></li></>)} 
                </ul>
            </nav>
        </>
    )
}
