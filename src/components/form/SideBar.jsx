import styles from './SideBar.module.css';
import logo from '../../img/connections.png';
import { VscOrganization, VscAccount, VscSignOut, VscEdit, VscPersonAdd, VscMail, VscBook, VscInfo } from "react-icons/vsc";
import { Link } from 'react-router-dom';

function SideBar() {
    return(
        <div className={styles.SideBar}>
            <ul>
                
                <li className={styles.logo}>
                    <Link to="/" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><img src={logo} alt='Logo do site' width='30px'/></span>
                        <span className={styles.titulo}>Conexao<span className={styles.spanIF}>IF</span></span>
                    </Link>
                </li>
                <li>
                    <Link to="/EditPerfil" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscEdit /></span>
                        <span className={styles.titulo}>Editar Perfil</span>
                    </Link>
                </li>
                <li>
                    <Link to="/AdicionarAlunos" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscPersonAdd /></span>
                        <span className={styles.titulo}>Adicionar Alunos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/GruposUser" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscOrganization /></span>
                        <span className={styles.titulo}>Listar Grupos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Lista" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscMail /></span>
                        <span className={styles.titulo}>Enviar Mensagem</span>
                    </Link>
                </li>
                <li>
                    <Link to="/GuiaUsuario" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscBook /></span>
                        <span className={styles.titulo}>Guia do Usuario</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Sobre" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscInfo /></span>
                        <span className={styles.titulo}>Sobre</span>
                    </Link>
                </li>
                <li className={styles.usuario}>
                    <Link to="" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscAccount /></span>
                        <span className={styles.titulo}>Usuario</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Login" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscSignOut /></span>
                        <span className={styles.titulo}>Sair</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar;