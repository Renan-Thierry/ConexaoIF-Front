import styles from './Tables.module.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavBar from '../../form/AdminNavBar';
import axios from 'axios';
import Select from 'react-select';

function Lista() {
  // Estados para armazenar os dados dos alunos, cursos, grupos, alunos selecionados, grupo selecionado,
  // nova lista de alunos, mensagem de sucesso e grupos mensagem
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [alunosSelecionados, setAlunosSelecionados] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);
  const [novaLista, setNovaLista] = useState({
    alunosSelecionados: [],
    cursoId: '',
    grupoId: '',
  });
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [gruposMensagem, setGruposMensagem] = useState([]);
  const [isButtonClicked, setButtonClicked] = useState(false);

  // useEffect para carregar os dados dos alunos e cursos ao renderizar o componente
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

  // useEffect para carregar os grupos quando um curso é selecionado na nova lista
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

  // Função para lidar com a seleção de um curso
  const handleCursoSelect = (selectedOption) => {
    setNovaLista({
      ...novaLista,
      cursoId: selectedOption.value,
      grupoId: '',
    });
  };

  // Função para lidar com a seleção de um grupo
  const handleGrupoSelect = (selectedOption) => {
    const selectedGrupo = selectedOption ? selectedOption.value : null;
    setNovaLista({ ...novaLista, grupoId: selectedGrupo });
    setGrupoSelecionado(selectedGrupo);
  };

  // Função para lidar com a seleção de alunos
  const handleAlunosSelect = (selectedOptions) => {
    setAlunosSelecionados(selectedOptions);
  };
 
  // Função para gerar o arquivo JSON
  const generateJsonFile = () => {
    setButtonClicked(true);

    const jsonData = {
      emails: alunosSelecionados.map((aluno) => ({
        id: aluno.value,
        tipo: 'aluno',
        email: aluno.email,
        link: grupoSelecionado ? grupoSelecionado.link : '',
        titulo: grupoSelecionado ? grupoSelecionado.titulo : '',
        curso_id: novaLista.cursoId,
        mensagem: grupoSelecionado ? grupoSelecionado.mensagem : '',
      })),
    };

    const dataStr = JSON.stringify(jsonData, null, 2);
    const filePath = 'C:\\Users\\wanderson\\Documents\\back-end\\lista.json';

    axios
      .post('http://127.0.0.1:5000/api/salvar-json', { filePath, dataStr })
      .then(() => {
        setMensagemSucesso("Dados gerado com sucesso!");
      })
      .catch((error) => {
        console.log(error);
        setMensagemSucesso("Erro ao gerar o arquivo JSON.");
      });
  };

  
  return (
    <>
      <div className={styles.containerAdminNavBar}>
        <AdminNavBar />
        <div className={styles.container}>
          <main>
            <h1>Formulário de Lista de Alunos</h1>
            <div className={styles.conteudo}>{/* Content */}</div>
            <div>
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Curso:</label>
                  <Select
                    options={cursos.map((curso) => ({
                      value: curso.id,
                      label: curso.nome,
                      className: styles.blueOption,
                    }))}
                    value={cursos.find((curso) => curso.id === novaLista.cursoId)}
                    onChange={handleCursoSelect}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Grupo:</label>
                  <Select
                    options={grupos.map((grupo, index) => ({
                      value: grupo,
                      label: grupo.titulo,
                      className: styles.blueOption,
                      mensagem: gruposMensagem[index], // Retrieve the mensagem from gruposMensagem array
                    }))}
                    value={grupoSelecionado}
                    onChange={handleGrupoSelect}
                    placeholder="Selecione um grupo"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label style={{ color: 'white' }}>Alunos/Período:</label>
                  <Select
                    isMulti
                    options={alunos
                      .filter((aluno) => aluno.curso.id === novaLista.cursoId)
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
                    onChange={handleAlunosSelect}
                  />
                </div>
              </div>
              <div>
                <div></div>
                <div>
        <br />
        <button onClick={generateJsonFile}>Gerar</button>
        </div>
        <div>
        <br />
        {mensagemSucesso && <p>{mensagemSucesso}</p>}
        {isButtonClicked ? (
        <Link to="/EmailForm">Ir para o Bot-email</Link>
        ) : (
          <span>Bloqueado - Gerar arquivo antes</span>
         )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Lista;