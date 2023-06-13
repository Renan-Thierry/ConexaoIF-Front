import FormCadastro from "../project/FormCadastro";
import styles from "./Cadastro.module.css"
import logo from '../../img/image_cadastro.gif'

function Cadastro(){
    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.content_left}>
                <img src={logo} alt="Login_image"/>
                </div>
                <div className={styles.content_form}>
                    <h1 className={styles.tittle_Cadastro}>Cadastre-se</h1>
                    <hr/>
                    <FormCadastro />
                </div>
            </div>
        </div>
        
    )
}
export default Cadastro;