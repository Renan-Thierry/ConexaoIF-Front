import { useNavigate } from "react-router-dom";
import styles from './styles/SideBar.module.css';
import logo from '../../img/connections.png';
import { VscOrganization, VscSignOut, VscEdit, VscPersonAdd, VscMail, VscLinkExternal, VscInfo, VscAccount, VscHome } from "react-icons/vsc";
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
                    <Link to="/AdicionarAlunos" style={{ color: 'inherit' }}>    {/*to="/AdicionarAlunos"*/}
                        <span className={styles.icone}><VscPersonAdd /></span>
                        <span className={styles.titulo}>Adicionar Alunos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/GruposUser" style={{ color: 'inherit' }}>     {/*to="/GruposUser"*/}
                        <span className={styles.icone}><VscOrganization /></span>
                        <span className={styles.titulo}>Listar Grupos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/EnvioDeMensagem" style={{ color: 'inherit' }}>     {/*to="/Lista"*/}
                        <span className={styles.icone}><VscMail /></span>
                        <span className={styles.titulo}>Enviar Mensagem</span>
                    </Link>
                </li>
                <li>
                    <Link to="/AlunosConectados" style={{ color: 'inherit' }}>       {/*to="/AlunosConectados"*/}
                        <span className={styles.icone}><VscLinkExternal /></span>
                        <span className={styles.titulo}>Alunos Conectados</span>
                    </Link>
                </li>
                <li>
                    <Link to="/Ajuda" style={{ color: 'inherit' }}>        {/*to="/Sobre*/}
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
                    <Link style={{ color: 'inherit' }}>   {/*to="/Sobre"*/}
                        <span className={styles.icone}><VscAccount /></span>
                        <span className={styles.titulo}>Usuario</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SideBar;

