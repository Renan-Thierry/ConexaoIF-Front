import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../form/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Curso(){
    const [cursos, setCursos] = useState([])
    const [editCursoId, setEditCursosId] = useState(null);
    const [editCursoDados, setEditCursoDados] = useState({});
    const [filtroCurso, setFiltroCurso] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/curso')
          .then((response) => setCursos(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeCurso = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/curso/${id}`)
          .then((response) => {
            const AttListaCursos = cursos.filter((curso) => curso.id !== id);
            setCursos(AttListaCursos);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editCurso = (id) => {
        axios.get(`http://127.0.0.1:5000/api/curso/${id}`)
          .then((response) => {
            setEditCursoDados(response.data);
            setEditCursosId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditCurso = () => {
        axios.put(`http://127.0.0.1:5000/api/curso/${editCursoId}`, editCursoDados)
          .then((response) => {
            const updatedCursos = cursos.map((curso) => {
              if (curso.id === editCursoId) {
                return response.data;
              }
              return curso;
            });
            setCursos(updatedCursos);
            setEditCursosId(null);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Curso = cursos.filter((curso) =>
      curso.nome && curso.nome.toLowerCase().includes(filtroCurso.toLowerCase())
      );

    return(
        <>
        <div className={styles.containerAdminNavBar}>
          <AdminNavBar />
          <div className={styles.container}>
            <main>
            <h1>Cursos</h1>
              <div className={styles.conteudo}>
                <input
                  type="text"
                  placeholder="Pesquisar"
                  value={filtroCurso}
                  onChange={(e) => setFiltroCurso(e.target.value)}
                />
                <Link to=""><button>Adicionar</button></Link>
              </div>
              {editCursoId ? (
                <div className={styles.editForm}>
                <input
                    type="text"
                    value={editCursoDados.instituicao}
                    onChange={(e) => setEditCursoDados({ ...editCursoDados, instituicao: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editCursoDados.nome}
                    onChange={(e) => setEditCursoDados({ ...editCursoDados, nome: e.target.value })}
                  />
                  <button onClick={saveEditCurso}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Instituição</th>
                      <th>Nome</th>

                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Curso.map((curso) => {
                        return (
                          <tr key={curso.id}>
                            <td>{curso.id}</td>
                            <td>{curso.instituicao}</td>
                            <td>{curso.nome}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editCurso(curso.id)}/>
                              <BsFillTrashFill onClick={() => removeCurso(curso.id)}/>
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
        </div>
    </>
    )
}
export default Curso;