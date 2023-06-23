import styles from './Home.module.css'
import logo2 from '../../img/www.gif'
import NavBar from '../form/NavBar';
import { Link } from 'react-router-dom'

function Home() {
    return(
        <div className={styles.container}>
            <NavBar />
        <main className={styles.conteudo}>
            <section className={styles.sessao1}>
                <div className={styles.conteudo1}>
                    <h1 className={styles.conteudo_titulo}>DocDis</h1>
                    <h2 className={styles.conteudo_subTitulo}>conectando alunos e professores na jornada acadêmica!</h2>
                    <Link to=""><button className={styles.btn}>Criar Grupo</button></Link>
                </div>
                <img src={logo2} alt='Imagem inicial' className={styles.image2}/>
            </section>
        </main>
        </div>
    )
}
export default Home;