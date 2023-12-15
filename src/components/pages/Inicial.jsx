import SideBar from "../utils/SideBar";
import { Link } from "react-router-dom";
import styles from "./styles/Inicial.module.css";
import chatbot from "../../img/Chatbot.gif";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Inicial() {
  const navegação = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navegação("/Login");
    }
  }, [navegação]);
  return (
    <>
      <SideBar />
      <section className={styles.Inicio_conteudo}>
        <h1>Home</h1>
        <div className={styles.Inicio_body}>
          <h1>Bem-vindo ao <span className={styles.spanIF}>Conexao<span className={styles.spanCNX}>IF</span></span></h1>
          <p>Comece a gerenciar os seus projetos agora mesmo!</p>
          <Link to="/EnvioDeMensagem">
            <button>Enviar Mensagens</button>
          </Link>
          <img src={chatbot} alt="imagem_animada" />
        </div>
      </section>
    </>
  )
}
export default Inicial;