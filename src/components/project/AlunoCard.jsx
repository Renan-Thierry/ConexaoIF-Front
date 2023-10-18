import styles from "./styles/AlunoCard.module.css";
import AlunoIcone from "../../img/AlunoCardIcone.png";
import { HiOutlineTerminal, HiOutlineMail,  HiOutlineAcademicCap } from "react-icons/hi";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function AlunoCard({nome, email, periodo, curso, edit, remove}) {
  return(
    <div className={styles.card_aluno}>
        <div className={styles.perfilAluno}>
          <img src={AlunoIcone} alt="img-aluno"/>
          <h4>{nome}</h4>
        </div>
        <div className={styles.AlunoInfo}>
          <p>
            <span><HiOutlineMail/></span> {email}
          </p>
          <p>
            <span><HiOutlineTerminal /></span> {periodo}
          </p>
          <p>
            <span><HiOutlineAcademicCap/></span> {curso}
          </p>
          <div className={styles.btnInfo}>
            <button onClick={edit} className={styles.icon1}>
              <BsPencil />
            </button>
            <button onClick={remove} className={styles.icon2}>
              <BsFillTrashFill />
            </button>
          </div>
        </div>
    </div>
  );
}

export default AlunoCard;