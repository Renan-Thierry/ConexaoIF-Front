import React, { useState } from "react";
import styles from './UserNavBar.module.css' 
import { Link } from "react-router-dom";
import logo from '../../img/icone_usuario.png'

function UserNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button onClick={toggleSidebar}>
      <Link to="/" style={{ color: 'inherit' }}>
        <img src={logo} alt="Logo do site" className={styles.image}/>
    </Link>
      </button>
      
        <nav className={styles.UserNavbar}>
            <Link to="/EditPerfil" className={styles.item} style={{ color: 'inherit' }}>Editar Perfil</Link>
            <Link to="/GruposUser" className={styles.item} style={{ color: 'inherit' }}>Listar Grupos</Link>
            <Link to="/" className={`${styles.item} ${styles.item2}`} style={{ color: 'inherit' }}>Sair</Link>
        </nav>
    </div>
  );
}

export default UserNavBar;
