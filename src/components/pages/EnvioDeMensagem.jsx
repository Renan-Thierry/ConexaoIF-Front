import SideBar from "../utils/SideBar";
import styles from "../pages/styles/EnvioDeMensagem.module.css";
import logo1 from "../../img/google-mail-gmail-icon-logo-symbol-free-png.webp";
import logo2 from "../../img/dow.png";
import logo3 from "../../img/pngtree-whatsapp-icon-png-image_6315990.png";
import seta from "../../img/seta-direita.png";
import iconeInicial from "../../img/Connected world-pana.png";
import { useState } from "react";
import Swal from "sweetalert2";
import { CiExport } from "react-icons/ci";
import emailJs from "@emailjs/browser";
import Papa from "papaparse";

function AddAlunosNV() {
    const [envioWhats, setEnvioWhats] = useState([]);
    const [whatsSelect, setWhatsSelect] = useState(false);
    const [gmailSelect, setGmailSelect] = useState(false);
    const [dadosCSV, setDadosCSV] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [adcDados, setAdcDados] = useState({
        "number": "",
        "message": "",
    });

    const lerArquivoCSV = (e) => {
        const arquivo = e.target.files[0];
        if(arquivo){
            Papa.parse(arquivo, {
                header: true,
                dynamicTyping: true,
                complete: (resultado) => {
                    console.log(resultado);
                    setDadosCSV(resultado.data);
                }, error: (err) => {console.log("erro ao analizar arquivo. ", err.message);}
            })
        }
    }

    const addMsgWhatsapp = () => {
        fetch("http://localhost:8000/zdg-message", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(adcDados),
        })
        .then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('Erro na solicitação');
            }
        })
        .then((data) => {
            setEnvioWhats([...envioWhats, adcDados]);
            setAdcDados({
                "number": "",
                "message": "",
            });
            Swal.fire({position: 'top-end', icon: 'success', background: 'rgb(18, 18, 20)', color: '#fff',title: 'Mensagem enviada Com Sucesso!', showConfirmButton: false, timer: 2000
            });
        })
        .catch((error) => {
            console.error(error);
            Swal.fire({position: 'top-end', icon: 'error', background: 'rgb(18, 18, 20)', color: '#fff',title: 'Erro ao enviar a mensagem!', showConfirmButton: false, timer: 2000
            });
        })}    
    const addMsgGmail = (e) => {
        const templateParams = {
            from_name: name,
            message: adcDados.message,
            email: email
        }
        emailJs.send("service_hlezrvc", "template_wwr3hut", templateParams, "clKqPhO6kEiL3SRi_")
        .then((resp) => {
            console.log("mensagem enviada ", resp.status, resp.text);
        }, (err) => { 
            console.log("erro ", err );
        })
    }

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
                            <input id="check1" type="checkbox" checked={gmailSelect} onChange={() => setGmailSelect(!gmailSelect)}/>
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
                    {!whatsSelect && !gmailSelect && (
                        <div className={styles.tela_inicio}>
                        <img src={iconeInicial} alt="Tela do inicio das mensagens" />
                        <h1>Selecione uma Plataforma</h1>
                    </div>
                    )}
                    {gmailSelect && (
                        <div>
                            <h3>Envio de Mensagens(Multíplos Alunos):</h3>
                            <label htmlFor="arquivo" className={styles.inputfile}>
                                <CiExport />
                                <span>Fazer upload de arquivo</span>
                            </label>
                            <input type="file" accept=".csv" id="arquivo" name="arquivo" onChange={lerArquivoCSV}/>
                            <h3>Envio de Mensagem(Aluno Único):</h3>
                            <input type="email" placeholder="example.@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <h3>Digite seu Nome:</h3>
                            <input type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        )}
                    {whatsSelect && (
                        <div>
                        <h3>Envio de Mensagens(Multíplos Alunos):</h3>
                        <label htmlFor="arquivo" className={styles.inputfile}>
                            <CiExport />
                            <span>Fazer upload de arquivo</span>
                        </label>
                        <input type="file" accept=".csv" id="arquivo" name="arquivo" />
                        <h3>Envio de Mensagem(Aluno Único):</h3>
                        <input type="number" placeholder="DDD + NUMERO" value={adcDados.number} onChange={(e) => setAdcDados({ ...adcDados, number: e.target.value })}/>
                        <h3>Escanear QrCode:</h3>
                            <a href="http://localhost:8000/" target="_blank" without rel="noreferrer">Clique aki</a>
                        </div>
                    )}
                </section>
                <img src={seta} alt="Seta" width="60px" className={styles.seta}/>
                <section className={styles.sessao2}>
                    <h3>Enviar arquivo:</h3>
                    <label htmlFor="arquivo">
                        <CiExport />
                        <span>Fazer upload de arquivo</span>
                    </label>
                    <input type="file" id="arquivo" name="arquivo" />
                    <h3>Digite sua Mensagem:</h3>
                    <textarea placeholder="Escreva Sua Mensagem..." value={adcDados.message} onChange={(e) => setAdcDados({ ...adcDados, message: e.target.value})}></textarea>
                    {!gmailSelect && !whatsSelect && (
                        <button style={{ background: 'grey' }} disabled>Enviar</button>
                    )}
                    {whatsSelect && (
                        <button onClick={addMsgWhatsapp}>Enviar</button>
                    )}
                    {gmailSelect && (
                        <button onClick={addMsgGmail}>Enviar</button>
                    )}
                </section>
            </div>    
        </main>
        </>
    )
}
export default AddAlunosNV;