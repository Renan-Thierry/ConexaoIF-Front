import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../form/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Periodos(){
    const [Periodos, setPeriodos] = useState([])
    const [editPeriodoId, setEditPeriodoId] = useState(null);
    const [editPeriodoDados, setEditPeriodoDados] = useState({});
    const [filtroPeriodo, setFiltroPeriodo] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/periodo')
          .then((response) => setPeriodos(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removePeriodo = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/periodo/${id}`)
          .then((response) => {
            const AttListaPeriodos = Periodos.filter((periodo) => periodo.id !== id);
            setPeriodos(AttListaPeriodos);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editPeriodo = (id) => {
        axios.get(`http://127.0.0.1:5000/api/periodo/${id}`)
          .then((response) => {
            setEditPeriodoDados(response.data);
            setEditPeriodoId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditPeriodo = () => {
        axios.put(`http://127.0.0.1:5000/api/periodo/${editPeriodoId}`, editPeriodoDados)
          .then((response) => {
            const updatedPeriodo = Periodos.map((periodo) => {
              if (periodo.id === editPeriodoId) {
                return response.data;
              }
              return periodo;
            });
            setPeriodos(updatedPeriodo);
            setEditPeriodoId(null);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Periodo = Periodos.filter((periodo) =>
      periodo.semestrereferencia && periodo.semestrereferencia.toLowerCase().includes(filtroPeriodo.toLowerCase())
      );


    return(
      <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
          <div className={styles.container}>
            <main>
            <h1>Periodos</h1>
              <div className={styles.conteudo}>
              <input
              type="text"
              placeholder="Pesquisar"
              value={filtroPeriodo}
              onChange={(e) => setFiltroPeriodo(e.target.value)}
              />
                <Link to=""><button>Adicionar</button></Link>
              </div>
              {editPeriodoId ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    value={editPeriodoDados.semestrereferencia}
                    onChange={(e) => setEditPeriodoDados({ ...editPeriodoDados, semestrereferencia: e.target.value })}
                  />
                  <button onClick={saveEditPeriodo}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Semestre Referência</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Periodo.map((periodo) => {
                        return (
                          <tr key={periodo.id}>
                            <td>{periodo.id}</td>
                            <td>{periodo.semestrereferencia}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editPeriodo(periodo.id)}/>
                              <BsFillTrashFill onClick={() => removePeriodo(periodo.id)}/>
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
export default Periodos;