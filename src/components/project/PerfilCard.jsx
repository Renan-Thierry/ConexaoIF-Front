import styles from "../styles/PerfilCard.module.css"

function PerfilCard({id, nome, email, telefone, disciplina, rgTrabalho, curso}) {
    return(
        <div className = {styles.cardPerfil}>
            <img src="" alt="Imagem do cordenador" />
            <h4>{nome}</h4>
            <p>
                <span>Email:</span> {email}
            </p>
            <p>
                <span>Telefone:</span> {telefone}
            </p>
            <p>
                <span>disciplina:</span> {disciplina}
            </p>
            <p>
                <span>RG de Trabalho:</span> {rgTrabalho}
            </p>
            <p>
                <span>curso:</span> {curso}
            </p>
        </div>
    )
}

export default PerfilCard;