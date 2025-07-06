import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import '../assets/css/CadProjeto.css';
import { verificaLogado } from '../config/auth';
import { Navigate } from 'react-router-dom';
import Notificacao from '../components/Notificacao';
import { requestPrivado } from '../utils/request';

const CadProjetos = () => {

    // Variaveis de sistema
    const [msg, setMsg] = useState("");
    const [valid, setValid] = useState(false);
    const [classeMsg, setClasseMsg] = useState("");
    const [iconeMsg, setIconeMsg] = useState("");
    const [status, setStatus] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [redirecionaHome, setRedirecionaHome] = useState(false);

    // Variaveis de cadastro de projeto
    const [nm_projeto_cad, setNmProjetoCad] = useState("");
    const [categoria_cad, setCategoriaCad] = useState("");
    const [area_cad, setAreaCad] = useState("");
    const [cidade_cad, setCidadeCad] = useState("");
    const [descricao_cad, setDescricaoCad] = useState("");
    const [dt_inicial, setDtInicial] = useState("");
    const [dt_final, setDtFinal] = useState("");



    // Ao carregar a pagina ou troca de estado da page
    useEffect(() => {

        // Consulta no banco de dados todos os status
        // Passa o conteudo retornado do banco para dentro do array de Status
        const fetchStatus = async () => {
            const response = await requestPrivado("http://localhost:8080/statusProjeto/listar", "", "GET");
            if (response.status) {
                setStatus(response.body);
            } else {
                setClasseMsg("danger");
                setIconeMsg("triangle-exclamation")
                setTimeout(() => { setValid(true) });
                setMsg("Erro ao retornar os status");
            }
        }

        // Consulta no banco de dados todas as categorias
        // Passa o conteudo retornado do banco para dentro do array de Categorias
        const fetchCategorias = async () => {
            const response = await requestPrivado("http://localhost:8080/categoria_projeto/listar", "", "GET");
            if (response.status) {
                setCategorias(response.body);
            } else {
                setClasseMsg("danger");
                setIconeMsg("triangle-exclamation")
                setTimeout(() => { setValid(true) });
                setMsg("Erro ao retornar as categorias");
            }
        }


        fetchStatus();
        fetchCategorias();
    }, [])


    const handleCadProjeto = async (e) => {
        e.preventDefault();

        // Valida se todos os inputs estão preenchidos
        if (validaInputs()) {
            return false;
        }

        const dados = {
            nm_projeto: nm_projeto_cad,
            empresa: { id: localStorage.getItem('id') },
            dt_inicio: dt_inicial,
            dt_final: dt_final,
            statusDeProjeto: { id: area_cad },
            descricao: descricao_cad,
            id_cidade: cidade_cad,
            categoriaDeProjeto: { id: categoria_cad },
        }

        const fetchCad = async () => {
            const response = await requestPrivado("http://localhost:8080/projetos/cadastrar", dados, "POST")

            if (response.status) {

                setClasseMsg("success");
                setIconeMsg("check")
                setMsg("Projeto cadastrado com sucesso!");
                setTimeout(() => { setValid(true) }, 50);

                return true;
            }
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setTimeout(() => { setValid(true) });
            setMsg("Problema ao cadastrar projeto!");

            return false;
        };

        const response = await fetchCad(); 
        if(response){
            setTimeout(()=>{
                setRedirecionaHome(true);
            }, 2000)
        } 
     
    }



    const validaInputs = () => {
        setMsg("");
        setValid(false);

        if (nm_projeto_cad === "") {
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setMsg("Campo nome projeoto vazio!");
            return true;
        }
        if (categoria_cad === "") {
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setMsg("Campo categoria vazio!");
            return true;
        }
        if (area_cad === "") {
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setMsg("Campo area vazio!");
            return true;
        }
        if (cidade_cad === "") {
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setMsg("Campo cidade vazio!");
            return true;
        }
        if (descricao_cad === "") {
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setMsg("Campo descrição vazio!");
            return true;
        }
        if (dt_inicial === "") {
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setMsg("Campo data inicial vazio!");
            return true;
        }
    }


    // Se usuario não estiver logado
    if (!verificaLogado() || localStorage.getItem("tp_usuario") === "2") {
        return <Navigate to="/login" />;
    }

    if (redirecionaHome) {
        return <Navigate to="/" />;
    }

    return (
        <>
            < Header />
            <section className="form-section">
                <h1>Cadastrar Projeto</h1>
                <form className="project-form" method="POST" onSubmit={handleCadProjeto}>
                    <div className="form-group">
                        <label htmlFor="nm_projeto">Nome do Projeto</label>
                        <input
                            style={{ width: "96%" }}
                            type="text"
                            id="nm_projeto"
                            name="nm_projeto"
                            placeholder="Digite o nome do projeto"
                            required
                            onChange={(e) => setNmProjetoCad(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="area">Categoria</label>
                        <select id="categoria" name="categoria" required defaultValue="" onChange={(e) => setCategoriaCad(e.target.value)}>
                            <option value="" disabled>Selecione uma área</option>
                            {categorias.map(dados => (
                                <option key={dados.id} value={dados.id}>{dados.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" required defaultValue="" onChange={(e) => setAreaCad(e.target.value)}>
                            <option value="" disabled>Selecione o status</option>
                            {status.map(dados => (
                                <option key={dados.id} value={dados.id}>{dados.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <select id="stage" name="cidade" required defaultValue="" onChange={(e) => setCidadeCad(e.target.value)}>
                            <option value="" disabled>Selecione a cidade</option>
                            <option value="1">TESTE</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dt_inicial">Data de inicio</label>
                        <input
                            style={{ width: "96%" }}
                            type="date"
                            id="dt_inicial"
                            name="dt_inicial"
                            required
                            onChange={(e) => setDtInicial(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dt_final">Data final</label>
                        <input
                            style={{ width: "96%" }}
                            type="date"
                            id="dt_final"
                            name="dt_final"
                            onChange={(e) => setDtFinal(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            style={{ width: "96%" }}
                            id="descricao"
                            name="descricao"
                            rows="4"
                            placeholder="Descreva o projeto"
                            required
                            onChange={(e) => setDescricaoCad(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn-submit">Cadastrar</button>
                    </div>
                </form>
                {msg != '' ? < Notificacao msg={msg} valid={valid} classeNomeProp={classeMsg} iconeProp={iconeMsg} /> : < Notificacao msg={msg} valid={valid} classeNomeProp={classeMsg} iconeProp={iconeMsg} />}
            </section>
        </>
    )
}

export default CadProjetos
