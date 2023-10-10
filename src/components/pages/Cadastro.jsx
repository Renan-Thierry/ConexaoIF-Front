import FormCadastro from "../project/FormCadastro";
import styles from "./styles/Cadastro.module.css";
import logo from "../../img/connections.png"
import { Link } from "react-router-dom";

function Cadastro(){
    return(
            <main className={styles.container}>
                <div className={styles.conteudo_cadastro}>
                    <div className={styles.logo2}>
                        <img src={logo} alt='Logo do site' />
                        <h2>Conexão<span>IF</span></h2>
                    </div>
                    <h1>Conectando Saberes, Unindo Futuros</h1>
                    <p>Conheça o ConexãoIF, a sua plataforma de ligação entre professores e alunos!</p>
                    <Link to="/Login">
                        <h3>← Voltar para o inicio</h3>
                    </Link>
                </div>
                <div className={styles.formCadastro}>
                    <FormCadastro />
                </div>
            </main>      
    )
}
export default Cadastro;