import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMask } from '@react-input/mask';


/**
 * Import de Components
 * @components
 */
import Header from '../components/Header';
import Notificacao from '../components/Notificacao';


/**
 * Import de Arquivos CSS
 * @css
 */

export default function Registrar() {

  // Campos cad
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [confirm_senha, setConfirmSenha] = useState("");
  const [dt_nascimento, setDtNascimento] = useState("");

  const [tp_user, setTpUser] = useState(2);

  const [msg, setMsg] = useState("");
  const [valid, setValid] = useState(false);
  const inputRef = useMask({ mask: '___.___.___-__', replacement: { _: /\d/ } });


  const handleRegister = (e) => {
    e.preventDefault();
    setMsg("");
    setValid(false);

    if (validaInputs()) {
      return false;
    }

    if (senha != confirm_senha) {
      setTimeout(() => { setValid(true) });
      setMsg("Senhas devem ser iguais!");
      return false;
    }

    const dados = {
      nome,
      cnpj,
      email,
      dt_nascimento,
      senha,
      tipoUsuario: {id:tp_user}
    }
    console.log(dados)

    registrar("http://localhost:8080/usuarios/cadastrar", dados)
      .then(data => {
        setTimeout(() => {setValid(true)});
        setMsg(data);
      })
  }

  const registrar = async (url, dados) => {
    setValid(false);
    try{

      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dados)
      });

      const body = await response.json(); 
      
      if(!response.ok) throw new Error(body.message);
      return body;
    }catch(error){
      console.log(error.message)
      setTimeout(() => {setValid(true)});
      setMsg(error.message);
      throw error;
    }

    return true;
  }



  const validaInputs = () => {
    setMsg("");
    setValid(false);

    if (nome === "") {
      setMsg("Campo nome vazio!");
      return true;
    }
    if (dt_nascimento === "" && tp_user === 2) {
      setMsg("Campo data de nascimento vazio!");
      return true;
    }
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
    if (confirm_senha === "") {
      setMsg("Confirme a senha!");
      return true;
    }
  }

  return (
    <>
      <Header />
      <section className="login-section">
        <div className="login-container" style={{ marginTop: "100px" }}>
          <h1>Registro</h1>
          <select name="tp_user" className='select-tp-user' id="tp_user" value={tp_user} onChange={(e) => { setTpUser(Number(e.target.value)); }}>
            <option value={1} >Empresa</option>
            <option value={2} >Investidor</option>
          </select>
          <form onSubmit={handleRegister}>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder="Digite seu nome" onChange={(e) => { setNome(e.target.value); }} required />

            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" name="email" placeholder="Digite seu e-mail" onChange={(e) => { setEmail(e.target.value); }} required />
            {tp_user == 2 && (<>
              <label htmlFor="dt_nascimento">Data nascimento:</label>
              <input type="date" id="dt_nascimento" name="dt_nascimento" placeholder="" onChange={(e) => { setDtNascimento(e.target.value); }} required />
            </>)}
            {tp_user == 1 && (<>
              <label htmlFor="cnpj">CNPJ:</label>
              <input ref={inputRef} type="text" id="cnpj" name="cnpj" placeholder="000.000.000-00" onChange={(e) => setCnpj(e.target.value)} />
            </>)}

            <label htmlFor="password">Senha:</label>
            <input type="password" id="password" name="password" placeholder="Crie uma senha" onChange={(e) => { setSenha(e.target.value); }} required />

            <label htmlFor="confirm-password">Confirme a Senha:</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirme sua senha" onChange={(e) => { setConfirmSenha(e.target.value); }} required />

            <button type="submit">Registrar</button>
          </form>
          <p>Já possui uma conta? <Link to="/login">Faça login aqui</Link></p>
        </div>
        {msg != '' ? < Notificacao msg={msg} valid={valid} /> : < Notificacao msg={msg} valid={valid} />}
      </section>
    </>
  )
}

