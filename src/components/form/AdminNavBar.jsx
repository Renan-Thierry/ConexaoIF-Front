import React, { useState } from "react";
import styles from './AdminNavBar.module.css' 
import { Link } from "react-router-dom";
import logo from '../../img/connections.png'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button onClick={toggleSidebar}>
      <Link to="/" style={{ color: 'inherit' }}>
        <img src={logo} alt="Logo do site" className={styles.image}/>DocDis
    </Link>
      </button>
      
        <nav className={styles.navbar}>
            <Link to="/" className={styles.item} style={{ color: 'inherit' }}>Home</Link>
            <Link to="/Info" className={styles.item} style={{ color: 'inherit' }}>Info</Link>
            <Link to="/ChatBot" className={styles.item} style={{ color: 'inherit' }}>Grupos</Link>
            <Link to="/Sobre" className={styles.item} style={{ color: 'inherit' }}>Sobre</Link>
            <Link to="/Login" className={`${styles.item} ${styles.item2}`} style={{ color: 'inherit' }}>Entrar</Link>

        </nav>
    </div>
  );
}

export default Sidebar;
