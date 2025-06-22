import React, { useState } from 'react'

/**
 * Import de Components
 * @components
 */
import Header from '../components/Header';

/**
 * Import de Arquivos CSS
 * @css
 */

export default function Registrar() {

  const [tp_user, setTpUser] = useState(2);
  const [msg, setMsg] = useState();

  const handleRegister = (e)=>{
    e.preventDefault();

    
  }

  const validaInputs = () => {
    setMsg("");

    if (email === "" && tp_user === 2) {
      setMsg("Campo email vazio!");
      return true;
    }
    if (cnpj === "" && tp_user === 1) {
      setMsg("Campo cnpj vazio!");
      return true;
    }
    if (senha === "") {
      setMsg("Campo senha vazio!");
      return true;
    }
  }

  return (
    <>
      <Header />
      <section className="login-section">
        <div className="login-container">
          <h1>Registro</h1>
          <form method="POST">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Digite seu nome" required />

            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" placeholder="Digite seu e-mail" required />

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" placeholder="Crie uma senha" required />

            <label htmlFor="confirm-password">Confirme a Senha:</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirme sua senha" required />

            <button type="submit">Registrar</button>
          </form>
          <p>Já possui uma conta? <a >Faça login aqui</a></p>
        </div>
      </section>
    </>
  )
}

