import React from 'react'
import Header from '../components/Header';
import '../assets/css/CadProjeto.css';

const CadProjetos = () => {
    return (
        <>
            < Header />
            <section className="form-section">
                <h1>Cadastrar Projeto</h1>
                <form className="project-form" method="POST">
                    <div className="form-group">
                        <label htmlFor="project-name">Nome do Projeto</label>
                        <input
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
                            <option value="Saúde">Saúde</option>
                            <option value="Educação">Educação</option>
                            <option value="Tecnologia">Tecnologia</option>
                            <option value="Agricultura">Agricultura</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stage">Estágio</label>
                        <select id="stage" name="stage" required defaultValue="">
                            <option value="" disabled>Selecione o estágio</option>
                            <option value="Ideia">Ideia</option>
                            <option value="Protótipo">Protótipo</option>
                            <option value="Produto Lançado">Produto Lançado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Localidade</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Digite a localidade"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descrição</label>
                        <textarea
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
