import styles from  '../styles/GuiaUsuario.module.css'
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import SideBar from "../form/SideBar";




function GuiaUsuario() {
    const navegação = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
      
        if (!accessToken) {
          navegação("/Login");
        } 
  
      }, [navegação]);

    return(
        <>
        <SideBar />
        <div className={styles.conteudo_pgn}>
            <div className={styles.conteudo_edit}>
                <h1>Guia do Usuário</h1>
                <div className={styles.formGroup}>

                <p>Atenção usuário para atender as exigencias preparamos um guia completo
                    para que você possa entender como o conexãoIF funciona</p>
                </div>
                <div className={styles.formGroup}>
                    <br/>
                    <h2>Objetivos do Projeto</h2></div>
                        <div className={styles.formGroup}>
                            <br/>
                            <h4>Objetivo geral:</h4>
                        </div>
                        <div className={styles.formGroup}>
                            <p>Criação de uma rede de comunicação institucional entre professores e alunos utilizando um serviço de mensagens instantâneas.</p>
                        </div> 
                        <div className={styles.formGroup}>
                            <h4> Objetivos específicos:</h4>
                            <br/>
                        </div>
    
                        <div className={styles.formGroup}>
                            <p>- Permitir que o coordenador crie os grupos de comunicação para os períodos iniciais;</p>
                        </div>
                        <div className={styles.formGroup}>
                            <p>- Permitir que o coordenador adicione os alunos aos grupos correspondentes;</p>
                        </div>
                        <div className={styles.formGroup}>
                            <p>- Garantir que o aluno esteja presente no grupo correspondente ao período/turma a que faz parte; e</p>
                        </div>
                        <div className={styles.formGroup}>
                            <p>- Realizar a integração do serviço de mensagens instantâneas com o sistema de gestão feito pelo coordenador.</p>
                        </div>
            </div>
        </div>
        </>
    )
}

export default GuiaUsuario;