import { useState } from "react";
import { useEffect } from "react"
import { requestPrivado } from '../utils/request';
import { verificaLogado } from '../config/auth';
import { Navigate } from 'react-router-dom';
import CardProjeto from '../components/CardProjeto';
import ModalProjeto from '../components/ModalProjeto';
import Header from "../components/Header";

export default function MeusProjetos() {

    const [projetoSelecionado, setProjetoSelecionado] = useState(null);
    const [projetosArray, setProjetosArray] = useState([]);
    const [redirecionaHome, setRedirecionaHome] = useState(false);

    const abrirModal = (projeto) => {
        setProjetoSelecionado(projeto);
    }

    const fecharModal = () => {
        setProjetoSelecionado(null);
    }


    useEffect(() => {
        const fetchProjetos = async () => {

            const response = await requestPrivado("http://localhost:8080/projetos/listarMeusProjetos?id=" + localStorage.getItem("id"), "", "GET");
            if (response.status) {
                setProjetosArray(response.body);
            } else {
                console.log("Erro ao retornar projetos")
            }
        };
    }, [])

    // Se usuario não estiver logado
    if (!verificaLogado() || localStorage.getItem("tp_usuario") === "2") {
        return <Navigate to="/login" />;
    }

    if (redirecionaHome) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Header />
            <section className='listagemProduto'>
                {projetosArray.length === 0 && (<><h1>Nenhum registro encontrado!</h1></>)}
                {projetosArray.map(dados => (
                    <CardProjeto key={dados.id} dados={dados} showModal={() => abrirModal(dados)} />
                ))}
            </section>
            {projetoSelecionado && (
                < ModalProjeto projeto={projetoSelecionado} closeModal={() => fecharModal()} />
            )}
        </>
    )
}