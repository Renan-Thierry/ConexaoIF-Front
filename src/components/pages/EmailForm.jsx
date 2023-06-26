import React, { useState, useEffect } from 'react';
import styles from  '../styles/EmailForm.module.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SideBar from '../form/SideBar';



function EmailForm() {
    const navegação = useNavigate();
    // eslint-disable-next-line
  const [fileData, setFileData] = useState(null); // Estado para armazenar os dados do arquivo
  const [tituloGrupo, setTituloGrupo] = useState(''); // Estado para armazenar o título do grupo
  const [mensagemManual, setMensagemManual] = useState(''); // Estado para armazenar a mensagem manual
  const [grupoLink, setGrupoLink] = useState(''); // Estado para armazenar o link do grupo
  const [numEmails, setNumEmails] = useState(0); // Estado para armazenar o número de emails selecionados
  const [enviando, setEnviando] = useState(false); // Estado para indicar se o envio está em progresso

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      navegação("/Login");
    } 

  }, [navegação]);

  const fetchEmailData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_emails'); // Envia uma requisição GET para obter os dados do arquivo JSON
      const emailsData = response.data; // Dados do arquivo JSON

      if (emailsData.length === 0) {
        alert('Nenhum email encontrado');
        return;
      }

      const firstEmail = emailsData[0]; // Considerando apenas o primeiro email do arquivo

      setFileData(emailsData); // Armazena os dados do arquivo no estado 'fileData'
      setTituloGrupo(firstEmail.titulo); // Define o título do grupo com base nos dados do arquivo
      setMensagemManual(firstEmail.mensagem); // Define a mensagem do grupo como mensagem manual inicial
      setGrupoLink(firstEmail.link); // Define o link do grupo com base nos dados do arquivo
      setNumEmails(emailsData.length); // Define o número de emails selecionados com base nos dados do arquivo

    } catch (error) {
      console.error(error);
      alert('Erro ao carregar o arquivo.');
    }
  };

  useEffect(() => {
    fetchEmailData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      titulo_grupo: tituloGrupo,
      mensagem_manual: mensagemManual,
    }; // Cria um objeto com os dados a serem enviados

    try {
      setEnviando(true); // Inicia o estado de envio

      const response = await axios.post('http://localhost:5000/send', payload); // Envia uma requisição POST para enviar o email
      alert(response.data.message); // Define a mensagem de retorno com base na resposta do servidor
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao enviar o e-mail.');
    } finally {
      setEnviando(false); // Finaliza o estado de envio
    }
  };

  return (
    <>
    <SideBar />
    <div className={styles.containerAdminNavBar}>
          <div className={styles.container}>
            <main>
      <h1>Mensagem</h1>
      <div className={styles.conteudo}>{/* Content */}</div>

      <form onSubmit={handleSubmit}>
      <div className={styles.editForm}>
        
      <div className={styles.formGroup}>
          <label>Título do Grupo:</label>
          <span id="titulo_grupo">{tituloGrupo}</span>
        </div>
        <div className={styles.formGroup}>
          <label>Link do Grupo:</label>
          <span id="link_grupo">{grupoLink}</span>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mensagem_manual">Mensagem Padrão:</label>
          <textarea
            id="mensagem_manual"
            name="mensagem_manual"
            rows="4"
            cols="50"
            required
            placeholder={mensagemManual ? '' : 'Digite a mensagem'}
            value={mensagemManual}
            onChange={(e) => setMensagemManual(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label>Número de Alunos Selecionados:</label>
          <span id="num_emails">{numEmails}</span>
        </div>
        <div className={styles.editForm}>

          <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
        </div>
       </div>
      </form>
      </main>
    </div>
    </div>
    </>
  );
}

export default EmailForm;
