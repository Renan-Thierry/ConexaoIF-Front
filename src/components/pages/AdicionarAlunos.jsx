import styles from './styles/AdicionarAlunos.module.css';
import React, { useEffect, useState } from "react";
import SideBar from "../utils/SideBar";
import axios from "axios";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Button from '../utils/Button';

function Alunos() { 
  const navegação = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [editAlunosId, setEditAlunosId] = useState(null);
  const [editAlunosDados, setEditAlunosDados] = useState({});
  const [filtroAluno, setFiltroAluno] = useState("");
  const [periodoId, setPeriodoId] = useState(null);
  const [periodos, setPeriodos] = useState([]);
  const [cursoId, setCursoId] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [novoAluno, setNovoAluno] = useState({
                                              nome: "",
                                              email: "",
                                              telefone: "",
                                              matricula: "",
                                              periodo: { id: null },
                                              curso: { id: null }
  });
  const [modoEdicao, setModoEdicao] = useState(false);
  // eslint-disable-next-line
  const [mensagemErro, setMensagemErro] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
    } 

  }, [navegação]);


  const cadastrarAluno = (aluno) => {
    if (!novoAluno.senha) {
      const senhaAleatoria = uuidv4(); // Gera um valor aleatório único
      setNovoAluno({ ...novoAluno, senha: senhaAleatoria });
    }
    novoAluno.periodo = { id: periodoId };
    novoAluno.curso = { id: cursoId };
    const emailExistente = alunos.some(aluno => aluno.email === novoAluno.email);
    if (emailExistente) {
        alert("O e-mail informado já está sendo utilizado.");
        return;
    }
    axios
      .post('http://127.0.0.1:5000/api/aluno', aluno)
      .then((response) => {
        console.log(response.data);
        setModoEdicao(false);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoAluno((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const aluno = { ...novoAluno, periodo: { id: periodoId}, curso: { id: cursoId } };
    cadastrarAluno(aluno);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/periodo")
      .then((response) => setPeriodos(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/curso")
      .then((response) => setCursos(response.data))
      .catch((error) => console.log(error));
  }, []);


  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/aluno')
      .then((response) => setAlunos(response.data))
      .catch((err) => console.log(err));
  }, []);

  const removeAluno = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/aluno/${id}`)
      .then((response) => {
        const AttListaAlunos = alunos.filter((aluno) => aluno.id !== id);
        setAlunos(AttListaAlunos);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editAluno = (id) => {
    axios.get(`http://127.0.0.1:5000/api/aluno/${id}`)
      .then((response) => {
        setEditAlunosDados(response.data);
        setEditAlunosId(id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveEditAluno = () => {
    axios.put(`http://127.0.0.1:5000/api/aluno/${editAlunosId}`, editAlunosDados)
      .then((response) => {
        const updatedAlunos = alunos.map((aluno) => {
          if (aluno.id === editAlunosId) {
            return response.data;
          }
          return aluno;
        });
        setAlunos(updatedAlunos);
        setEditAlunosId(null);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.log(error);
          alert('Preencha todos os campos');
        }
      });
    };

    const filtro_Alunos = alunos.filter((aluno) =>
    aluno.nome && aluno.nome.toLowerCase().includes(filtroAluno.toLowerCase())
    );

    const adicionarAluno = () => {
      setModoEdicao(true);
      setMensagemErro("");
    };

  return (
    <>
    <SideBar />
      <main className={styles.conteudo}>
        <h1>Alunos</h1>
        {!editAlunosId &&(
        <form className={styles.form_filtro}>
          <input type="text" placeholder="Pesquisar" value={filtroAluno} onChange={(e) => setFiltroAluno(e.target.value)}/>
          <Button text="Adicionar" onClick={adicionarAluno}/>
        </form>
        )}
          {editAlunosId ? (
            <div className={styles.editForm}>
              <div className={styles.formGroup}>
                <label>Nome:</label>
                <input type="text" value={editAlunosDados.nome} onChange={(e) => setEditAlunosDados({ ...editAlunosDados, nome: e.target.value })} required/>
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input type="email" value={editAlunosDados.email} onChange={(e) => setEditAlunosDados({ ...editAlunosDados, email: e.target.value })} required/>
              </div>
              <div className={styles.formGroup}>
                <label>Período:</label>
                <select value={editAlunosDados.periodo.id} onChange={(e) => setEditAlunosDados({...editAlunosDados, periodo: { id: e.target.value }})}>
                  <option value="">Selecione um periodo</option>
                  {periodos.map((periodo) => (
                    <option key={periodo.id} value={periodo.id}>
                      {periodo.semestrereferencia}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Curso:</label>
                <select value={editAlunosDados.curso.id} onChange={(e) => setEditAlunosDados({...editAlunosDados, curso: { id: e.target.value }})}>
                  <option value="">Selecione um curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.nome}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={saveEditAluno}>Salvar</button>
            </div>   
          ) : (
            <section className={styles.section_tabela}>
              <table className={`${styles.table} ${modoEdicao ? styles.hidden : ""}`} style={{ display: modoEdicao ? "none" : "table" }}>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Periodo</th>
                    <th>Curso</th>
                  </tr>
                </thead>
                <tbody>
                  {filtro_Alunos.map((aluno) => (
                    <tr key={aluno.id}>
                      <td>{aluno.id}</td>
                      <td>{aluno.nome}</td>
                      <td>{aluno.email}</td>
                      <td>{aluno.periodo ? aluno.periodo.semestrereferencia : ""}</td>
                      <td>{aluno.curso ? aluno.curso.nome : ""}</td>
                      <div className={styles.icones}>
                        <button onClick={() => editAluno(aluno.id)} className={styles.icone1}>
                          <BsPencil />
                        </button>
                        <button onClick={() => removeAluno(aluno.id)} className={styles.icone2}>
                          <BsFillTrashFill />
                        </button>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
              {modoEdicao ? (
                <div className={styles.editForm}>
                <form  onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>  
                  <label>Nome:</label>
                    <input
                      type="text"
                      placeholder="Nome"
                      name="nome"
                      value={novoAluno.nome}
                      onChange={handleChange}
                      required
                    /></div>
                    <div className={styles.formGroup}>
                  <label>Email:</label>
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={novoAluno.email}
                      onChange={handleChange}
                      required
                    /></div>
                    <div className={styles.formGroup}>
                  <label>Período:</label>
                    <select
                      name="periodoId"
                      value={periodoId}
                      onChange={(e) => setPeriodoId(e.target.value)}
                      required
                    >
                      <option value="">Selecione um Período</option>
                      {periodos.map((periodo) => (
                        <option key={periodo.id} value={periodo.id}>
                          {periodo.semestrereferencia}
                        </option>
                      ))}
                    </select></div>
                    <div className={styles.formGroup}>
                  <label>Curso:</label>
                    <select
                      name="cursoId"
                      value={cursoId}
                      onChange={(e) => setCursoId(e.target.value)}
                      required
                    >
                      <option value="">Selecione um Curso</option>
                      {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id}>
                          {curso.nome}
                        </option>
                      ))}
                    </select></div>
                    <button type="submit" >Salvar</button>
                  </form></div>   
              ) : null}
            </section>
          )}
        </main>
    </>
  );
}

export default Alunos;
