import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import NavBar from "../../form/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Professor() {
    const [professores, setProfessor] = useState([]);
    const [editProfessorId, setEditProfessorId] = useState(null);
    const [editProfessorDados, setEditProfessorDados] = useState({});
    const [filtroProfessor, setFiltroProfessor] = useState("");

    useEffect(() => {
      axios.get('http://127.0.0.1:5000/api/professor')
        .then((response) => setProfessor(response.data))
        .catch((err) => console.log(err));
    }, []);

    const removeProfessor = (id) => {
      axios.delete(`http://127.0.0.1:5000/api/professor/${id}`)
        .then((response) => {
          const AttListaProfessores = professores.filter((professor) => professor.id !== id);
          setProfessor(AttListaProfessores);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const editProfessor = (id) => {
      axios.get(`http://127.0.0.1:5000/api/professor/${id}`)
        .then((response) => {
          setEditProfessorDados(response.data);
          setEditProfessorId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveEditProfessor = () => {
      axios.put(`http://127.0.0.1:5000/api/professor/${editProfessorId}`, editProfessorDados)
        .then((response) => {
          const updatedProfessor = professores.map((professor) => {
            if (professor.id === editProfessorId) {
              return response.data;
            }
            return professor;
          });
          setProfessor(updatedProfessor);
          setEditProfessorId(null);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filtro_Professor = professores.filter((professor) =>
      professor.nome.toLowerCase().includes(filtroProfessor.toLowerCase())
    );

    return(
    <>
      <NavBar />
      <div className={styles.container}>
        <main>
        <h1>Professores</h1>
          <div className={styles.conteudo}>
          <input
          type="text"
          placeholder="Pesquisar"
          value={filtroProfessor}
          onChange={(e) => setFiltroProfessor(e.target.value)}
          />
            <Link to="/Cadastro"><button>Adicionar</button></Link>
          </div>
          {editProfessorId ? (
            <div className={styles.editForm}>
              <input
                type="text"
                value={editProfessorDados.nome}
                onChange={(e) => setEditProfessorDados({ ...editProfessorDados, nome: e.target.value })}
              />
              <input
                type="text"
                value={editProfessorDados.email}
                onChange={(e) => setEditProfessorDados({ ...editProfessorDados, email: e.target.value })}
              />
              <input
                type="text"
                value={editProfessorDados.telefone}
                onChange={(e) => setEditProfessorDados({ ...editProfessorDados, telefone: e.target.value })}
              />
              <input
                type="text"
                value={editProfessorDados.disciplina}
                onChange={(e) => setEditProfessorDados({ ...editProfessorDados, disciplina: e.target.value })}
              />
              <button onClick={saveEditProfessor}>Salvar</button>
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
                  <th>DISCIPLINA</th>
                </tr>
              </thead>
              <tbody>
                {filtro_Professor.map((professor) => {
                    return (
                      <tr key={professor.id}>
                        <td>{professor.id}</td>
                        <td>{professor.nome}</td>
                        <td>{professor.email}</td>
                        <td>{professor.telefone}</td>
                        <td>{professor.disciplina}</td>
                        <div className={styles.icones}>
                          <BsPencil onClick={() => editProfessor(professor.id)}/>
                          <BsFillTrashFill onClick={() => removeProfessor(professor.id)}/>
                        </div>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
        </main>
      </div>
    </>
    )
}
export default Professor;