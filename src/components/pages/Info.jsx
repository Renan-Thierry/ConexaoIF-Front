import { Link } from "react-router-dom";
import AdminNavBar from "../form/AdminNavBar";
import styles from './Info.module.css';
function Grupos() {
  
  return (
    <>
      <div className={styles.container}>
      <AdminNavBar />
        <div className={styles.conteudo_Info}>
        <h1>Informações</h1>
        <main className={styles.content}>
          <Link to="/Professor">
            <button>Professores</button>
          </Link>
          <Link to="/Coordenador">
            <button>Coordenadores</button>
          </Link>
          <Link to="/Alunos">
            <button>Alunos</button>
          </Link>
          <Link to="/Curso">
            <button>Cursos</button>
          </Link>
          <Link to="/Mensagem">
            <button>Mensagens</button>
          </Link>
          <Link to="/Instituicao">
            <button>Instituições</button>
          </Link>
          <Link to="/Endereco">
            <button>Endereços</button>
          </Link>
          <Link to="/Periodos">
            <button>Periodos</button>
          </Link>
          <Link to="/Grupo">
            <button>Grupos</button>
          </Link>
          <Link to="/Pessoas">
            <button>Pessoas</button>
          </Link>
        </main>
        </div>
      </div>
    </>
  );
}

export default Grupos;
