
import { useEffect, useState } from 'react';
import '../assets/css/CardProjeto.css';
import { converterData } from '../utils/funcoes';
import { Navigate, useNavigate } from 'react-router-dom';
import CadProjetos from '../pages/CadProjetos';

export default function CardProjeto({ dados, showModal, meusProjetos }) {
    const [dtFinal, setDtFinal] = useState("");
    const [dtInicial, setDtInicial] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setDtFinal(converterData(dados.dtFinal));
        setDtInicial(converterData(dados.dtInicio));
    }, []);


    const handleEditar = (id)=>{
        return navigate("/editar-projeto/"+id)
    }

    const handleExcluir = (id)=>{
        
    }


    return (
        <>
            <div
                className="card cardProjeto"
                style={{
                    width: "100%",
                    marginBottom: "10px",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div className="card-body" style={{ width: "100%" }}>
                    <div className="col-md-12" style={{ width: "100%" }}>
                        <h5 className="card-title">{dados.nmProjeto}</h5>
                    </div>

                    <div
                        className="col-md-12"
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            marginBottom: "8px",
                        }}
                    >
                        <p className="card-text" style={{ fontSize: "17px", marginRight: "10px" }}>
                            {dados.empresa}
                        </p>
                    </div>

                    <div
                        className="col-md-12"
                        style={{
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px",
                            marginBottom: "8px",
                        }}
                    >
                        <p className="card-text">Status: {dados.status}</p>
                        <p className="card-text">Categoria: {dados.categoria}</p>
                        <p className="card-text">Data inicial: {dtInicial}</p>
                        <p className="card-text">
                            Data final:{" "}
                            {dados.dtFinal === "" || dados.dtFinal === null
                                ? "Em desenvolvimento"
                                : dtFinal}
                        </p>
                    </div>

                    <div
                        className="col-md-12"
                        style={{
                            width: "100%",
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                            whiteSpace: "pre-wrap",
                            marginBottom: "10px",
                        }}
                    >
                        <p
                            className="card-text"
                            style={{
                                wordBreak: "break-word",
                                overflowWrap: "break-word",
                                whiteSpace: "pre-wrap",
                                maxWidth: "100%",
                            }}
                        >
                            {dados.descricao}
                        </p>
                    </div>

                    <div
                        className="col-md-12"
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <button className="btn btn-primary" onClick={showModal}>
                            Visualizar
                        </button>
                        {meusProjetos && (
                            <>
                                <button className="btn btn-warning" onClick={() => handleEditar(dados.id)} style={{marginLeft:"5px", marginRight: "5px"}}>
                                    Editar
                                </button>
                                <button className="btn btn-danger" onClick={()=> handleExcluir(dados.id)}>
                                    Excluir
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </>
    )
}