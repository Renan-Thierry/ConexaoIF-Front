import SideBar from "../utils/SideBar";
import styles from "../pages/styles/AdicionarAlunosNV.module.css";
import logo1 from "../../img/google-mail-gmail-icon-logo-symbol-free-png.webp";
import logo2 from "../../img/dow.png";
import logo3 from "../../img/pngtree-whatsapp-icon-png-image_6315990.png"
import { useState } from "react";
import Swal from "sweetalert2";

function AddAlunosNV() {
    const [envioWhats, setEnvioWhats] = useState([]);
    const [adcDados, setAdcDados] = useState({
        "number": "",
        "message": "",
    });
    const [whatsSelect, setWhatsSelect] = useState(false);

        const addMsgWhatsapp = () => {
            fetch("http://localhost:3001/Mensagens", {method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: JSON.stringify(adcDados),
            })
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                setEnvioWhats([...envioWhats, adcDados]);
                setAdcDados({
                    "number": "",
                    "message": "",
                });
            })
            Swal.fire({
                position: 'center',
                icon: 'success',
                background: 'rgb(18, 18, 20)',
                color: '#fff',
                title: 'Mensagem enviada Com Sucesso!',
                showConfirmButton: false,
                timer: 2000
              })}

    return(
        <>
        <SideBar />
        <main className={styles.main_content}>
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
                            <input id="check3" type="checkbox" checked={whatsSelect} onChange={() => setWhatsSelect(!whatsSelect)}/>
                        </div>
                    </div>
                    <h2>Envio de Mensagens(Multiplos Alunos):</h2>
                    <input type="file" id="file"/>
                <h2>Envio de Mensagem(Aluno Unico):</h2>
                <input type="number" placeholder="DDD + NUMERO" value={adcDados.number} onChange={(e) => setAdcDados({ ...adcDados, number: e.target.value })}/>
                {whatsSelect && (
                    <>
                    <h2>Escanear QrCode:</h2>
                    <button>
                        <a href="http://localhost:8000/" target="_blank" without rel="noreferrer">Clique aki</a>
                    </button>
                    </>
                )}
                </section>
                <section className={styles.sessao2}>
                    <h2>Digite sua Mensagem:</h2>
                    <textarea placeholder="Escreva Sua Mensagem..." value={adcDados.message} onChange={(e) => setAdcDados({ ...adcDados, message: e.target.value })}></textarea>
                    <button onClick={addMsgWhatsapp}>Enviar</button>
                </section>
            </div>    
        </main>
        </>
    )
}
export default AddAlunosNV;