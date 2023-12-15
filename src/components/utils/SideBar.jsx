import { useNavigate } from "react-router-dom";
import styles from './styles/SideBar.module.css';
import logo from '../../img/connections.png';
import { VscOrganization, VscSignOut, VscEdit, VscMail, VscInfo, VscAccount, VscHome } from "react-icons/vsc";
import { Link } from 'react-router-dom';

function SideBar() {
    const navegação = useNavigate();
    const logout = () => {
        localStorage.removeItem("accessToken");
        navegação("/Login");
    };
    return (
        <div className={styles.SideBar}>
            <ul>
                <li className={styles.logo}>
                    <Link to="/" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><img src={logo} alt='Logo do site' width='30px' /></span>
                        <span className={styles.titulo}>Conexao<span className={styles.spanIF}>IF</span></span>
                    </Link>
                </li>
                <li>
                    <Link to="/Inicio" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscHome /></span>
                        <span className={styles.titulo}>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/EditPerfil" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscEdit /></span>
                        <span className={styles.titulo}>Editar Perfil</span>
                    </Link>
                </li>
                <li>
                    <Link to="/EnvioDeMensagem" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscMail /></span>
                        <span className={styles.titulo}>Enviar Mensagem</span>
                    </Link>
                </li>
                <li>
                    <Link to="/ControleAlunos" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscOrganization /></span>
                        <span className={styles.titulo}>Controle de Alunos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Ajuda" style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscInfo /></span>
                        <span className={styles.titulo}>Guia De Usuario</span>
                    </Link>
                </li>

                <li className={styles.usuario}>
                    <Link to="/Login" style={{ color: 'inherit' }} onClick={logout}>
                        <span className={styles.icone}><VscSignOut /></span>
                        <span className={styles.titulo}>Sair</span>
                    </Link>
                </li>
                <li>
                    <Link style={{ color: 'inherit' }}>
                        <span className={styles.icone}><VscAccount /></span>
                        <span className={styles.titulo}>Usuario</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar;

