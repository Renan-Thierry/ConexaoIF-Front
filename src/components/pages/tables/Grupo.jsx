import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import NavBar from "../../form/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Grupo(){
    const [grupos, setGrupos] = useState([])
    const [editGrupoId, setEditGrupoId] = useState(null);
    const [editGrupoDados, setEditGrupoDados] = useState({});
    const [filtroGrupo, setFiltroGrupo] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/grupo')
          .then((response) => setGrupos(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeMensagem = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/grupo/${id}`)
          .then((response) => {
            const AttListaGrupo = grupos.filter((grupo) => grupo.id !== id);
            setGrupos(AttListaGrupo);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editGrupo = (id) => {
        axios.get(`http://127.0.0.1:5000/api/grupo/${id}`)
          .then((response) => {
            setEditGrupoDados(response.data);
            setEditGrupoId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditGrupo = () => {
        axios.put(`http://127.0.0.1:5000/api/grupo/${editGrupoId}`, editGrupoDados)
          .then((response) => {
            const updatedGrupos = grupos.map((grupo) => {
              if (grupo.id === editGrupoId) {
                return response.data;
              }
              return grupo;
            });
            setGrupos(updatedGrupos);
            setEditGrupoId(null);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Grupo = grupos.filter((grupo) =>
        grupo.nome.toLowerCase().includes(filtroGrupo.toLowerCase())
      );

    return(
      <>
          <NavBar />
          <div className={styles.container}>
            <main>
            <h1>Grupos</h1>
              <div className={styles.conteudo}>
              <input
              type="text"
              placeholder="Pesquisar"
              value={filtroGrupo}
              onChange={(e) => setFiltroGrupo(e.target.value)}
              />
                <Link to="/ChatBot"><button>Adicionar</button></Link>
              </div>
              {editGrupoId ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    value={editGrupoDados.titulo}
                    onChange={(e) => setEditGrupoDados({ ...editGrupoDados, nome: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editGrupoDados.link}
                    onChange={(e) => setEditGrupoDados({ ...editGrupoDados, email: e.target.value })}
                  />
                  <button onClick={saveEditGrupo}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Titulo</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Grupo.map((grupo) => {
                        return (
                          <tr key={grupo.id}>
                            <td>{grupo.id}</td>
                            <td>{grupo.titulo}</td>
                            <td>{grupo.link}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editGrupo(grupo.id)}/>
                              <BsFillTrashFill onClick={() => removeMensagem(grupo.id)}/>
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
export default Grupo;