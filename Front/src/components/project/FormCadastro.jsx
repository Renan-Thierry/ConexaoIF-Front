import {useState} from 'react'
import styles from './FormCadastro.module.css'
import Button from '../form/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FormCadastro() {
    const [usuario, setUsuario] = useState({});
    const navegacao = useNavigate();
  
    function createUser(newUser) {
      axios.post('http://127.0.0.1:5000/api/pessoa', newUser)
        .then((response) => {
          setUsuario(response.data);
          navegacao('/Alunos');
        })
        .catch((err) => console.log(err));
    }
  
    function handleChange(e) {
      setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const handleSubmit = (event) => {
      const nome = event.target.elements.nome.value;
      const email = event.target.elements.email.value;
      const senha = event.target.elements.senha.value;
      const telefone = event.target.elements.telefone.value;
      const disciplina = event.target.elements.disciplina.value;
      const newUser = { nome, email, senha, telefone, disciplina };
      createUser(newUser);
    };
  
    return (
      <div>
        <form className={styles.content_form} onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" name="nome" onChange={handleChange} required />
          <input type="email" placeholder="Email" name="email" onChange={handleChange} required />
          <input type="password" placeholder="Senha" name="senha" onChange={handleChange} required />
          <input type="tel" placeholder="Telefone" name="telefone" onChange={handleChange} required />
          <input type="text" placeholder="Disciplina" name="disciplina" onChange={handleChange} required />
          <Button text="Cadastre-se" type="submit" />
        </form>
      </div>
    );
}
export default FormCadastro;