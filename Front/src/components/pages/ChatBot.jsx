import styles from './ChatBot.module.css';
import NavBar from '../form/NavBar'

function ChatBot()  {
    return(
        <>
            <NavBar />
            <div className={styles.container}>
                <h1>Chatbot do DisDoc</h1>
            <div className={styles.content_page}>
                <div className={styles.form_group}>
                    <label htmlFor="file">Selecione um arquivo com os números:</label>
                    <input type="file" id="file" accept=".txt" className={styles.inputFile}/>
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="groupLink">Digite o link do grupo:</label>
                    <input type="text" id="groupLink" className={styles.inputText} />
                    <label htmlFor="message">Digite a mensagem:</label>
                    <textarea id="message" rows="4" cols="50"></textarea>
                </div>
            </div>
                <button id="sendBtn">Enviar</button>
            </div>
        </>
    )
}
export default ChatBot;