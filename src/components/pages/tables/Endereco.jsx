import styles from './Tables.module.css'
import React, { useEffect, useState } from "react";
import NavBar from "../../form/NavBar";
import { Link } from "react-router-dom";
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"

function Endereco() {
    const [enderecos, setEnderecos] = useState([]);
    const [editEnderecoId, setEditEnderecosId] = useState(null);
    const [editEnderecoDados, setEditEnderecoDados] = useState({});
    const [filtroEndereco, setFiltroEndereco] = useState("");  

    useEffect(() => {
      axios.get('http://127.0.0.1:5000/api/endereco')
        .then((response) => setEnderecos(response.data))
        .catch((err) => console.log(err));
    }, []);

    const removeEndereco = (id) => {
      axios.delete(`http://127.0.0.1:5000/api/endereco/${id}`)
        .then((response) => {
          const AttListaEndereco = enderecos.filter((endereco) => endereco.id !== id);
          setEnderecos(AttListaEndereco);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const editEndereco = (id) => {
      axios.get(`http://127.0.0.1:5000/api/endereco/${id}`)
        .then((response) => {
          setEditEnderecoDados(response.data);
          setEditEnderecosId(id);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveEditEndereco = () => {
      axios.put(`http://127.0.0.1:5000/api/endereco/${editEnderecoId}`, editEnderecoDados)
        .then((response) => {
          const updatedEnderecos = enderecos.map((endereco) => {
            if (endereco.id === editEnderecoId) {
              return response.data;
            }
            return endereco;
          });
          setEnderecos(updatedEnderecos);
          setEditEnderecosId(null);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const filtro_Endereco = enderecos.filter((endereco) =>
      endereco.nome.toLowerCase().includes(filtroEndereco.toLowerCase())
    );

    return(
    <>
      <NavBar />
      <div className={styles.container}>
        <main>
        <h1>Endereços</h1>
          <div className={styles.conteudo}>
          <input
          type="text"
          placeholder="Pesquisar"
          value={filtroEndereco}
          onChange={(e) => setFiltroEndereco(e.target.value)}
        />
            <Link to=""><button>Adicionar</button></Link>
          </div>
          {editEnderecoId ? (
            <div className={styles.editForm}>
              <input
                type="text"
                value={editEnderecoDados.rua}
                onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, rua: e.target.value })}
              />
              <input
                type="text"
                value={editEnderecoDados.bairro}
                onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, bairro: e.target.value })}
              />
              <input
                type="text"
                value={editEnderecoDados.cep}
                onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, cep: e.target.value })}
              />
              <input
                type="text"
                value={editEnderecoDados.numero}
                onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, numero: e.target.value })}
              />
              <input
                type="text"
                value={editEnderecoDados.complemento}
                onChange={(e) => setEditEnderecoDados({ ...editEnderecoDados, complemento: e.target.value })}
              />
              <button onClick={saveEditEndereco}>Salvar</button>
            </div>
          ) : (
          <div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Rua</th>
                  <th>Bairro</th>
                  <th>Cep</th>
                  <th>Numero</th>
                  <th>Complemento</th>
                </tr>
              </thead>
              <tbody>
                {filtro_Endereco.map((endereco) => {
                    return (
                      <tr key={endereco.id}>
                        <td>{endereco.id}</td>
                        <td>{endereco.rua}</td>
                        <td>{endereco.bairro}</td>
                        <td>{endereco.cep}</td>
                        <td>{endereco.numero}</td>
                        <td>{endereco.complemento}</td>
                        <div className={styles.icones}>
                          <BsPencil onClick={() => editEndereco(endereco.id)}/>
                          <BsFillTrashFill onClick={() => removeEndereco(endereco.id)}/>
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
export default Endereco;