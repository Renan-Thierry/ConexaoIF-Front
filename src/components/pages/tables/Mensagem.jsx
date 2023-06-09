import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../form/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Mensagem(){
    const [mensagens, setMensagens] = useState([])
    const [editMensagemId, setEditMensagemId] = useState(null);
    const [editMensagemDados, setEditMensagemDados] = useState({});
    const [filtroMensagem, setFiltroMensagem] = useState("");

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/mensagem')
          .then((response) => setMensagens(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeMensagem = (id) => {
        axios.delete(`http://127.0.0.1:5000/api/mensagem/${id}`)
          .then((response) => {
            const AttListaMensagens = mensagens.filter((mensagem) => mensagem.id !== id);
            setMensagens(AttListaMensagens);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const editMensagem = (id) => {
        axios.get(`http://127.0.0.1:5000/api/mensagem/${id}`)
          .then((response) => {
            setEditMensagemDados(response.data);
            setEditMensagemId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditMensagem = () => {
        axios.put(`http://127.0.0.1:5000/api/mensagem/${editMensagemId}`, editMensagemDados)
          .then((response) => {
            const updatedMensagem = mensagens.map((mensagem) => {
              if (mensagem.id === editMensagemId) {
                return response.data;
              }
              return mensagem;
            });
            setMensagens(updatedMensagem);
            setEditMensagemId(null);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Mensagem = mensagens.filter((mensagem) =>
      mensagem.nome && mensagem.nome.toLowerCase().includes(filtroMensagem.toLowerCase())
      );


    return(
      <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
          <div className={styles.container}>
            <main>
            <h1>Mensagens</h1>
              <div className={styles.conteudo}>
              <input
              type="text"
              placeholder="Pesquisar"
              value={filtroMensagem}
              onChange={(e) => setFiltroMensagem(e.target.value)}
              />
                <Link to="/ChatBot"><button>Adicionar</button></Link>
              </div>
              {editMensagemId ? (
                <div className={styles.editForm}>
                  <input
                    type="text"
                    value={editMensagemDados.grupo}
                    onChange={(e) => setEditMensagemDados({ ...editMensagemDados, grupo: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editMensagemDados.texto}
                    onChange={(e) => setEditMensagemDados({ ...editMensagemDados, texto: e.target.value })}
                  />
                  <button onClick={saveEditMensagem}>Salvar</button>
                </div>
              ) : (
              <div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>GRUPO</th>
                      <th>TEXTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Mensagem.map((mensagem) => {
                        return (
                          <tr key={mensagem.id}>
                            <td>{mensagem.id}</td>
                            <td>{mensagem.grupo}</td>
                            <td>{mensagem.texto}</td>
                            <div className={styles.icones}>
                              <BsPencil onClick={() => editMensagem(mensagem.id)}/>
                              <BsFillTrashFill onClick={() => removeMensagem(mensagem.id)}/>
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
export default Mensagem;