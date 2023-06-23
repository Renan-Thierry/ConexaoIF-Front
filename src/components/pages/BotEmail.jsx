import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmailForm.css';

function EmailForm() {
  const [fileData, setFileData] = useState(null); // Estado para armazenar os dados do arquivo
  const [tituloGrupo, setTituloGrupo] = useState(''); // Estado para armazenar o título do grupo
  const [mensagemManual, setMensagemManual] = useState(''); // Estado para armazenar a mensagem manual
  const [grupoLink, setGrupoLink] = useState(''); // Estado para armazenar o link do grupo
  const [numEmails, setNumEmails] = useState(0); // Estado para armazenar o número de emails selecionados
  const [mensagem, setMensagem] = useState(''); // Estado para armazenar a mensagem de retorno
  const [enviando, setEnviando] = useState(false); // Estado para indicar se o envio está em progresso

  const fetchEmailData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get_emails'); // Envia uma requisição GET para obter os dados do arquivo JSON
      const emailsData = response.data; // Dados do arquivo JSON

      if (emailsData.length === 0) {
        setMensagem('Nenhum email encontrado');
        return;
      }

      const firstEmail = emailsData[0]; // Considerando apenas o primeiro email do arquivo

      setFileData(emailsData); // Armazena os dados do arquivo no estado 'fileData'
      setTituloGrupo(firstEmail.titulo); // Define o título do grupo com base nos dados do arquivo
      setMensagemManual(firstEmail.mensagem); // Define a mensagem do grupo como mensagem manual inicial
      setGrupoLink(firstEmail.link); // Define o link do grupo com base nos dados do arquivo
      setNumEmails(emailsData.length); // Define o número de emails selecionados com base nos dados do arquivo

      setMensagem('Dados carregado com sucesso!');
    } catch (error) {
      console.error(error);
      setMensagem('Erro ao carregar o arquivo.');
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
      setMensagem(response.data.message); // Define a mensagem de retorno com base na resposta do servidor
    } catch (error) {
      console.error(error);
      setMensagem('Ocorreu um erro ao enviar o e-mail.');
    } finally {
      setEnviando(false); // Finaliza o estado de envio
    }
  };

  return (
    <div className="container">
      <h1>Bot-Email</h1>
      {mensagem && <p>{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="titulo_grupo">Título do Grupo:</label>
          <input
            type="text"
            id="titulo_grupo"
            name="titulo_grupo"
            required
            value={tituloGrupo}
            onChange={(e) => setTituloGrupo(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensagem_manual">Mensagem:</label>
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
        <div className="link-grupo">
          <label>Link do Grupo:</label>
          <span id="link_grupo">{grupoLink}</span>
        </div>
        <div className="form-group">
          <label>Número de Emails Selecionados:</label>
          <span id="num_emails">{numEmails}</span>
        </div>
        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}

export default EmailForm;
