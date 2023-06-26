import FormLogin from '../project/FormLogin';
import styles from '../styles/Login.module.css';
import { Link } from "react-router-dom";
import logo from '../../img/connections.png'

function Login(){
    return(
            <div className={styles.conteudoLogin}>
                <div className={styles.titulo}>
                    <h1>Conexao<span>IF</span></h1>
                    <p>Conectando de forma rapida e eficiente Professores e alunos na sua jornada acadêmica.</p>
                </div>
                <div className={styles.formulario}>
                    <img src={logo} alt="Logo do site" />
                        <FormLogin />
                    <hr/>
                    <h3>Ainda não tem acesso?</h3>
                    <Link to="/Cadastro"><button className={styles.botaoCadastro}>Cadastrar</button></Link>
                </div>
        </div>
        
    )
}
export default Login;