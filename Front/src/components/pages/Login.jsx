import FormLogin from '../project/FormLogin';
import styles from './Login.module.css';
import { Link } from "react-router-dom";

function Login(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content_left}>
                <h1 className={styles.tittle_left}>Ainda nao possui uma conta?</h1>
                    <Link to="/Cadastro">
                        <button className={styles.button_left}>Cadastre-se</button>
                    </Link>
                </div>
                <div className={styles.content_form}>
                    <h1 className={styles.tittle_Login}>Login</h1>
                    <hr className={styles.hrtg}/>
                    <FormLogin />
                </div>
            </div>
        </div>
    )
}
export default Login;