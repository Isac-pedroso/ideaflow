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

            const response = await requestPrivado("http://localhost:8080/projetos/listarProjetosEmpresa/" + localStorage.getItem("id"), "", "GET");
            console.log(response)
            if (response.status) {
                setProjetosArray(response.body);
            } else {
                console.log("Erro ao retornar projetos")
            }
        };

        fetchProjetos();
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
            <section className="hero" style={{padding: "20px 0px 0px 0px"}}>
                <div className="hero-content">
                    <h1>Meus projetos</h1>
                </div>
            </section>
            <section className='listagemProduto'>
                {projetosArray.length === 0 && (<><h1>Nenhum registro encontrado!</h1></>)}
                {projetosArray.map(dados => (
                    <CardProjeto key={dados.id} dados={dados} showModal={() => abrirModal(dados)} meusProjetos={true} />
                ))}
            </section>
            {projetoSelecionado && (
                < ModalProjeto projeto={projetoSelecionado} closeModal={() => fecharModal()} />
            )}
        </>
    )
}