import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/Header.css';
 
export default function Header() {
    return (
        <>
            <nav class="navbar">
                <ul>
                    <li><Link to="/">Página Inicial</Link></li>
                    <li><a href="#">Cadastrar Projeto</a></li>
                    <li><a href="#">Buscar Projetos</a></li>
                    <li><Link to="/login">Login/Registro</Link></li>
                </ul>
            </nav>
        </>
    )
}
