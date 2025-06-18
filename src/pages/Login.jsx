import React, { useState } from 'react'

/**
 * Import de Components
 * @components
 */
import Notificacao from '../components/Notificacao';


/**
 * Import de Arquivos CSS
 * @css
 */
import '../assets/css/Login.css';

export default function Login() {

  /**
   * Variaveis
   * @variaveis
   */
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");


  /**
   * Executa ao clicar no botão de LOGIN (Inicia o SUBMIT do form)
   * @param {*} e 
   * @returns 
   */
  const handleLogin = (e) => {
    e.preventDefault();

    if (validaInputs()) {
      return;
    }

  }


  /**
   * Valida se algum imput esta vazio;
   * @returns 
   */
  const validaInputs = () => {
    setMsg("");
    if (email === "") {
      setMsg("Campo email vazio!");
      return true;
    }
    if (senha === "") {
      setMsg("Campo senha vazio!");
      return true;
    }
  }


  return (
    <>
      <section className="login-section">
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" placeholder="Digite sua senha" onChange={(e) => setSenha(e.target.value)} />

            <button type="submit">Entrar</button>
          </form>
        </div>
        {msg != '' ? < Notificacao msg={msg} valid={true}/> : < Notificacao msg={msg} valid={false}/> }
      </section>
      <div>
      </div>
    </>
  )
}
