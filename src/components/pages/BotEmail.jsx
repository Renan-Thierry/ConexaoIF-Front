import styles from '../styles/BotEmail.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import UserNavBar from '../form/UserNavBar';

function ChatBot()  {
  const [fileData, setFileData] = useState(null);
  const [tituloGrupo, setTituloGrupo] = useState('');
  const [mensagemManual, setMensagemManual] = useState('');
  const [grupoLink, setGrupoLink] = useState('');
  const [numEmails, setNumEmails] = useState(0);
  const [mensagem, setMensagem] = useState('');
  const [enviando, setEnviando] = useState(false); // Estado de envio

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      const data = JSON.parse(content);
      const grupo = data.emails[0]; // Considerando apenas o primeiro grupo do arquivo

      setFileData(data);
      setTituloGrupo(grupo.titulo);
      setGrupoLink(grupo.link);
      setNumEmails(data.emails.length);
    };

    reader.readAsText(file);
  };

  const handleLoadEmails = async () => {
    const formData = new FormData();
    formData.append('arquivo', fileData);

    try {
      const response = await axios.post('/load_emails', formData);
      const { titulo_grupo, link_grupo } = response.data;

      setTituloGrupo(titulo_grupo);
      setGrupoLink(link_grupo);
      setNumEmails(fileData.emails.length); // Atualizar o número de emails selecionados

      setMensagem('Arquivo carregado com sucesso!');
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao carregar o arquivo.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      titulo_grupo: tituloGrupo,
      mensagem_manual: mensagemManual,
    };

    try {
      setEnviando(true); // Iniciar o estado de envio

      const response = await axios.post('http://localhost:5000/send', payload);
      setMensagem(response.data.message);
    } catch (error) {
      console.error(error);
      setMensagem('Ocorreu um erro ao enviar o e-mail.');
    } finally {
      setEnviando(false); // Finalizar o estado de envio
    }
  };
    return(
        <>
            <UserNavBar/>
            <div className={styles.container}>
            <h1>Envie Sua Mensagem</h1>
              <div className={styles.conteudo_pagina}>
                <div className={styles.tipos_mensagens}>
                  {mensagem && <p>{mensagem}</p>}
                  <form encType="multipart/form-data">
                      <label htmlFor="arquivo">Carregar arquivo JSON:</label>
                      <input type="file" id="arquivo" name="arquivo" accept=".json" required onChange={handleFileChange}/>
                      <button type="button" className={styles.btn1} onClick={handleLoadEmails}>Carregar</button>  
                      <label>Enviar Individualmente:</label>
                      <input type="email" placeholder="example@gmail.com" required />  
                      <button>Enviar</button>      
                  </form>
                </div>
                <div className={styles.dados_msg}>
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="titulo_grupo">Título do Grupo:</label>
                      <input type="text" id="titulo_grupo" name="titulo_grupo" required value={tituloGrupo} onChange={(e) => setTituloGrupo(e.target.value)}/>
                      <label htmlFor="mensagem_manual">Mensagem:</label>
                      <textarea id="mensagem_manual" name="mensagem_manual" rows="4" cols="50" required placeholder="Digite a mensagem" value={mensagemManual} onChange={(e) => setMensagemManual(e.target.value)}>
                      </textarea>
                      <label>Link do Grupo:</label>
                      <span id="link_grupo">{grupoLink}</span>
                      <label>Número de Emails Selecionados:</label>
                      <span id="num_emails">{numEmails}</span>
                      <button type="submit" disabled={enviando}>
                        {enviando ? 'Enviando...' : 'Enviar'}
                      </button>
                  </form>
                </div>
            </div>
          </div>
        </>
    )
}
export default ChatBot;