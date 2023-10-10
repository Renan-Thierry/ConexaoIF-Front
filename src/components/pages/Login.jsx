import FormLogin from '../project/FormLogin';
import styles from './styles/Login.module.css';
import logo from '../../img/connections.png'

function Login(){
    return(
        <main className={styles.conteudoLogin}>
            <div className={styles.conteudo1}>
                <div className={styles.logo}>
                    <img src={logo} alt='Logo do site' />
                    <h2>Conexão<span>IF</span></h2>
                </div>
                <h1>Faça seu login na plataforma</h1>
            </div>
            <div className={styles.formulario}>
                <FormLogin />
            </div>
        </main>
        
    )
}
export default Login;