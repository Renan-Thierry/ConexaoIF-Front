import styles from './styles/Home.module.css'
import logo2 from '../../img/Connected world-cuate.png'
import { Link } from 'react-router-dom'
import NavBar from '../utils/NavBar';

function Home() {
    return(
        <>
        <NavBar />
        <main className={styles.conteudo}>
            <section className={styles.sessao1}>
                <div>
                    <h1>Conexão<span>IF</span></h1>
                    <h2>Conectando alunos e professores na jornada acadêmica!</h2>
                    <Link to="/Login">
                        <button>Entre agora!</button>
                    </Link>
                </div>
                <img src={logo2} alt='Imagem inicial'/>
            </section>
            <section >
            </section>
        </main>
        </>
    )
}
export default Home;