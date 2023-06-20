import { useState, useEffect } from "react";
import UserNavBar from "../form/UserNavBar";
import styles from "../styles/EditPerfil.module.css";
import axios from "axios";

function EditPerfil() {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
    disciplina: "",
    registrodeTrabalho: "",
    curso: { id: null }
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/usuario")
      .then((response) => {
        const userData = response.data;
        setUser(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://127.0.0.1:5000/api/coordenador", user)
      .then((response) => {
        alert("Dados do coordenador atualizados com sucesso!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <UserNavBar />
      <div className={styles.conteudo_pgn}>
        <div className={styles.conteudo_edit}>
          <h1>Edição de Perfil</h1>
          <div>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={user.nome}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={user.telefone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="telefone">Disciplina:</label>
              <input
                type="text"
                id="telefone"
                name="telefone"
                value={user.telefone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
                  <label htmlFor="RegistroDeTrabalho">Registro de Trabalho:</label>
                  <input
                    type="text"
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="Curso">Curso:</label>
                  <select>
                    <option value="">Selecione um curso</option>
                  </select>
                </div>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default EditPerfil;
