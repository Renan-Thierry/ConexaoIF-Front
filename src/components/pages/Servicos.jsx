import { Link } from "react-router-dom";
import service1 from "../../img/img-services/servico3.png";
import service2 from "../../img/img-services/servico1.png";
import service3 from "../../img/img-services/servico2.png";
import NavBar from "../utils/NavBar";
import styles from "./styles/Serviços.module.css";

function Servicos(){
  return(
    <>
    <NavBar />
    <div className={styles.servicos_conteudo}>
      <h1>Serviços Disponíveis</h1>
      <ul>
        <li>
        <img src={service2} alt="serviço 1"/>
          <h2>Notificações</h2>
          <p>Envie mensagens automáticas usando Plataformas de mensagens instantâneas</p>
          <Link to="/Login">
            <button>Mais</button>
          </Link>
        </li>
        <li>
        <img src={service3} alt="serviço 2"/>
          <h2>ChatBOT</h2>
          <p>Configure perguntas e respostas automáticas e utilize todos os componentes do WhatsApp.</p>
          <Link to="/Login">
            <button>Mais</button>
          </Link>
        </li>
        <li>
        <img src={service1} alt="serviço 3"/>
          <h2>Alunos Satisteitos</h2>
          <p>Garanta a satisfação dos alunos oferecendo um serviço estável e de última geração.</p>
          <Link to="/Login">
            <button>Mais</button>
          </Link>
          </li>
      </ul>
    </div>
    </>
  )
}
export default Servicos;