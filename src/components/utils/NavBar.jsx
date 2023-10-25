import styles from './styles/NavBar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../img/connections.png';
import { VscAccount } from "react-icons/vsc";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from 'react';


function NavBar () {
  const [open , setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }
  return (
    <>
    <header className={styles.cabecalho}>
                <Link to="/">
                  <img src={logo} alt="Logo do site" className={styles.image}/>
                </Link>
                <div>
                  <RxHamburgerMenu className={styles.Menu_Hamburguer} onClick={handleOpen}/>
                  <nav className={`${styles.navbar} ${!open && styles.open}`}>
                      <ul>
                        <li>
                          <Link to="/" className={styles.item} style={{ color: 'inherit' }}>Home</Link>
                        </li>
                        <li>
                          <Link to="/" className={styles.item} style={{ color: 'inherit' }}>Vantagens</Link>
                        </li>
                        <li>
                          <Link to="/" className={styles.item} style={{ color: 'inherit' }}>Sobre</Link>
                        </li>
                        <li>
                          <Link to="/Login" className={`${styles.item} ${styles.item2}`} style={{ color: 'inherit' }}><VscAccount className={styles.btn_sair}/>Entrar</Link>
                        </li>
                        <li>
                        </li>
                      </ul>
                  </nav>
                </div>
      </header>
  </>
  )
}

export default NavBar;