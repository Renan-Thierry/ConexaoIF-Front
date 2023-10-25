import styles from './styles/AlunosConectados.module.css';
import React, { useEffect, useState } from "react";
import SideBar from "../utils/SideBar";
import axios from "axios";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function AlunosConectados() {
  const navegação = useNavigate();
  const [alunosGrupo, setAlunosGrupo] = useState([]);
  const [filtroAlunoGrupo, setFiltroAlunoGrupo] = useState("");
  const [alunoId, setAlunoId] = useState(null);
  const [grupoId, setGrupoId] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [novoAlunoGrupo, setNovoAlunoGrupo] = useState({
    aluno_id: null,
    grupo_id: null,
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  const [mensagemErro, setMensagemErro] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      navegação('/Login');
    }
  }, [navegação]);

  const cadastrarAlunoGrupo = () => {
    novoAlunoGrupo.aluno_id = alunoId;
    novoAlunoGrupo.grupo_id = grupoId;
    axios
      .post("http://127.0.0.1:5000/api/alunogrupo", novoAlunoGrupo)
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
      .get("http://127.0.0.1:5000/api/aluno")
      .then((response) => setAlunos(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://127.0.0.1:5000/api/grupo")
      .then((response) => setGrupos(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/alunogrupo?_expand=aluno&_expand=grupo")
      .then((response) => {
        const data = response.data.map((alunoGrupo) => ({
          ...alunoGrupo,
          grupo_id: alunoGrupo.grupo ? alunoGrupo.grupo.id : null
        }));
        setAlunosGrupo(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const removeAlunoGrupo = (id) => {
    axios
      .delete(`http://127.0.0.1:5000/api/alunogrupo/${id}`)
      .then((response) => {
        const updatedAlunosGrupo = alunosGrupo.filter((alunoGrupo) => alunoGrupo.id !== id);
        setAlunosGrupo(updatedAlunosGrupo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtro_AlunoGrupo = alunosGrupo.filter((alunoGrupo) =>
    alunoGrupo.aluno &&
    (
      alunoGrupo.aluno.nome.toLowerCase().includes(filtroAlunoGrupo.toLowerCase()) ||
      (alunoGrupo.grupo && (
        alunoGrupo.grupo.titulo.toLowerCase().includes(filtroAlunoGrupo.toLowerCase()) ||
        alunoGrupo.grupo.id.toString().includes(filtroAlunoGrupo.toLowerCase())
      ))
    )
  );


  const adicionarAlunoGrupo = () => {
    setModoEdicao(true);
    setMensagemErro("");
  };

  const fetchPeriodAndCourse = (alunoGrupo) => {
    if (alunoGrupo.aluno && alunoGrupo.aluno.periodo_id && alunoGrupo.aluno.curso_id) {
      axios
        .get(`http://127.0.0.1:5000/api/periodo/${alunoGrupo.aluno.periodo_id}`)
        .then((response) => {
          const periodo = response.data;
          alunoGrupo.aluno.periodo = periodo;
          setAlunosGrupo((prevAlunosGrupo) => [...prevAlunosGrupo]); 
        })
        .catch((error) => console.log(error));
      
      axios
        .get(`http://127.0.0.1:5000/api/curso/${alunoGrupo.aluno.curso_id}`)
        .then((response) => {
          const curso = response.data;
          alunoGrupo.aluno.curso = curso;
          setAlunosGrupo((prevAlunosGrupo) => [...prevAlunosGrupo]); 
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    alunosGrupo.forEach(fetchPeriodAndCourse); 
  }, [alunosGrupo]);

  return (
    <>
      <SideBar />
          <main className={styles.conteudo}>
            <h1>Alunos Conectados</h1>
            {!modoEdicao && (
              <form className={styles.form_filtro}>
              <input
                type="text"
                placeholder="id/nome do grupo/nome do aluno"
                value={filtroAlunoGrupo}
                onChange={(e) => setFiltroAlunoGrupo(e.target.value)}
              />
            <button onClick={adicionarAlunoGrupo} style={{ visibility: 'hidden' }}></button>
            </form>
            )}
            <section className={styles.section_tabela}>
              <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ALUNO</th>
                    <th>PERÍODO</th>
                    <th>ID DO ALUNO</th>
                    <th>ID DO GRUPO</th>
                    <th> TÍTULO DO GRUPO</th>
                    <th>CURSO</th>
                  </tr>
                </thead>
                <tbody>
                  {filtro_AlunoGrupo.map((alunoGrupo) => {
                    return (
                      <tr key={alunoGrupo.id}>
                        <td>{alunoGrupo.id}</td>
                        <td>{alunoGrupo.aluno ? alunoGrupo.aluno.nome : ""}</td>
                        <td>{alunoGrupo.aluno && alunoGrupo.aluno.periodo ? alunoGrupo.aluno.periodo.semestrereferencia : ""}</td>
                        <td>{alunoGrupo.aluno ? alunoGrupo.aluno.id : ""}</td>
                        <td>{alunoGrupo.grupo ? alunoGrupo.grupo.id : ""}</td>
                        <td>{alunoGrupo.grupo ? alunoGrupo.grupo.titulo : ""}</td>
                        <td>{alunoGrupo.aluno && alunoGrupo.aluno.curso ? alunoGrupo.aluno.curso.nome : ""}</td>
                        <div className={styles.icones}>
                        <button onClick={() => removeAlunoGrupo(alunoGrupo.id)} className={styles.icone2}>
                          <BsFillTrashFill />
                        </button>
                      </div>  
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {modoEdicao ? (
                <div className={styles.editForm}>
                  <div className={styles.formGroup}>
                    <label>Aluno:</label>
                    <select
                      value={novoAlunoGrupo.aluno_id || ""}
                      onChange={(e) => setNovoAlunoGrupo({ ...novoAlunoGrupo, aluno_id: e.target.value })}
                      required
                    >
                      <option value="">Selecione um aluno</option>
                      {alunos.map((aluno) => (
                        <option key={aluno.id} value={aluno.id}>
                          {aluno.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label>Grupo:</label>
                    <select
                      value={novoAlunoGrupo.grupo_id || ""}
                      onChange={(e) => setNovoAlunoGrupo({ ...novoAlunoGrupo, grupo_id: e.target.value })}
                      required
                    >
                      <option value="">Selecione um grupo</option>
                      {grupos.map((grupo) => (
                        <option key={grupo.id} value={grupo.id}>
                          {grupo.titulo}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button onClick={cadastrarAlunoGrupo}>Cadastrar</button>
                  {mensagemErro && <p>{mensagemErro.mensagem}</p>}

                </div>
              ) : null}
            </section>
          </main>
    </>
  );
}

export default AlunosConectados;
