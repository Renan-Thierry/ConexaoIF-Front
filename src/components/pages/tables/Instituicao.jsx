import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../form/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Instituicao(){
    const [instituicoes, setInstituicoes] = useState([])
    const [editInstituicaoId, setEditInstituicaoId] = useState(null);
    const [editIntituicaoDados, setEditInstituicaoDados] = useState({});
    const [filtroInstituicao, setFiltroInstituicao] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/instituicao')
          .then((response) => setInstituicoes(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeInstituicao = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/instituicao/${id}`)
          .then((response) => {
            const AttListaInstituicao = instituicoes.filter((instituicao) => instituicao.id !== id);
            setInstituicoes(AttListaInstituicao);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editInstituicao = (id) => {
        axios.get(`http://127.0.0.1:5000/api/instituicao/${id}`)
          .then((response) => {
            setEditInstituicaoDados(response.data);
            setEditInstituicaoId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditInstituicao = () => {
        axios.put(`http://127.0.0.1:5000/api/instituicao/${editInstituicaoId}`, editIntituicaoDados)
          .then((response) => {
            const updatedIntituicao = instituicoes.map((instituicao) => {
              if (instituicao.id === editInstituicaoId) {
                return response.data;
              }
              return instituicao;
            });
            setInstituicoes(updatedIntituicao);
            setEditInstituicaoId(null);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Instituicao = instituicoes.filter((instituicao) =>
      instituicao.nome && instituicao.nome.toLowerCase().includes(filtroInstituicao.toLowerCase())
      );

    return(
      <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar /> 
          <div className={styles.container}>
            <main>
            <h1>Instituições</h1>
              <div className={styles.conteudo}>
              <input
              type="text"
              placeholder="Pesquisar"
              value={filtroInstituicao}
              onChange={(e) => setFiltroInstituicao(e.target.value)}
            />
                <Link to=""><button>Adicionar</button></Link>
              </div>
              {editInstituicaoId ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    value={editIntituicaoDados.nome}
                    onChange={(e) => setEditInstituicaoDados({ ...editIntituicaoDados, nome: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editIntituicaoDados.endereco}
                    onChange={(e) => setEditInstituicaoDados({ ...editIntituicaoDados, endereco: e.target.value })}
                  />
                  <button onClick={saveEditInstituicao}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Nome</th>
                      <th>Endereco</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Instituicao.map((instituicao) => {
                        return (
                          <tr key={instituicao.id}>
                            <td>{instituicao.id}</td>
                            <td>{instituicao.nome}</td>
                            <td>{instituicao.endereco}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editInstituicao(instituicao.id)}/>
                              <BsFillTrashFill onClick={() => removeInstituicao(instituicao.id)}/>
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
export default Instituicao;