import styles from  './styles/Lista.module.css'
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import SideBar from '../utils/SideBar';
import axios from 'axios';
import Select from 'react-select';


function Lista() {
  const navigate = useNavigate();

  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [grupoEscolhido, setGrupoEscolhido] = useState(null);
  const [novaLista, setNovaLista] = useState({
    alunosSelecionados: [],
    cursoId: '',
    grupoId: '',
  });
  const [gruposMensagem, setGruposMensagem] = useState([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      navigate("/Login");
    } 

  }, [navigate]);


  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/aluno')
      .then((response) => setAlunos(response.data))
      .catch((error) => console.log(error));

    axios
      .get('http://127.0.0.1:5000/api/curso')
      .then((response) => setCursos(response.data))
      .catch((error) => console.log(error));
  }, []);


  useEffect(() => {
    if (novaLista.cursoId !== '') {
      axios
        .get(`http://127.0.0.1:5000/api/grupo?curso_id=${novaLista.cursoId}`)
        .then((response) => {
          setGrupos(response.data);
          setGruposMensagem(response.data.map((grupo) => grupo.mensagem));
        })
        .catch((error) => console.log(error));
    }
  }, [novaLista.cursoId]);


  const handleCursoSelect = (selectedOption) => {
    setNovaLista({
      ...novaLista,
      cursoId: selectedOption.value,
      grupoId: '',
      cursoSelecionado: selectedOption, 

    });
  };


  const handleGrupoSelect = (selectedOption) => {
    const selectedGrupo = selectedOption ? selectedOption.value : null;
    setNovaLista({ ...novaLista, grupoId: selectedGrupo });
    setGrupoSelecionado(selectedGrupo);
    setGrupoEscolhido(selectedOption);

  };

  const handleAlunosSelect = (selectedOptions) => {
    setAlunosSelecionados(selectedOptions);
  };
  
  const generateJsonFile = () => {

    if (!novaLista.cursoId) {
      alert('Por favor, selecione um curso');
      return;
    }
  
    if (!grupoSelecionado) {
      alert('Por favor, selecione um grupo');
      return;
    }
  
    if (alunosSelecionados.length === 0) {
      alert('Por favor, selecione pelo menos um aluno');
      return;
    }
  
    const grupoId = novaLista.grupoId !== null ? novaLista.grupoId : '';

    const jsonData = {
      emails: alunosSelecionados.map((aluno) => ({
        id: aluno.value,
        tipo: 'aluno',
        email: aluno.email,
        link: grupoSelecionado ? grupoSelecionado.link : '',
        titulo: grupoSelecionado ? grupoSelecionado.titulo : '',
        curso_id: novaLista.cursoId,
        mensagem: grupoSelecionado ? grupoSelecionado.mensagem : '',
        grupo_id: grupoId,
      })),
    };

    const dataStr = JSON.stringify(jsonData, null, 2);
    const filePath = '//mnt//c//Users//marqu//OneDrive//Área de Trabalho//ConexaoIF//ConexaoIF-Back//helpers//utils//lista.json';
    
    axios
      .post('http://127.0.0.1:5000/api/salvar-json', { filePath, dataStr })
      .then(() => {
        navigate('/EmailForm');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
    <SideBar />
    <main>
    <h1>Mensagem</h1>
      <form className={styles.ConteudoLista}>
        <h2>Envio da Mensagem</h2>
            <div className={styles.selectDados}>
            <label>Curso:</label>
            <Select
              options={cursos.map((curso) => ({
                value: curso.id,
                label: curso.nome,
                className: styles.blueOption,
              }))}
              value={novaLista.cursoSelecionado}
              placeholder="Selecione o curso"
              onChange={handleCursoSelect}
              required />
            </div>
            <div className={styles.selectDados}>
            <label>Grupo:</label>
            <Select options={grupos.map((grupo, index) => ({
                value: grupo,
                label: grupo.titulo,
                className: styles.blueOption,
                mensagem: gruposMensagem[index], 
              }))}
              value={grupoEscolhido}
              onChange={handleGrupoSelect}
              placeholder="Selecione um grupo"
              required />
              </div>
            <div className={styles.selectDados}>
            <label>Alunos/Período:</label>
            <Select isMulti options={alunos.filter((aluno) => aluno.curso.id === novaLista.cursoId)
                .map((aluno) => ({
                  value: aluno.id,
                  label: aluno.nome + ' - ' + aluno.periodo.semestrereferencia,
                  className: styles.blueOption,
                  email: aluno.email,
                  link: '',
                  titulo: '',
                  curso_id: novaLista.cursoId,
                }))}
              value={alunosSelecionados}
              placeholder="Selecione os alunos/periodos"
              onChange={handleAlunosSelect}
              required />
              </div>
            <button onClick={generateJsonFile}>Gerar Lista</button>
          </form>
        </main>
    </>
  );
}

export default Lista;