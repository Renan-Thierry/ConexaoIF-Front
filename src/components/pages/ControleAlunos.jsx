//import axios from "axios";
import { useEffect, useState } from "react";
import SideBar from "../utils/SideBar";
import styles from "./styles/ControleAlunos.module.css";
import imgAlunos from "../../img/blog_mini_4.jpg"

function ControleAlunos() {
  const [dadosAluno, setDadosAlunos] = useState([]);
  const [alunoFiltro, setAlunoFiltro] = useState({ nome: "" });

  useEffect(() => {
    fetch("http://localhost:3001/Mensagens")
      .then((resp) => resp.json())
      .then((data) => {
        setDadosAlunos(data);
        console.log("Dados obtidos: ", data);
      })
      .catch((error) => {
        console.error("Erro ao obter dados de http://localhost:3001/Mensagens:", error);
      });
  }, [])

  const Filtro_Aluno = dadosAluno[0] ? dadosAluno[0].filter((aluno) => {
    const termoFiltro = alunoFiltro.nome.toLowerCase(); // Converter para minúsculas para uma comparação sem distinção entre maiúsculas e minúsculas

    return (
      (aluno.nome && aluno.nome.toLowerCase().startsWith(termoFiltro)) ||
      (aluno.periodo && aluno.periodo.toString().charAt(0).includes(termoFiltro))
    );
  }) : [];


  return (
    <>
      <SideBar />
      <main className={styles.main_controleAL}>
        <h1>Controle de Alunos</h1>
        <form className={styles.form_filtro}>
          <input type="text" placeholder="Pesquisar" value={alunoFiltro.nome} onChange={(e) => setAlunoFiltro({ nome: e.target.value })} />
        </form>
        <section className={styles.section_tabela}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Nome</th>
                <th>Email</th>
                <th>Número</th>
                <th>Matricula</th>
                <th>Periodo</th>
                <th>Curso</th>
              </tr>
            </thead>
            <tbody>
              {Filtro_Aluno.map((alunos) => {
                return (
                  <tr key={alunos.id}>
                    <td><img src={imgAlunos} alt="Imagem Aluno" /></td>
                    <td>{alunos.nome}</td>
                    <td>{alunos.email}</td>
                    <td>{alunos.numero}</td>
                    <td>{alunos.matricula}</td>
                    <td>{alunos.periodo}</td>
                    <td>{alunos.curso}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      </main>
    </>
  )
}
export default ControleAlunos;