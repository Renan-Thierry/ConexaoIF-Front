import SideBar from "../utils/SideBar";
import styles from "../pages/styles/EnvioDeMensagem.module.css";
import logo1 from "../../img/google-mail-gmail-icon-logo-symbol-free-png.webp";
import logo2 from "../../img/dow.png";
import logo3 from "../../img/pngtree-whatsapp-icon-png-image_6315990.png";
import seta from "../../img/seta-direita.png";
import iconeInicial from "../../img/Connected world-pana.png";
import { useState } from "react";
import Swal from "sweetalert2";
import { CiExport, CiFaceSmile } from "react-icons/ci";
import emailJs from "@emailjs/browser";
import Papa from "papaparse";
import axios from 'axios';

function AddAlunosNV() {
    const [envioWhats, setEnvioWhats] = useState([]);
    const [whatsSelect, setWhatsSelect] = useState(false);
    const [gmailSelect, setGmailSelect] = useState(false);
    const [telegramSelect, setTelegramSelect] = useState(false);
    const [dadosCSV, setDadosCSV] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [adcDados, setAdcDados] = useState({
        "number": "",
        "message": "",
    });

    const lerArquivoCSV = (e) => {
        const arquivo = e.target.files[0];
        if (arquivo) {
            Papa.parse(arquivo, {
                header: true,
                dynamicTyping: true,
                complete: (resultado) => {
                    setDadosCSV(resultado.data);
                    enviarDadosCSVParaAPI(resultado.data);
                }, error: (err) => { console.log("erro ao analizar arquivo. ", err.message); }
            })
        }
    }
    const enviarDadosCSVParaAPI = (data) => {
        if (data.length > 0) {
            fetch("http://localhost:3001/Mensagens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log("Dados CSV enviados para a API:", data);
                })
                .catch((error) => {
                    console.error("Erro ao enviar dados CSV para a API:", error);
                });
        }
    };

    const addMsgWhatsapp = () => {
        if (adcDados.number) {
            fetch("http://localhost:8000/zdg-message", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adcDados),
            })
                .then((resp) => resp.json())
                .then((data) => {
                    setEnvioWhats([...envioWhats, adcDados]);
                    setAdcDados({
                        "number": "",
                        "message": "",
                    });
                    Swal.fire({ position: 'top-end', icon: 'success', background: 'rgb(18, 18, 20)', color: '#fff', title: 'Mensagem enviada com sucesso!', showConfirmButton: false, timer: 2000 });
                })
                .catch((error) => {
                    console.error(error);
                    Swal.fire({ position: 'top-end', icon: 'error', background: 'rgb(18, 18, 20)', color: '#fff', title: 'Erro ao enviar a mensagem!', showConfirmButton: false, timer: 2000 });
                });
        } else if (dadosCSV.length > 0) {
        }
    }

    const addMsgGmail = () => {
        if (email) {
            const templateParams = {
                from_name: name,
                message: adcDados.message,
                email: email,
            };
            emailJs.send("service_hlezrvc", "template_wwr3hut", templateParams, "clKqPhO6kEiL3SRi_")
                .then((resp) => {
                    console.log("Mensagem enviada para", email, resp.status, resp.text);
                    setAdcDados({
                        "number": "",
                        "message": "",
                    });
                    Swal.fire({ position: 'top-end', icon: 'success', background: 'rgb(18, 18, 20)', color: '#fff', title: 'Mensagem enviada com sucesso!', showConfirmButton: false, timer: 2000, });
                })
                .catch((err) => {
                    console.error("Erro ao enviar mensagem para", email, ":", err);
                    Swal.fire({
                        position: 'top-end', icon: 'error', background: 'rgb(18, 18, 20)', color: '#fff', title: 'Erro ao enviar a mensagem!', showConfirmButton: false, timer: 2000,
                    });
                });
            setEmail("");
        } else if (dadosCSV.length > 0) {
            let index = 0;
            const enviarEmail = () => {
                const dadosAluno = dadosCSV[index];
                const templateParams = {
                    from_name: name,
                    message: adcDados.message,
                    email: dadosAluno.email,
                };
                emailJs.send("service_hlezrvc", "template_wwr3hut", templateParams, "clKqPhO6kEiL3SRi_")
                    .then((resp) => {
                        console.log("Mensagem enviada para", dadosAluno.email, resp.status, resp.text);
                        index++;
                        if (index < dadosCSV.length) {
                            setTimeout(enviarEmail, 5000);
                        } else {
                            console.log("Todas as mensagens foram enviadas com sucesso.");
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao enviar mensagem para", dadosAluno.email, ":", err);
                        index++;
                        if (index < dadosCSV.length) {
                            setTimeout(enviarEmail, 5000);
                        } else {
                            console.log("Todas as mensagens foram enviadas ou ocorreram erros.");
                        }
                    });
            };
            enviarEmail();
        } else {
            console.warn("Nenhum dado no CSV para enviar e-mails.");
        }
    };
    const addMsgTelegram = async () => {
        const botToken = '6670122612:AAHukvvuFhZfk56x1cgiqlZUwQIB9fYb720';
        const chatId = '1609132344';
        try {
            if (!botToken || !chatId) {
                throw new Error('Token do bot ou ID do chat ausentes.');
            }
            const response = await axios.post(
                `https://api.telegram.org/bot${botToken}/sendMessage`,
                {
                    chat_id: chatId,
                    text: adcDados.message,
                }
            );
            console.log('Mensagem enviada:', response.data);
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error.message);
        }
    };

    const enviarMensagens = () => {
        if (whatsSelect) {
            addMsgWhatsapp();
        }

        if (gmailSelect) {
            addMsgGmail();
        }
        if (telegramSelect) {
            addMsgTelegram();
        }
    };

    return (
        <>
            <SideBar />
            <main className={styles.main_content}>
                <h1>Enviar Mensagens</h1>
                <div className={styles.AddAlunos_conteudo}>
                    <section className={styles.sessao1}>
                        <div className={styles.icons}>
                            <div>
                                <label htmlFor="check1"><img src={logo1} alt="icone-gmail" width="50px" /></label>
                                <input id="check1" type="checkbox" checked={gmailSelect} onChange={() => setGmailSelect(!gmailSelect)} />
                            </div>
                            <div>
                                <label htmlFor="check2"><img src={logo2} alt="icone-telegram" width="50px" /></label>
                                <input id="check2" type="checkbox" checked={telegramSelect} onChange={() => setTelegramSelect(!telegramSelect)} />
                            </div>
                            <div>
                                <label htmlFor="check3"><img src={logo3} alt="icone-whatsapp" width="50px" /></label>
                                <input id="check3" type="checkbox" checked={whatsSelect} onChange={() => setWhatsSelect(!whatsSelect)} />
                            </div>
                        </div>
                        {!whatsSelect && !gmailSelect && !telegramSelect && (
                            <div className={styles.tela_inicio}>
                                <img src={iconeInicial} alt="Tela do inicio das mensagens" />
                                <h1>Selecione uma Plataforma</h1>
                            </div>
                        )}
                        {gmailSelect && (
                            <div>
                                <h3>Envio de Mensagens(Multíplos Alunos):</h3>
                                <label htmlFor="arquivo" className={styles.inputfile}>
                                    {dadosCSV.length ? (
                                        <div>
                                            <CiFaceSmile />
                                            <span>Arquivo Selecionado</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <CiExport />
                                            <span>Fazer upload de arquivo</span>
                                        </div>
                                    )}
                                </label>
                                <input type="file" accept=".csv" id="arquivo" name="arquivo" onChange={lerArquivoCSV} />
                                <h3>Envio de Mensagem(Aluno Único):</h3>
                                <input type="email" placeholder="example.@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <h3>Digite seu Nome:</h3>
                                <input type="text" placeholder="Digite seu nome" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        )}
                        {whatsSelect && (
                            <div>
                                <h3>Envio de Mensagens(Multíplos Alunos):</h3>
                                <label htmlFor="arquivo" className={styles.inputfile}>
                                    {dadosCSV.length ? (
                                        <div>
                                            <CiFaceSmile />
                                            <span>Arquivo Selecionado</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <CiExport />
                                            <span>Fazer upload de arquivo</span>
                                        </div>
                                    )}
                                </label>
                                <input type="file" accept=".csv" id="arquivo" name="arquivo" onChange={lerArquivoCSV} />
                                <h3>Envio de Mensagem(Aluno Único):</h3>
                                <input type="number" placeholder="DDD + NUMERO" value={adcDados.number} onChange={(e) => setAdcDados({ ...adcDados, number: e.target.value })} />
                                <h3>Escanear QrCode:</h3>
                                <a href="http://localhost:8000/" target="_blank" rel="noreferrer">Clique aki</a>
                            </div>
                        )}
                        {telegramSelect && (
                            <div>
                                <h3>Envio de Mensagens(Multíplos Alunos):</h3>
                                <label htmlFor="arquivo" className={styles.inputfile}>
                                    {dadosCSV.length ? (
                                        <div>
                                            <CiFaceSmile />
                                            <span>Arquivo Selecionado</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <CiExport />
                                            <span>Fazer upload de arquivo</span>
                                        </div>
                                    )}
                                </label>
                                <input type="file" accept=".csv" id="arquivo" name="arquivo" onChange={lerArquivoCSV} />
                                <h3>Envio de Mensagem(Aluno Único):</h3>
                                <input type="text" placeholder="ID DO GRUPO" />
                                <h3>Digite seu Nome:</h3>
                                <input type="text" placeholder="Digite seu nome" />
                            </div>
                        )}
                    </section>
                    <img src={seta} alt="Seta" width="60px" className={styles.seta} />
                    <section className={styles.sessao2}>
                        <h3>Enviar arquivo:</h3>
                        <label htmlFor="arquivo">
                            <CiExport />
                            <span>Fazer upload de arquivo</span>
                        </label>
                        <input type="file" id="arquivo" name="arquivo" />
                        <h3>Digite sua Mensagem:</h3>
                        <textarea placeholder="Escreva Sua Mensagem..." value={adcDados.message} onChange={(e) => setAdcDados({ ...adcDados, message: e.target.value })}></textarea>
                        {!gmailSelect && !whatsSelect && !telegramSelect && (
                            <button style={{ background: 'grey' }} disabled>Enviar</button>
                        )}
                        {whatsSelect && (
                            <button onClick={enviarMensagens}>Enviar</button>
                        )}
                        {gmailSelect && (
                            <button onClick={enviarMensagens}>Enviar</button>
                        )}
                        {telegramSelect && (
                            <button onClick={enviarMensagens}>Enviar</button>
                        )}

                    </section>
                </div>
            </main>
        </>
    )
}
export default AddAlunosNV;