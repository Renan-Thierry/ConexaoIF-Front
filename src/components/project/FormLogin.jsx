import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/FormLogin.module.css'
import axios from "axios";
import { Link } from "react-router-dom";


function FormLogin() {
  const navegação = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [coordenadores, setCoordenadores] = useState([]);
  // eslint-disable-next-line
  const [accessToken, setAccessToken] = useState("");
  
  const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post("http://127.0.0.1:5000/api/login", {
      email: email,
      senha: senha,
    })
    .then((response) => {
      const coordenadorEncontrado = coordenadores.find(
        (coordenador) => coordenador.email === email && coordenador.senha === senha
      );
  
      if (coordenadorEncontrado) {
        setAccessToken(response.data.access_token);
        localStorage.setItem("accessToken", response.data.access_token); // Armazenar o token no armazenamento local
        alert("Login feito com Sucesso");
        navegação("/EditPerfil");
      } else {
        // Usuários que não sejam coordenadores
        alert("Usuário sem permissão");
      }
      
    })
    .catch((error) => {
      alert("Usuário e senha incorretos");
    });
};
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/coordenador")
      .then((response) => setCoordenadores(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <main className={styles.content_Form}>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
          <p>Esqueci minha senha</p>
            <button className={styles.btn_Login} type="submit">Entrar</button>
        </form>
        <hr/>
        <h3>Ainda não tem acesso?</h3>
        <Link to="/Cadastro">
            <button className={styles.btn_Cadastro}>Cadastre-se</button>
        </Link>
      </main>
    </>
  );
}

export default FormLogin;
