import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import '../assets/css/CadProjeto.css';

const CadProjetos = () => {

    const [msg, setMsg] = useState("");
    const [valid, setValid] = useState(false);
    const [classeMsg, setClasseMsg] = useState("");
    const [iconeMsg, setIconeMsg] = useState("");
    const [status, setStatus] = useState([]);


    
    const responseAreas = async (url) => {
        setValid(false);
        try {
            
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            
            const body = await response.json();
            
            if (!response.ok) throw new Error("Error");
            
            return body;
            
        } catch (error) {
            setClasseMsg("danger");
            setIconeMsg("triangle-exclamation")
            setTimeout(() => { setValid(true) });
            setMsg("Erro ao retornar os Status");
            throw error;
        }
    }
    

    useEffect(() => {
        responseAreas("http://localhost:8080/statusProjeto/listar")
            .then(dados => {
                setStatus(dados)
            })

        
    }, [])
    
    return (
        <>
            < Header />
            <section className="form-section">
                <h1>Cadastrar Projeto</h1>
                <form className="project-form" method="POST">
                    <div className="form-group">
                        <label htmlFor="project-name">Nome do Projeto</label>
                        <input
                            style={{ width: "96%" }}
                            type="text"
                            id="project-name"
                            name="project-name"
                            placeholder="Digite o nome do projeto"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="area">Área</label>
                        <select id="area" name="area" required defaultValue="">
                            <option value="" disabled>Selecione uma área</option>
                            {status.map(dados => (
                                <option key={dados.id} value={dados.id}>{dados.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stage">Estágio</label>
                        <select id="stage" name="stage" required defaultValue="">
                            <option value="" disabled>Selecione o estágio</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stage">Cidade</label>
                        <select id="stage" name="stage" required defaultValue="">
                            <option value="" disabled>Selecione a cidade</option>

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea
                            style={{ width: "96%" }}
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Descreva o projeto"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn-submit">Cadastrar</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default CadProjetos
