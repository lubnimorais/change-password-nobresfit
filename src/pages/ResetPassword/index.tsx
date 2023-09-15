import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';

import { FiCheck } from "react-icons/fi";

import axios from "axios";

import styled from "../../styles/home.module.scss";

import logoImg from "../../assets/logo.png";

interface IRouteQueryParams {
  token: string;
}

const ResetPassword = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const token = queryParams.get('token');
  

  const [passwordModified, setPasswordModified] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')


  async function handlePasswordChange() {
    if (!token) {
      alert('Dados inválidos')

      return;
    }

    if (password !== '') {
      if (password === passwordConfirm && password.length >= 6) {
        try {
          

          await axios.post(`https://api.nobresfit.app/forgotpassword/reset`,
            { password },
            {
              params: { token: token?.trim() }
            })
          setPasswordModified(true)
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('Senhas não são idênticas ou é menor que 6 dígitos!');
      }
    } else {
      alert('Informe a nova senha!');
    }
  }

  function handleGoTopApp() {

  }

  function isUserOnPc() {
    if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      return false
    }
    else {
      return true
    }
  }

  return passwordModified ? (
    <div className={styled.container}>
      <img src={logoImg} className={styled.logo} />
      <FiCheck size={80} color="#04d361" style={{ marginBottom: 24 }} />
      <span className={styled.description}>
        Sua senha foi alterada com sucesso <br /> volte ao app e aproveite!
      </span>
      {!isUserOnPc() && (
        <button type="button" className={styled.submitButton} onClick={() => handleGoTopApp()}>
          Voltar ao app
        </button>
      )}
    </div>
  ) : (
    <div className={styled.container}>
      <img src={logoImg} className={styled.logo} />
      <form className={styled.form}>
        <span className={styled.description}>
          Digite a nova senha para redefinir.
        </span>
        <input
          type="password"
          placeholder="Nova senha"
          className={styled.inputText}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar senha"
          className={styled.inputText}
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
        />
        <button type="button" className={styled.submitButton} onClick={() => handlePasswordChange()}>
          Alterar
        </button>
      </form>
    </div>
  );
}

export { ResetPassword }