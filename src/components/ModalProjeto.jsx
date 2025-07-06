import React, { useEffect, useState } from "react";
import { verificaLogado } from '../config/auth';
import { converterData } from '../utils/funcoes';

import "../assets/css/ModalProjeto.css";

export default function ModalProjeto({ projeto, closeModal }) {
    return (
        <div className="modal-projeto-overlay" onClick={closeModal}>
            <div className="modal-projeto-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-projeto-close" onClick={closeModal}>&times;</button>

                <h2>{projeto.nmProjeto}</h2>
                <h3>{projeto.empresa}</h3>

                <div className="modal-projeto-info">
                    <p><strong>Status:</strong>{projeto.status} </p>
                    <p><strong>Categoria:</strong> {projeto.categoria} </p>
                    <p><strong>Data inicial:</strong> {converterData(projeto.dtInicio)}</p>
                    <p><strong>Data final:</strong> {projeto.dtFinal === "" || projeto.dtFinal === null ? "Em desenvolvimento" : converterData(projeto.dtFinal)}</p>
                </div>

                <p className="modal-projeto-descricao">{projeto.descricao}</p>
                <div style={{ width: "100%", display: "flex", justifyContent: 'right' }}>
                    <button className="btn btn-secondary" style={{ marginRight: "5px" }} onClick={closeModal}>Fechar</button>
                    {verificaLogado() && localStorage.getItem("tp_usuario") === "2" && (<button className="btn btn-primary">Investir</button>)}
                </div>
            </div>
        </div>
    )
}