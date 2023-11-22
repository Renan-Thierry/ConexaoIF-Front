import SideBar from "../utils/SideBar";
import styles from './styles/GruposUser.module.css'
import axios from "axios";
import {BsPencil, BsFillTrashFill} from "react-icons/bs"
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import img from "../../img/blog_mini_4.jpg";
import Swal from 'sweetalert2';

function GruposUser() {
    const navegação = useNavigate();
    const [grupos, setGrupos] = useState([])
    const [editGrupoId, setEditGrupoId] = useState(null);
    const [editGruposDados, setEditGruposDados] = useState({});
    const [filtroGrupo, setFiltroGrupo] = useState("");
    const [periodoId, setPeriodoId] = useState(null);
    const [periodos, setPeriodos] = useState([]);
    const [coordenadorId, setCoordenadorId] = useState(null);
    const [coordenadores, setCoordenadores] = useState([]);
    const [novoGrupo, setNovoGrupo] = useState({
      titulo: "",
      link: "",
      mensagem: "",
      periodo: { id: null },
      coordenador: { id: null }
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navegação("/Login");
      } 
    }, [navegação]);

    const cadastrarGrupo = () => {
      novoGrupo.periodo = { id: periodoId };
      novoGrupo.coordenador = { id: coordenadorId };
      axios.post("http://127.0.0.1:5000/api/grupo", novoGrupo)
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => {
            console.log(error);
          });
    };
    useEffect(() => {
      axios.get("http://127.0.0.1:5000/api/periodo")
        .then((response) => setPeriodos(response.data))
        .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
      axios.get("http://127.0.0.1:5000/api/coordenador")
        .then((response) => setCoordenadores(response.data))
        .catch((error) => console.log(error));
    }, []);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/grupo')
          .then((response) => setGrupos(response.data))
          .catch((err) => console.log(err));
      }, []);

      const removeGrupo = (id) => {
        Swal.fire({
          title: 'Você tem certeza?',
          text: 'Se você apagar não tem mais volta!',
          icon: 'Cuidado!',
          showCancelButton: true,
          confirmButtonColor: '#03A64A',
          color: '#FFF',
          background: 'rgb(32, 32, 36)',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sim, deletar!'
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`http://127.0.0.1:5000/api/grupo/${id}`)
              .then((response) => {
                const AttListaGrupo = grupos.filter((grupo) => grupo.id !== id);
                Swal.fire({
                  title: 'Deletado!',
                  text: 'O aluno foi apagado com sucesso',
                  icon: 'success',
                  confirmButtonColor: '#03A64A',
                  color: '#FFF',
                  background: 'rgb(32, 32, 36)',
                });
                setGrupos(AttListaGrupo);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      };

      const editGrupo = (id) => {
        axios.get(`http://127.0.0.1:5000/api/grupo/${id}`)
          .then((response) => {
            setEditGruposDados(response.data);
            setEditGrupoId(id);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const saveEditGrupo = () => {
        axios.put(`http://127.0.0.1:5000/api/grupo/${editGrupoId}`, editGruposDados)
          .then((response) => {
            const updatedGrupos = grupos.map((grupo) => {
              if (grupo.id === editGrupoId) {
                return response.data;
              }
              return grupo;
            });
            setGrupos(updatedGrupos);
            setEditGrupoId(null);
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      const filtro_Grupo = grupos.filter((grupo) =>
      grupo.titulo && grupo.titulo.toLowerCase().includes(filtroGrupo.toLowerCase())
      );

      const adicionarGrupo = (e) => {
        setModoEdicao(!modoEdicao);
      };

    return(
      <>
      <SideBar />
          <main className={styles.conteudo}>
            <h1>Grupos</h1>
              {!editGrupoId && (
                <form className={styles.form_filtro} style={{ display: modoEdicao ? 'none' : 'flex' }}>
                  <input type="text" placeholder="Pesquisar" value={filtroGrupo} onChange={(e) => setFiltroGrupo(e.target.value)}/> 
                  <button type="button" onClick={adicionarGrupo}>Adicionar</button>
                </form>
              )}
              {editGrupoId ? (
                <div className={styles.EditForm_Alunos}>
                  <form onSubmit={saveEditGrupo} className={styles.FormAlunos}>
                    <label>Título:</label>
                    <input type="text" placeholder="Digite o titulo do grupo" value={editGruposDados.titulo} onChange={(e) => setEditGruposDados({ ...editGruposDados, titulo: e.target.value })} required />
                    <label>Link:</label>
                    <input type="text" placeholder="Digite o link do grupo" value={editGruposDados.link} onChange={(e) => setEditGruposDados({ ...editGruposDados, link: e.target.value })} required />
                    <label>Período:</label>
                    <select value={editGruposDados.periodo.id} onChange={(e) => setEditGruposDados({...editGruposDados,periodo: { id: e.target.value }})}>
                    <option value="">Selecione um periodo</option>
                    {periodos.map((periodo) => (
                      <option key={periodo.id} value={periodo.id}>
                        {periodo.semestrereferencia}
                      </option>
                    ))}
                  </select>
                    <label>Coordenador:</label>
                    <select value={editGruposDados.coordenador.id} onChange={(e) => setEditGruposDados({...editGruposDados, coordenador: { id: e.target.value }})}>
                      <option value="">Selecione um coordenador</option>
                      {coordenadores.map((coordenador) => (
                        <option key={coordenador.id} value={coordenador.id}>
                          {coordenador.nome}
                        </option>
                      ))}
                    </select>
                    <label>Mensagem:</label>
                    <textarea type="text" placeholder="Digite sua mensagem..." value={editGruposDados.mensagem} onChange={(e) => setEditGruposDados({ ...editGruposDados, mensagem: e.target.value })} required />
                  <button type="submit">Salvar</button>
                  </form>
                </div>
              ) : (
              <section className={styles.section_tabela} style={{ display: modoEdicao ? 'none' : 'flex' }}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Grupo</th>
                      <th>Titulo</th>
                      <th>Link</th>
                      <th>Mensagem</th>
                      <th>Periodo</th>
                      <th>Coordenador</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtro_Grupo.map((grupo) => {
                        return (
                          <tr key={grupo.id}>
                            <td><img src={img} alt="imagem tabela"/></td>
                            <td>{grupo.titulo}</td>
                            <td>{grupo.link}</td>
                            <td>{grupo.mensagem}</td>
                            <td>{grupo.periodo ? grupo.periodo.semestrereferencia : ""}</td>
                            <td>{grupo.coordenador ? grupo.coordenador.nome : ""}</td>
                            <td>
                            <div className={styles.icones}>
                              <button onClick={() => editGrupo(grupo.id)} className={styles.icone1}>
                                <BsPencil />
                              </button>
                              <button onClick={() => removeGrupo(grupo.id)} className={styles.icone2}>
                                <BsFillTrashFill />
                              </button>
                          </div></td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </section>
            )}
            {modoEdicao && (
              <div className={styles.addGrupo}>
                <form onSubmit={cadastrarGrupo}>
                <h2>Adicionar Grupos</h2>
                  <label>Título:</label>
                  <input type="text" placeholder="Digite o titulo do grupo" value={novoGrupo.titulo} onChange={(e) => setNovoGrupo({ ...novoGrupo, titulo: e.target.value })} required />
                  <label>Link:</label>
                  <input type="text" placeholder="Digite o link do grupo" value={novoGrupo.link} onChange={(e) => setNovoGrupo({ ...novoGrupo, link: e.target.value })} required />
                  <label>Período:</label>
                  <select value={periodoId} onChange={(e) => setPeriodoId(e.target.value)} required >
                    <option value="">Selecione um periodo</option>
                    {periodos.map((periodo) => (
                      <option key={periodo.id} value={periodo.id}>
                        {periodo.semestrereferencia}
                      </option>
                    ))}
                  </select>
                  <label>Coordenador:</label>
                  <select value={coordenadorId} onChange={(e) => setCoordenadorId(e.target.value)} required >
                    <option value="">Selecione um coordenador</option>
                    {coordenadores.map((coordenador) => (
                      <option key={coordenador.id} value={coordenador.id}>
                        {coordenador.nome}
                      </option>
                    ))}
                  </select>
                  <label>Mensagem:</label>
                  <textarea type="text" placeholder="Digite sua mensagem..." value={novoGrupo.mensagem} onChange={(e) => setNovoGrupo({ ...novoGrupo, mensagem: e.target.value })} required />
                <button type="submit">Cadastrar</button>
                </form>
              </div>
            )}
            </main>
      </>
    )
}

export default GruposUser;