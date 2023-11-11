import SideBar from "../utils/SideBar";
import styles from "./styles/Ajuda.module.css";
import { BsFill1CircleFill, BsFill2CircleFill, BsFill3CircleFill } from "react-icons/bs";
import ajuda1 from "../../img/img-ajuda/ajuda1.png";
import ajuda2 from "../../img/img-ajuda/ajuda2.png";
import ajuda3 from "../../img/img-ajuda/ajuda3.png";

function Ajuda(){
  return (
    <>
      <SideBar />
      <div className={styles.conteudo_Ajuda}>
        <h1 className={styles.titulo_Ajuda}>Guia de Usuario</h1>
        <section className={styles.sessao}>
            <h1><BsFill1CircleFill /><span>Passo</span></h1>
            <div>
              <img src={ajuda1} alt="Sessao1" />
              <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>
            </div>
        </section>
        <section className={styles.sessao2}>
          <h1><BsFill2CircleFill /><span>Passo</span></h1>
          <div>
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>
            <img src={ajuda2} alt="Sessao2" />
          </div>
        </section>
        <section className={styles.sessao}>
          <h1><BsFill3CircleFill /><span>Passo</span></h1>
          <div>
          <img src={ajuda3} alt="Sessao2" />
            <p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>
          </div>
        </section>
      </div>
    </>
  )
}
export default Ajuda;