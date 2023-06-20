import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../form/Button";
import styles from "../styles/FormLogin.module.css";
import axios from "axios";

function FormLogin() {
  const navegaçao = useNavigate();
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/coordenador')
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginUser = user.find((user) => user.email === email && user.senha === senha);

    if (loginUser) {
      alert("Login feito com Sucesso");
      navegaçao("/GruposUser");
    } else {
      alert("Usuário e senha incorretos");
    }
  };

  return (
    <div>
      <form className={styles.content_form} onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        <Button text="Entrar" type="submit" />
      </form>
    </div>
  );
}

export default FormLogin;