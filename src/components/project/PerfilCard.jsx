import styles from "./styles/PerfilCard.module.css";
import image from "../../img/blog_mini_4.jpg";
import { BsPencil, BsFillTrashFill } from "react-icons/bs";
import { HiOutlineIdentification, HiOutlineMail, HiOutlinePhone, HiOutlineBookOpen, HiOutlineAcademicCap } from "react-icons/hi";

function PerfilCard({id, nome, email, telefone, disciplina, rgTrabalho, curso, edit, remove}) {
    return(
        <div className = {styles.cardPerfil}>
            <img src={image} alt="Imagem do cordenador" />
            <h4>{nome}</h4>
            <div className={styles.card_Information}>
                <p>
                    <span><HiOutlineMail/></span> {email}
                </p>
                <p>
                    <span><HiOutlinePhone/></span> {telefone}
                </p>
                <p>
                    <span><HiOutlineBookOpen/></span> {disciplina}
                </p>
                <p>
                    <span><HiOutlineIdentification/></span> {rgTrabalho}
                </p>
                <p>
                    <span><HiOutlineAcademicCap/></span> {curso}
                </p>
            </div>
            <div className={styles.btn_CardPerfil}>
                <button onClick={edit} className={styles.btn1}>
                    <BsPencil />
                </button>
                <button onClick={remove} className={styles.btn2}>
                    <BsFillTrashFill />
                </button>
            </div>
        </div>
    )
}

export default PerfilCard;