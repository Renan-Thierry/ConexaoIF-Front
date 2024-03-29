import styles from './styles/Tables.module.css';
import React, { useEffect, useState } from 'react';
import AdminNavBar from "../utils/AdminNavBar";
import axios from 'axios';
import { BsPencil, BsFillTrashFill } from 'react-icons/bs';
import Select from 'react-select';

function Mensagem() {
  const [mensagens, setMensagens] = useState([]);
  const [editMensagemId, setEditMensagemId] = useState(null);
  const [editMensagensDados, setEditMensagensDados] = useState({});
  const [filtroMensagem, setFiltroMensagem] = useState('');
  const [alunos, setAlunos] = useState([]);
  const [grupoId, setGrupoId] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [novaMensagem, setNovaMensagem] = useState({
    alunosSelecionados: []
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const cadastrarMensagem = () => {
    novaMensagem.alunosSelecionados = novaMensagem.alunosSelecionados.map((aluno) => aluno.value);
    novaMensagem.grupo = {id: grupoId};
    axios
      .post('http://127.0.0.1:5000/api/mensagem', novaMensagem)
      .then((response) => {
        setModoEdicao(false);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          setMensagemErro(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/aluno')
      .then((response) => setAlunos(response.data))
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/grupo')
      .then((response) => setGrupos(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/mensagem')
      .then((response) => setMensagens(response.data))
      .catch((err) => console.log(err));
  }, []);

  const removeMensagem = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/api/mensagem/${id}`)
      .then((response) => {
        const AttListaMensagem = mensagens.filter((mensagem) => mensagem.id !== id);
        setMensagens(AttListaMensagem);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editMensagem = (id) => {
    axios
      .get(`http://127.0.0.1:5000/api/mensagem/${id}`)
      .then((response) => {
        setEditMensagensDados(response.data);
        setEditMensagemId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditMensagem = () => {
    axios
      .put(`http://127.0.0.1:5000/api/mensagem/${editMensagemId}`, editMensagensDados)
      .then((response) => {
        const updatedMensagens = mensagens.map((mensagem) => {
          if (mensagem.id === editMensagemId) {
            return response.data;
          }
          return mensagem;
        });
        setMensagens(updatedMensagens);
        setEditMensagemId(null);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtro_Mensagem = mensagens.filter((mensagem) =>
    mensagem.texto && mensagem.texto.toLowerCase().includes(filtroMensagem.toLowerCase())
  );

  const adicionarMensagem = () => {
    setModoEdicao(true);
    setMensagemErro('');
  };

  const handleAlunosSelect = (selectedOptions) => {
    setNovaMensagem({ ...novaMensagem, alunosSelecionados: selectedOptions });
  };

  return (
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
              <button onClick={adicionarMensagem}>Adicionar</button>
            </div>
            {editMensagemId ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Aluno:</label>
                  <select
                    value={editMensagensDados.aluno.id}
                    onChange={(e) =>
                      setEditMensagensDados({
                        ...editMensagensDados,
                        aluno: { id: e.target.value },
                      })
                    }
                  >
                    <option value="">Selecione um aluno</option>
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.id}>
                        {aluno.nome + ' - ' + aluno.periodo.semestrereferencia}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button onClick={saveEditMensagem}>Salvar</button>
              </div>
            ) : (
              <div>
                <table
                  className={`${styles.table} ${
                    modoEdicao ? styles.hidden : ''
                  }`}
                  style={{ display: modoEdicao ? 'none' : 'table' }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ALUNO/PERÍODO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Mensagem.map((mensagem) => {
                      return (
                        <tr key={mensagem.id}>
                          <td>{mensagem.id}</td>
                          <td>
                            {mensagem.aluno
                              ? mensagem.aluno.nome +
                                ' - ' +
                                mensagem.aluno.periodo.semestrereferencia
                              : ''}
                          </td>
                          <div className={styles.icones}>
                            <BsPencil onClick={() => editMensagem(mensagem.id)} />
                            <BsFillTrashFill
                              onClick={() => removeMensagem(mensagem.id)}
                            />
                          </div>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {modoEdicao ? (
                  <div className={styles.editForm}>
                    
                    <div className={styles.formGroup}>
                      <label style={{ color: 'white' }}>Alunos:</label>
                      <Select
                        isMulti
                        options={alunos.map((aluno) => ({
                          value: aluno.id,
                          label: aluno.nome +
                          ' - ' +
                          aluno.periodo.semestrereferencia,
                        }))}
                        value={novaMensagem.alunosSelecionados}
                        onChange={handleAlunosSelect}
                      />
                    </div>
                    
                    <button onClick={cadastrarMensagem}>Cadastrar</button>
                    {mensagemErro && <p>{mensagemErro}</p>}
                  </div>
                ) : null}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Mensagem;