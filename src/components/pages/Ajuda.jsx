import SideBar from "../utils/SideBar";
import styles from "./styles/Ajuda.module.css";
import { BsFill1CircleFill, BsFill2CircleFill, BsFill3CircleFill, BsFill4CircleFill } from "react-icons/bs";
import ajuda1 from "../../img/img-ajuda/ajuda1.png";
import ajuda2 from "../../img/img-ajuda/ajuda2.png";
import ajuda3 from "../../img/img-ajuda/ajuda3.png";
import ajuda4 from "../../img/img-ajuda/ajuda4.png";

function Ajuda() {
  return (
    <>
      <SideBar />
      <div className={styles.conteudo_Ajuda}>
        <h1 className={styles.titulo_Ajuda}>Guia de Usuario</h1>
        <section className={styles.sessao}>
          <h1><BsFill1CircleFill /><span>Escolha das Plataformas</span></h1>
          <div>
            <img src={ajuda1} alt="Sessao1" />
            <p>Para realizar o envio das mensagens às diversas plataformas disponíveis, é essencial começar clicando em uma das opções estrategicamente apresentadas ao seu alcance. Esse passo inicial, apesar de sua aparente simplicidade, desempenha um papel fundamental ao conceder a você a capacidade de direcionar suas mensagens de maneira fácil e eficaz. Ao realizar esta ação, abre-se a porta para uma experiência mais aprimorada, caracterizada pela fluidez e intuição, proporcionando um ambiente interativo mais eficiente e intuitivo. Este ponto de partida torna-se, assim, a base para uma jornada de comunicação facilitada e otimizada.</p>
          </div>
        </section>
        <section className={styles.sessao2}>
          <h1><BsFill2CircleFill /><span>Preenchimento de Dados</span></h1>
          <div>
            <p>Após clicar nas opções apresentadas anteriormente, é necessário preencher os dados solicitados por cada plataforma. Você tem a flexibilidade de enviar mensagens para um único aluno, preenchendo os campos necessários, ou pode optar por selecionar um arquivo CSV e enviar para uma lista de alunos. Além disso, oferecemos a conveniência de enviar arquivos diretamente aos alunos. Este processo intuitivo proporciona a você múltiplas escolhas para personalizar e otimizar suas interações, seja para comunicação individualizada ou para gerenciar eficientemente listas de alunos através de arquivos CSV.</p>
            <img src={ajuda2} alt="Sessao2" />
          </div>
        </section>
        <section className={styles.sessao}>
          <h1><BsFill3CircleFill /><span>Exemplo de arquivo CSV</span></h1>
          <div>
            <img src={ajuda4} alt="Sessao2" />
            <p>Esta imagem exibe o arquivo CSV, destacando meticulosamente as colunas cruciais necessárias para facilitar o envio eficaz de dados em grande quantidade. Cada coluna desempenha um papel fundamental na estruturação e organização dos dados, permitindo um processo de envio eficiente e otimizado.</p>
          </div>
        </section>
        <section className={styles.sessao2}>
          <h1><BsFill4CircleFill /><span>Envio das Mensagens</span></h1>
          <div>
            <p>Após executar os passos anteriores com precisão, sua próxima ação consistirá em clicar no botão de envio. Imediatamente, você será agraciado com uma notificação, indicando que os dados cuidadosamente preenchidos foram enviados com sucesso. Este momento é marcado por um feedback positivo, proporcionando-lhe a confirmação tranquilizadora de que sua interação foi concluída de maneira eficiente e bem-sucedida.</p>
            <img src={ajuda3} alt="Sessao2" />
          </div>
        </section>
      </div>
    </>
  )
}
export default Ajuda;