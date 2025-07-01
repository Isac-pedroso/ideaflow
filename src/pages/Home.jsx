import React from 'react'


/**
 * Import de Components
 * @components
 */
import Header from '../components/Header';

/**
 * Import de Arquivos CSS
 * @css
 */

import '../assets/css/Index.css';
import '../assets/css/fontawesome-free-6.7.2-web/css/all.min.css';

export default function Home() {
    return (
        <>
            <Header />
            <section className="hero">
                <div className="hero-content">
                    <h1>Bem-vindo ao IdeaFlow</h1>
                    <p>Conectando empresas inovadoras a investidores comprometidos com o futuro</p>

                    <form className="search-form">
                        <label htmlFor="produto">Projeto:</label>
                        <div className="input-group">
                            <input
                                type="text"
                                id="produto"
                                placeholder="Nome do produto"
                            />
                            <button type="button">Pesquisar</button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}
