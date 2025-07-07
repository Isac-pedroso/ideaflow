import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import '../assets/css/CadProjeto.css';
import { verificaLogado } from '../config/auth';
import { Navigate, useParams } from 'react-router-dom';
import Notificacao from '../components/Notificacao';
import { requestPrivado } from '../utils/request';
import { converterData } from '../utils/funcoes';
import Carregamento from '../components/Carregamento';

const EditarProjeto = () => {

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


    const [dadosProjeto, setDadosProjeto] = useState([]);

    const {id} = useParams();



    // Ao carregar a pagina ou troca de estado da page
    useEffect(() => {
        console.log(id);
        const fetchDadosProjeto = async ()=>{
            const response = await requestPrivado("http://localhost:8080/projetos/buscarProjeto/"+id, "", "GET");

            if(response.status){
                setDadosProjeto(response.body);
            }else{
                console.log("Erro ao trazer dados do projeto!");
            }
        }


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
        fetchDadosProjeto();
    }, [])

    useEffect(()=>{
        !dadosProjeto && console.log("AQUI");
        console.log(dadosProjeto.dt_inicio)
    }, [dadosProjeto])

    const handleSalvaProjeto = async (e) => {
        e.preventDefault();

        // Valida se todos os inputs estão preenchidos
        // if (validaInputs()) {
        //     return false;
        // }

        
        console.log("AQUI-2")
        
        const dados = {
            nm_projeto: "TESTE NOME EDITAR",
            empresa: { id: localStorage.getItem('id') },
            dt_inicio: "2005-05-05",
            dt_final: "2005-05-05",
            statusDeProjeto: { id: 1 },
            descricao: "TESTE TESTE EDITARE",
            id_cidade: "TESTE CIDADE EDITAR",
            categoriaDeProjeto: { id: 1 },
        }
        console.log(dados)
        const fetchCad = async () => {
            console.log("AQUI")
            const response = await requestPrivado("http://localhost:8080/projetos/editar/"+id, dados, "PUT")

            if (response.status) {

                setClasseMsg("success");
                setIconeMsg("check")
                setMsg("Projeto editado com sucesso!");
                setTimeout(() => { setValid(true) }, 50);

                return true;
            }
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setTimeout(() => { setValid(true) });
            setMsg("Problema ao editar projeto!");

            return false;
        };

        const response = await fetchCad(); 
        if(response){
            setTimeout(()=>{
                setRedirecionaHome(true);
            }, 2000)
        } 
     
    }



    // const validaInputs = () => {
    //     setMsg("");
    //     setValid(false);

    //     if (nm_projeto_cad === "") {
    //         setClasseMsg("danger");
    //         setIconeMsg("triangle-exclamation")
    //         setMsg("Campo nome projeoto vazio!");
    //         return true;
    //     }
    //     if (categoria_cad === "") {
    //         setClasseMsg("danger");
    //         setIconeMsg("triangle-exclamation")
    //         setMsg("Campo categoria vazio!");
    //         return true;
    //     }
    //     if (area_cad === "") {
    //         setClasseMsg("danger");
    //         setIconeMsg("triangle-exclamation")
    //         setMsg("Campo area vazio!");
    //         return true;
    //     }
    //     if (cidade_cad === "") {
    //         setClasseMsg("danger");
    //         setIconeMsg("triangle-exclamation")
    //         setMsg("Campo cidade vazio!");
    //         return true;
    //     }
    //     if (descricao_cad === "") {
    //         setClasseMsg("danger");
    //         setIconeMsg("triangle-exclamation")
    //         setMsg("Campo descrição vazio!");
    //         return true;
    //     }
    //     if (dt_inicial === "") {
    //         setClasseMsg("danger");
    //         setIconeMsg("triangle-exclamation")
    //         setMsg("Campo data inicial vazio!");
    //         return true;
    //     }
    // }


    // Se usuario não estiver logado
    if (!verificaLogado() || localStorage.getItem("tp_usuario") === "2") {
        return <Navigate to="/login" />;
    }

    if (redirecionaHome) {
        return <Navigate to="/" />;
    }


    if(!dadosProjeto || Object.keys(dadosProjeto).length === 0){
        return <Carregamento />
    }

    return (
        <>
            < Header />
            <section className="form-section">
                <h1>Editar Projeto</h1>
                <form className="project-form" method="POST" onSubmit={handleSalvaProjeto}>
                    <div className="form-group">
                        <label htmlFor="nm_projeto">Nome do Projeto</label>
                        <input
                            style={{ width: "96%" }}
                            type="text"
                            id="nm_projeto"
                            name="nm_projeto"
                            placeholder="Digite o nome do projeto"
                            value={dadosProjeto.nm_projeto}
                            required
                            onChange={(e) => setNmProjetoCad(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="area">Categoria</label>
                        <select id="categoria" name="categoria" value={dadosProjeto.categoriaDeProjeto.id} required defaultValue="" onChange={(e) => setCategoriaCad(e.target.value)}>
                            <option value="" disabled>Selecione uma categoria</option>
                            {categorias.map(dados => (
                                <option key={dados.id} value={dados.id}>{dados.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select id="status" name="status" value={dadosProjeto.statusDeProjeto.id} required defaultValue="" onChange={(e) => setAreaCad(e.target.value)}>
                            <option value="" disabled>Selecione o status</option>
                            {status.map(dados => (
                                <option key={dados.id} value={dados.id}>{dados.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="cidade">Cidade</label>
                        <select id="stage" name="cidade" value={dadosProjeto.id_cidade} required defaultValue="" onChange={(e) => setCidadeCad(e.target.value)}>
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
                            value={dadosProjeto.dt_inicio?.split("T")[0]}
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
                            value={dadosProjeto.dt_final?.split("T")[0]}
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
                            value={dadosProjeto.descricao}
                            required
                            onChange={(e) => setDescricaoCad(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn-submit">Salvar</button>
                    </div>
                </form>
                {msg != '' ? < Notificacao msg={msg} valid={valid} classeNomeProp={classeMsg} iconeProp={iconeMsg} /> : < Notificacao msg={msg} valid={valid} classeNomeProp={classeMsg} iconeProp={iconeMsg} />}
            </section>
        </>
    )
}

export default EditarProjeto
