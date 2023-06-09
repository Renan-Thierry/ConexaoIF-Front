import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import AdminNavBar from "../../form/AdminNavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Pessoas() {
    const [pessoas, setPessoas] = useState([]);
    const [editPessoaId, setEditPessoaId] = useState(null);
    const [editPessoaDados, setEditPessoaDados] = useState({});
    const [filtroPessoa, setFiltroPessoa] = useState("");

    useEffect(() => {
      axios.get('http://127.0.0.1:5000/api/pessoa')
        .then((response) => setPessoas(response.data))
        .catch((err) => console.log(err));
    }, []);

    const removePessoas = (id) => {
      axios.delete(`http://127.0.0.1:5000/api/pessoa/${id}`)
        .then((response) => {
          const AttListaPessoas = pessoas.filter((pessoa) => pessoa.id !== id);
          setPessoas(AttListaPessoas);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const editPessoa = (id) => {
      axios.get(`http://127.0.0.1:5000/api/pessoa/${id}`)
        .then((response) => {
          setEditPessoaDados(response.data);
          setEditPessoaId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveEditCoordenador = () => {
      axios.put(`http://127.0.0.1:5000/api/pessoa/${editPessoaId}`, editPessoaDados)
        .then((response) => {
          const updatedPessoas = pessoas.map((pessoa) => {
            if (pessoa.id === editPessoaId) {
              return response.data;
            }
            return pessoa;
          });
          setPessoas([...updatedPessoas]);
          setEditPessoaId(null);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filtro_Pessoa = pessoas.filter((pessoa) =>
    pessoa.nome && pessoa.nome.toLowerCase().includes(filtroPessoa.toLowerCase())
    );

    return(
    <>
    <div className={styles.containerAdminNavBar}>
      <AdminNavBar />
        <div className={styles.container}>
          <main>
          <h1>Pessoas</h1>
            <div className={styles.conteudo}>
            <input
            type="text"
            placeholder="Pesquisar"
            value={filtroPessoa}
            onChange={(e) => setFiltroPessoa(e.target.value)}
            />
              <Link to=""><button>Adicionar</button></Link>
            </div>
            {editPessoaId ? (
              <div className={styles.editForm}>
                <input
                  type="text"
                  value={editPessoaDados.nome}
                  onChange={(e) => setEditPessoaDados({ ...editPessoaDados, nome: e.target.value })}
                />
                <input
                  type="text"
                  value={editPessoaDados.email}
                  onChange={(e) => setEditPessoaDados({ ...editPessoaDados, email: e.target.value })}
                />
                <input
                  type="text"
                  value={editPessoaDados.telefone}
                  onChange={(e) => setEditPessoaDados({ ...editPessoaDados, telefone: e.target.value })}
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
                  </tr>
                </thead>
                <tbody>
                  {filtro_Pessoa.map((pessoa) => {
                      return (
                        <tr key={pessoa.id}>
                          <td>{pessoa.id}</td>
                          <td>{pessoa.nome}</td>
                          <td>{pessoa.email}</td>
                          <td>{pessoa.telefone}</td>
                          <div className={styles.icones}>
                            <BsPencil onClick={() => editPessoa(pessoa.id)}/>
                            <BsFillTrashFill onClick={() => removePessoas(pessoa.id)}/>
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
export default Pessoas;