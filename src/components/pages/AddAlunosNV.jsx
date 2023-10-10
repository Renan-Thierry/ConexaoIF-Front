import SideBar from "../utils/SideBar";
import styles from "../pages/styles/AdicionarAlunosNV.module.css";
import logo1 from "../../img/google-mail-gmail-icon-logo-symbol-free-png.webp";
import logo2 from "../../img/download.png";
import logo3 from "../../img/pngtree-whatsapp-icon-png-image_6315990.png"
import { useEffect, useState } from "react";
import axios from "axios";

function AddAlunosNV() {
    const [envioWhats, setEnvioWhats] = useState([]);
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const [caption, seCaption] = useState('');

    useEffect(() => {
        fetch("http://localhost:5000/Mensagens", {method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }})
        .then(resp => resp.json())
        .then((data) => {
            setEnvioWhats(data)
        })
        }, [])

    const addMsg = () => {
        const adcDados = {number, message, caption}
        fetch("http://localhost:5000/Mensagens", {method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
        .then((resp) => alert("Dados enviados"))
        .cath((err) => console.log(err))
    })
    }

    return(
        <>
        <SideBar />
        <main className={styles.main_content}>
        {console.log(envioWhats)}
            <h1>Enviar Mensagens</h1>
            <div className={styles.AddAlunos_conteudo}>
                <section className={styles.sessao1}>
                    <div className={styles.icons}>
                        <div>
                            <label htmlFor="check1"><img src={logo1} alt="icone-gmail" width="50px"/></label>
                            <input id="check1" type="checkbox" />
                        </div>
                        <div>
                            <label htmlFor="check2"><img src={logo2} alt="icone-telegram" width="50px"/></label>
                            <input id="check2" type="checkbox" />
                        </div>
                        <div>
                            <label htmlFor="check3"><img src={logo3} alt="icone-whatsapp" width="50px"/></label>
                            <input id="check3" type="checkbox" />
                        </div>
                    </div>

                    <h2>Envio de Mensagens(Multiplos Alunos):</h2>
                    <input type="file" id="file"/>
                <h2>Envio de Mensagem(Aluno Unico):</h2>
                <input type="number" placeholder="DDD + NUMERO"/>
                </section>
                <section className={styles.sessao2}>
                    <h2>Digite sua Mensagem:</h2>
                    <textarea placeholder="Escreva Sua Mensagem..."></textarea>
                    <button onClick={addMsg}>Enviar</button>
                </section>
            </div>
            
        </main>
        </>
    )
}
export default AddAlunosNV;