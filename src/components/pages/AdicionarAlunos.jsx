import styles from './styles/AdicionarAlunos.module.css';
import React, { useEffect, useState } from "react";
import SideBar from "../utils/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import AlunoCard from "../project/AlunoCard";
import Swal from 'sweetalert2';

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

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      navegação("/Login");
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
    axios.post('http://127.0.0.1:5000/api/aluno', aluno)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const valorSemEspacos = value.replace(/[^a-zA-Z0-9@.]/g, '');
    setNovoAluno((prevState) => ({
      ...prevState, [name]: valorSemEspacos,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const aluno = { ...novoAluno, periodo: { id: periodoId}, curso: { id: cursoId } };
    cadastrarAluno(aluno);
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/periodo")
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
      Swal.fire({
        title: 'Você tem certeza?',
        text: "Se voce apagar não tem mais volta!",
        icon: 'Cuidado!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deletado!',
            'O aluno foi apagado com sucesso',
            'success'
          )}
        setAlunos(AttListaAlunos);
      })
      })
    .catch((error) => console.log(error));
  };

  const editAluno = (id) => {
    axios.get(`http://127.0.0.1:5000/api/aluno/${id}`)
    .then((response) => {
      setEditAlunosDados(response.data);
      setEditAlunosId(id);
      })
    .catch((error) => console.log(error));
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
  aluno.nome && aluno.nome.toLowerCase().includes(filtroAluno.toLowerCase()));

  const adicionarAluno = () => {
    setModoEdicao(!modoEdicao);
  };

  return (
    <>
    <SideBar />
      <main className={styles.conteudo}>
        <h1>Alunos</h1>
        {!editAlunosId &&(
        <form className={styles.form_filtro} style={{ display: modoEdicao ? 'none' : 'flex' }}>
          <input type="text" placeholder="Pesquisar" value={filtroAluno} onChange={(e) => setFiltroAluno(e.target.value)}/>
          <button type="button" onClick={adicionarAluno}>Adicionar</button>
        </form>
        )}
          {editAlunosId ? (
            <div className={styles.EditForm_Alunos}>
              <form className={styles.FormAlunos}>
              <h2>Editar Aluno</h2>
                <label>Nome:</label>
                <input type="text" value={editAlunosDados.nome} onChange={(e) => {
                  const nomeSemEspacosEspeciais = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                setEditAlunosDados({ ...editAlunosDados, nome: nomeSemEspacosEspeciais })}} required/>
                <label>Email:</label>
                <input type="email" minLength="3" value={editAlunosDados.email} onChange={(e) => {
                  const emailSemEspacosEspeciais = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '');
                setEditAlunosDados({ ...editAlunosDados, email: emailSemEspacosEspeciais })}} required/>
                <label>Período:</label>
                <select value={editAlunosDados.periodo.id} onChange={(e) => setEditAlunosDados({...editAlunosDados, periodo: { id: e.target.value }})}>
                  <option value="">Selecione um periodo</option>
                  {periodos.map((periodo) => (
                    <option key={periodo.id} value={periodo.id}>
                      {periodo.semestrereferencia}
                    </option>
                  ))}
                </select>
                <label>Curso:</label>
                <select value={editAlunosDados.curso.id} onChange={(e) => setEditAlunosDados({...editAlunosDados, curso: { id: e.target.value }})}>
                  <option value="">Selecione um curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.nome}
                    </option>
                  ))}
                </select>
                <button onClick={saveEditAluno}>Salvar</button>
              </form>
            </div>   
          ) : (
            <section className={styles.ListagemAlunos} style={{ display: modoEdicao ? 'none' : 'flex' }}>
              {filtro_Alunos.map((aluno) => (
                <AlunoCard key={aluno.id} nome={aluno.nome} email={aluno.email} periodo={aluno.periodo ? aluno.periodo.semestrereferencia : ""} curso={aluno.curso ? aluno.curso.nome : ""} edit={() => editAluno(aluno.id)} remove={() => removeAluno(aluno.id)}/>
              ))}
            </section>
          )
        } {modoEdicao && (
          <div className={styles.addAluno}>
            <form onSubmit={handleSubmit}> 
              <h2>Cadastrar Aluno</h2>
              <label>Nome:</label>
                <input type="text" minLength="3" maxLength="20" placeholder="Nome" name="nome" value={novoAluno.nome} onChange={handleChange} required />
              <label>Email:</label>
                <input type="email" placeholder="Email" name="email" value={novoAluno.email} onChange={handleChange} required />
              <label>Período:</label>
                <select name="periodoId" value={periodoId} onChange={(e) => setPeriodoId(e.target.value)} required>
                  <option value="">Selecione um Período</option>
                  {periodos.map((periodo) => (
                    <option key={periodo.id} value={periodo.id}>
                      {periodo.semestrereferencia}
                    </option>
                  ))}
                </select>
              <label>Curso:</label>
                <select name="cursoId" value={cursoId} onChange={(e) => setCursoId(e.target.value)} required >
                  <option value="">Selecione um Curso</option>
                  {cursos.map((curso) => (
                    <option key={curso.id} value={curso.id}>
                      {curso.nome}
                    </option>
                  ))}
                </select>
              <button type="submit" >Salvar</button>
            </form>
          </div>   
        )}
        </main>
    </>
  );
}

export default Alunos;