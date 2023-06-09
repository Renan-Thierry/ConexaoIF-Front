import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../form/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import { BsPencil, BsFillTrashFill } from "react-icons/bs"

function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [editAlunosId, setEditAlunosId] = useState(null);
  const [editAlunosDados, setEditAlunosDados] = useState({});
  const [filtroAluno, setFiltroAluno] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/aluno')
      .then((response) => setAlunos(response.data))
      .catch((err) => console.log(err));
  }, []);

  const removeAluno = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/aluno/${id}`)
      .then((response) => {
        const AttListaAlunos = alunos.filter((aluno) => aluno.id !== id);
        setAlunos(AttListaAlunos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editAluno = (id) => {
    axios.get(`http://127.0.0.1:5000/api/aluno/${id}}`)
      .then((response) => {
        setEditAlunosDados(response.data);
        setEditAlunosId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditAluno = () => {
    axios.put(`http://127.0.0.1:5000/api/aluno/${editAlunosId}`, editAlunosDados)
      .then((response) => {
        const updatedAlunos = alunos.map((aluno) => {
          if (aluno.id === editAlunosId) {
            return response.data;
          }
          return aluno;
        });
        setAlunos(updatedAlunos);
        setEditAlunosId(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtro_Alunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(filtroAluno.toLowerCase())
  );

  return (
    <>
    <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
        <div className={styles.container}>
          <main>
            <h1>Alunos</h1>
            <div className={styles.conteudo}>
              <input
                type="text"
                placeholder="Pesquisar"
                value={filtroAluno}
                onChange={(e) => setFiltroAluno(e.target.value)}
              />
              <Link to="/ChatBot"><button>Adicionar</button></Link>
            </div>
            {editAlunosId ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={editAlunosDados.nome}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, nome: e.target.value })}
                />
                <input
                  type="text"
                  value={editAlunosDados.email}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, email: e.target.value })}
                />
                <input
                  type="text"
                  value={editAlunosDados.telefone}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, telefone: e.target.value })}
                />
                <input
                  type="text"
                  value={editAlunosDados.matricula}
                  onChange={(e) => setEditAlunosDados({ ...editAlunosDados, matricula: e.target.value })}
                />
                <button onClick={saveEditAluno}>Salvar</button>
              </div>
            ) : (
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NOME</th>
                      <th>EMAIL</th>
                      <th>TELEFONE</th>
                      <th>MATRICULA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Alunos.map((aluno) => (
                      <tr key={aluno.id}>
                        <td>{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.email}</td>
                        <td>{aluno.telefone}</td>
                        <td>{aluno.matricula}</td>
                        <div className={styles.icones}>
                          <BsPencil onClick={() => editAluno(aluno.id)} />
                          <BsFillTrashFill onClick={() => removeAluno(aluno.id)} />
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
    </div>
    </>
  );
}

export default Alunos;
