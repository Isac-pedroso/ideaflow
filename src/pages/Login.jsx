import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useMask } from '@react-input/mask';
import { getToken, logout, verificaLogado } from '../config/auth';


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
  const [valid, setValid] = useState(false);
  const inputRef = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });

  const [classeMsg, setClasseMsg] = useState("");
  const [iconeMsg, setIconeMsg] = useState("");
  const [redirecionaHome, setRedirecionaHome] = useState(false);



  /**
   * Função ao inicializar a pagina
   * @initial
   */

  useEffect(() => {
    if (verificaLogado()) {
      setRedirecionaHome(true);
    }
  }, [redirecionaHome]);

  /**
   * Executa ao clicar no botão de LOGIN (Inicia o SUBMIT do form)
   * @param {*} e 
   * @returns 
   */
  const handleLogin = (e) => {
    e.preventDefault();

    if (validaInputs()) {
      return false;
    }

    // Valida o login com base nos campos passados
    if (!validaLogin()) {
      return false;
    }

  }


  /**
   * Valida o login do investidor/empresa
   * Valida os inputs com base no banco de dados
   * @returns
   */
  const validaLogin = () => {
    setValid(false);
    if (tp_user === 1) {
      console.log("AQUI - 1")
      const dados = {
        cnpj,
        senha
      }

      // Faz a chamada do BD para validação do login
      logar('http://localhost:8080/usuarios/login_empresa', dados)
        .then(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          localStorage.setItem('tp_usuario', data.tp_usuario.id)

          setTimeout(() => { setValid(true) });
          setMsg("Logado com sucesso !");
          setClasseMsg("success");
          setIconeMsg("check")

          setTimeout(() => {
            setRedirecionaHome(true);
          }, 1000);

          return true;
        })


      setTimeout(() => setValid(true));
      setMsg("Cnpj ou senha incorretos!");
      setClasseMsg("danger");
      setIconeMsg("triangle-exclamation")

      return false;
    }

    if (tp_user === 2) {
      console.log("AQUI - 2")
      const dados = {
        email,
        senha
      }

      // Faz a chamada do BD para validação do login
      logar('http://localhost:8080/usuarios/login', dados)
        .then(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('id', data.id);
          localStorage.setItem('tp_usuario', data.tp_usuario.id)

          setTimeout(() => { setValid(true) });
          setMsg("Logado com sucesso !");
          setClasseMsg("success");
          setIconeMsg("check")

          setTimeout(() => {
            setRedirecionaHome(true);
          }, 1000);

          return true;
        })


      setTimeout(() => setValid(true));
      setMsg("Email ou senha incorretos!");
      setClasseMsg("danger");
      setIconeMsg("triangle-exclamation")
     
      return false;
    }
  }


  const logar = async (url, data) => {
    setValid(false);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const body = await response.json();

      if (!response.ok) throw new Error(body.message);

      return body;

    } catch (error) {
      console.log(error.message);
      throw error;
    }

    return true;
  }



  /**
   * Valida se algum imput esta vazio;
   * @returns 
   */
  const validaInputs = () => {
    setMsg('');
    setValid(false);
    if (email === "" && tp_user === 2) {
      setClasseMsg("danger");
      setIconeMsg("triangle-exclamation")
      setMsg("Email ou senha incorretos!");
      setTimeout(() => setValid(true), 10);
      return true;
    }
    if (cnpj === "" && tp_user === 1) {
      setClasseMsg("danger");
      setIconeMsg("triangle-exclamation")
      setMsg("CNPJ ou senha incorretos!");
      setTimeout(() => setValid(true), 10);
      return true;
    }
    if (senha === "") {
      setClasseMsg("danger");
      setIconeMsg("triangle-exclamation")
      tp_user === 1 ? setMsg("CNPJ ou senha incorretos!") : setMsg("Email ou senha incorretos!");
      setTimeout(() => setValid(true), 10);
      return true;
    }

    return false;
  }

  if (redirecionaHome) {
    return <Navigate to="/" />
  }


  return (
    <>
      <Header />
      <section className="login-section">
        <div className="login-container">
          <h1>Login</h1>
          <select name="tp_user" className='select-tp-user' id="tp_user" value={tp_user} onChange={(e) => { setTpUser(Number(e.target.value)); setSenha("") }}>
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
        {msg != '' ? < Notificacao msg={msg} valid={valid} classeNomeProp={classeMsg} iconeProp={iconeMsg} /> : < Notificacao msg={msg} valid={valid} classeNomeProp={classeMsg} iconeProp={iconeMsg} />}
      </section>
      <div>
      </div>
    </>
  )
}
