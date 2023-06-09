import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../form/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Coordenador() {
    const [coordenadores, setCoordenadores] = useState([]);
    const [editCoordenadoresId, setEditCoordenadoresId] = useState(null);
    const [editCoordenadoresDados, setEditCoordenadoresDados] = useState({});
    const [filtroCoordenador, setFiltroCoordenador] = useState("");

    useEffect(() => {
      axios.get('http://127.0.0.1:5000/api/coordenador')
        .then((response) => setCoordenadores(response.data))
        .catch((err) => console.log(err));
    }, []);

    const removeCoordenador = (id) => {
      axios.delete(`http://127.0.0.1:5000/api/coordenador/${id}`)
        .then((response) => {
          const AttListaCoordenador = coordenadores.filter((coordenador) => coordenador.id !== id);
          setCoordenadores(AttListaCoordenador);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    const editCoordenador = (id) => {
      axios.get(`http://127.0.0.1:5000/api/coordenador/${id}`)
        .then((response) => {
          setEditCoordenadoresDados(response.data);
          setEditCoordenadoresId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveEditCoordenador = () => {
      axios.put(`http://127.0.0.1:5000/api/coordenador/${editCoordenadoresId}`, editCoordenadoresDados)
        .then((response) => {
          const updatedCoordenadores = coordenadores.map((coordenador) => {
            if (coordenador.id === editCoordenadoresId) {
              return response.data;
            }
            return coordenador;
          });
          setCoordenadores(updatedCoordenadores);
          setEditCoordenadoresId(null);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filtro_coordenador = coordenadores.filter((coordenador) =>
    coordenador.nome && coordenador.nome.toLowerCase().includes(filtroCoordenador.toLowerCase())
    );

    return(
    <>
    <div className={styles.containerAdminNavBar}>
      <AdminNavBar />
        <div className={styles.container}>
          <main>
          <h1>coordenadores</h1>
            <div className={styles.conteudo}>
            <input
            type="text"
            placeholder="Pesquisar"
            value={filtroCoordenador}
            onChange={(e) => setFiltroCoordenador(e.target.value)}
          />
              <Link to=""><button>Adicionar</button></Link>
            </div>
            {editCoordenadoresId ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={editCoordenadoresDados.nome}
                  onChange={(e) => setEditCoordenadoresDados({ ...editCoordenadoresDados, nome: e.target.value })}
                />
                <input
                  type="text"
                  value={editCoordenadoresDados.email}
                  onChange={(e) => setEditCoordenadoresDados({ ...editCoordenadoresDados, email: e.target.value })}
                />
                <input
                  type="text"
                  value={editCoordenadoresDados.telefone}
                  onChange={(e) => setEditCoordenadoresDados({ ...editCoordenadoresDados, telefone: e.target.value })}
                />
                <input
                  type="text"
                  value={editCoordenadoresDados.disciplina}
                  onChange={(e) => setEditCoordenadoresDados({ ...editCoordenadoresDados, disciplina: e.target.value })}
                />
                <input
                  type="text"
                  value={editCoordenadoresDados.registroTrabalho}
                  onChange={(e) => setEditCoordenadoresDados({ ...editCoordenadoresDados, registroTrabalho: e.target.value })}
                />
                <button onClick={saveEditCoordenador}>Salvar</button>
              </div>
            ) : (
            <div>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Disciplina</th>
                    <th>Registro de trabalho</th>
                  </tr>
                </thead>
                <tbody>
                  {filtro_coordenador.map((coordenador) => {
                      return (
                        <tr key={coordenador.id}>
                          <td>{coordenador.id}</td>
                          <td>{coordenador.nome}</td>
                          <td>{coordenador.email}</td>
                          <td>{coordenador.telefone}</td>
                          <td>{coordenador.disciplina}</td>
                          <td>{coordenador.registroTrabalho}</td>
                          <div className={styles.icones}>
                            <BsPencil  onClick={() => editCoordenador(coordenador.id)}/>
                            <BsFillTrashFill onClick={() => removeCoordenador(coordenador.id)}/>
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
export default Coordenador;