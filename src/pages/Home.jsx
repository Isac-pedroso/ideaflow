import React, { useEffect, useState } from 'react'


/**
 * Import de Components
 * @components
 */
import Header from '../components/Header';
import CardProjeto from '../components/CardProjeto';


/**
 * Import de Arquivos CSS
 * @css
 */

import '../assets/css/Index.css';
import '../assets/css/fontawesome-free-6.7.2-web/css/all.min.css';
import { requestPrivado } from '../utils/request';

export default function Home() {

    const [projetosArray, setProjetosArray] = useState([]);


    useEffect(()=>{

        const fetchProjetos = async ()=>{
            const response = await requestPrivado("http://localhost:8080/projetos/listar", "", "GET");
            console.log(response)
            if(response.status){
                setProjetosArray(response.body);
            }else{
                console.log("Erro ao retornar projetos")
            }
        };

        fetchProjetos();


    }, []);


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
            <section className='listagemProduto'>
                {projetosArray.map(dados =>(
                    <CardProjeto key={dados.id} dados={dados} />    
                ))}
            </section>
        </>
    )
}
