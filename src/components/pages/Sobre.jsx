import SideBar from '../form/SideBar';
import styles from  '../styles/Sobre.module.css'
import {FaGithub} from 'react-icons/fa'

function Sobre() {
    return(
        <>
        <SideBar />
        <div className={styles.container}>
            <h1 className={styles.tittle_text}>Sobre o Projeto</h1>
            <p> O Projeto DocDis tem como objetivo estabelecer uma rede de comunicacao interna entre professores 
            e alunos por meio de mensagens instantaneas, visando facilitar a transição dos novos alunos para o 
            ambiente acadêmico do campus. A ideia principal do aplicativo é permitir que os professores criem grupos 
            específicos para cada turma do primeiro período e adicionem os alunos recém-chegados a esses grupos.<br /></p>
            <p> Com o aplicativo, os alunos terão a oportunidade de interagir diretamente com os professores e outros
            colegas de turma, tirar dúvidas, receber informações importantes sobre a grade curricular, cronogramas
            de aulas, atividades e projetos. Além disso, os professores também poderão compartilhar materiais de 
            estudo, realizar discussões em grupo e fornecer orientações relevantes para ajudar os alunos a se 
            adaptarem rapidamente ao ambiente acadêmico.</p>
        </div>
        <div className={styles.conteudoIcon}>
            <h3>Saiba mais do Projeto</h3>
            <FaGithub size="60px" color="white"/>
        </div>
        </>
    )
}

export default Sobre;