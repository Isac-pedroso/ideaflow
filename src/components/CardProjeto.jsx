
import { useEffect, useState } from 'react';
import '../assets/css/CardProjeto.css';
import {converterData} from '../utils/funcoes';

export default function CardProjeto({dados, showModal}) {
    const [dtFinal, setDtFinal] = useState("");
    const [dtInicial, setDtInicial] = useState("");

    useEffect(() => {
        setDtFinal(converterData(dados.dtFinal));
        setDtInicial(converterData(dados.dtInicio));
    }, []);



    return (
        <>
            <div className="card cardProjeto" style={{ width: "100%", marginBottom: "10px", display: "flex" }}>
                <div class="card-body">
                    <div className='col-md-12' style={{ width: "100%" }}>
                        <h5 class="card-title">{dados.nmProjeto}</h5>
                    </div>
                    <div className='col-md-12' style={{ width: "100%", display: "flex" }}>
                        <p class="card-text" style={{ fontSize: "17px" }}>{dados.empresa}</p>
                    </div>
                    <div className='col-md-12' style={{ width: "100%", display: "flex" }}>
                        <p class="card-text">Status: {dados.status}</p>
                        <p class="card-text">Categoria: {dados.categoria}</p>
                        <p class="card-text" >Data inicial: {dtInicial}</p>
                        <p class="card-text" >Data final: {dados.dtFinal === "" || dados.dtFinal === null ? "Em desenvolvimento" : dtFinal}</p>
                    </div>
                    <div className='col-md-12' style={{ width: "100%", display: "flex" }}>
                        <p class="card-text">{dados.descricao}</p>
                    </div>
                    <div className='col-md-12' style={{ width: "100%", display: "flex", justifyContent: "right" }}>
                        <button className='btn btn-primary' onClick={showModal}>Visualizar</button>
                    </div>
                </div>
            </div>
        </>
    )
}