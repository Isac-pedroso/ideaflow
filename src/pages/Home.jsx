import React, { use, useEffect, useState } from 'react'


/**
 * Import de Components
 * @components
 */
import Header from '../components/Header';
import CardProjeto from '../components/CardProjeto';
import ModalProjeto from '../components/ModalProjeto';


/**
 * Import de Arquivos CSS
 * @css
 */

import '../assets/css/Index.css';
import '../assets/css/fontawesome-free-6.7.2-web/css/all.min.css';
import { requestPrivado } from '../utils/request';

export default function Home() {

    const [projetosArray, setProjetosArray] = useState([]);
    const [status, setStatus] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const [statusFiltro, setStatusFiltro] = useState(null);
    const [categoriaFiltro, setCategoriaFiltro] = useState(null);
    const [nmProjetoFiltro, setNmProjetoFiltro] = useState("");

    const [projetoSelecionado, setProjetoSelecionado] = useState(null);

    const abrirModal = (projeto)=>{
        setProjetoSelecionado(projeto);
    }

    const fecharModal = ()=>{
        setProjetoSelecionado(null);
    }

    const filtrarProjetos = async ()=>{
        const dados = {
            nm_projeto: nmProjetoFiltro,
            statusDeProjeto: {
                id: statusFiltro
            },
            categoriaDeProjeto: {
                id: categoriaFiltro
            }
        }
        const response = await requestPrivado("http://localhost:8080/projetos/listarFiltro", dados, "POST");

        if(response.status){
            setProjetosArray(response.body);
            return true;
        }else{
            console.log("Erro ao filtrar");
        }
        return false
    }

    useEffect(() => {

        const fetchProjetos = async () => {
            const response = await requestPrivado("http://localhost:8080/projetos/listar", "", "GET");
            if (response.status) {
                setProjetosArray(response.body);
            } else {
                console.log("Erro ao retornar projetos")
            }
        };

        // Consulta no banco de dados todos os status
        // Passa o conteudo retornado do banco para dentro do array de Status
        const fetchStatus = async () => {
            const response = await requestPrivado("http://localhost:8080/statusProjeto/listar", "", "GET");
            if (response.status) {
                setStatus(response.body);
            }
        }

        // Consulta no banco de dados todas as categorias
        // Passa o conteudo retornado do banco para dentro do array de Categorias
        const fetchCategorias = async () => {
            const response = await requestPrivado("http://localhost:8080/categoria_projeto/listar", "", "GET");
            if (response.status) {
                setCategorias(response.body);
            }
        }

        fetchProjetos();
        fetchCategorias();
        fetchStatus();


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
                                onChange={(e)=>{setNmProjetoFiltro(e.target.value)}}
                            />
                            <button type="button" onClick={filtrarProjetos}>Pesquisar</button>
                        </div>
                        <div className='filtros-projetos-home'>
                            <div className="form-group" style={{marginLeft: "0px"}}>
                                <label htmlFor="status">Status</label>
                                <select id="status" name="status" required defaultValue="" onChange={(e) => setStatusFiltro(e.target.value)}>
                                    <option value="null">Selecione o status</option>
                                    {status.map(dados => (
                                        <option key={dados.id} value={dados.id}>{dados.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="area">Categoria</label>
                                <select id="categoria" name="categoria" required defaultValue="" onChange={(e) => setCategoriaFiltro(e.target.value)}>
                                    <option value="null">Selecione uma área</option>
                                    {categorias.map(dados => (
                                        <option key={dados.id} value={dados.id}>{dados.nome}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="cidade">Cidade</label>
                                <select id="stage" name="cidade" required defaultValue="">
                                    <option value="" disabled>Selecione a cidade</option>
                                    <option value="1">TESTE</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
            <section className='listagemProduto'>
                {projetosArray.length === 0 && (<><h1>Nenhum registro encontrado!</h1></>)}
                {projetosArray.map(dados => (
                    <CardProjeto key={dados.id} dados={dados} showModal={() => abrirModal(dados)} />
                ))}
            </section>
            {projetoSelecionado && (
                < ModalProjeto projeto={projetoSelecionado} closeModal={() => fecharModal()}/>
            )}
        </>
    )
}
