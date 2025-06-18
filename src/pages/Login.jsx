import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useMask } from '@react-input/mask';


/**
 * Import de Components
 * @components
 */
import Notificacao from '../components/Notificacao';
import Header from '../components/Header';

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
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [tp_user, setTpUser] = useState(2);
  const inputRef = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });



  /**
   * Função ao inicializar a pagina
   * @initial
   */

  // useEffect(()=>{
  // }, []);

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
          <h1>Login</h1>
          <select name="tp_user" className='select-tp-user' id="tp_user" value={tp_user} onChange={(e)=>{setTpUser(Number(e.target.value)); setSenha("")}}>
            <option value={1} >Empresa</option>
            <option value={2} >Investidor</option>
          </select>
          {tp_user == 1 &&
            <form onSubmit={handleLogin}>
              <label htmlFor="cnpj">CNPJ:</label>
              <input ref={inputRef} type="text" id="cnpj" name="cnpj" placeholder="000.000.000-00" onChange={(e) => setCnpj(e.target.value)} />

              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" placeholder="Digite sua senha" onChange={(e) => setSenha(e.target.value)} />

              <button type="submit">Entrar</button>
            </form>
            }
          {tp_user == 2 &&
            <form onSubmit={handleLogin}>
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" name="email" placeholder="Digite seu e-mail" onChange={(e) => setEmail(e.target.value)} />

              <label htmlFor="password">Senha:</label>
              <input type="password" id="password" name="password" placeholder="Digite sua senha" onChange={(e) => setSenha(e.target.value)} />

              <button type="submit">Entrar</button>
            </form>
            }
          <p>Não possui uma conta? <Link to="/registrar">Registre-se aqui</Link></p>
        </div>
        {msg != '' ? < Notificacao msg={msg} valid={true} /> : < Notificacao msg={msg} valid={false} />}
      </section>
      <div>
      </div>
    </>
  )
}
