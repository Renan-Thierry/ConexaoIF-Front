import styles from './styles/EditPerfil.module.css';
import React, { useEffect, useState } from "react";
import SideBar from "../utils/SideBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PerfilCard from '../project/PerfilCard';

function EditPerfil() {
  const navegação = useNavigate();
  const [coordenadores, setCoordenadores] = useState([]);
  const [editCoordenadoresId, setEditCoordenadoresId] = useState(null);
  const [editCoordenadoresDados, setEditCoordenadoresDados] = useState({});
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navegação("/Login");
    }
  }, [navegação]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/curso")
      .then((response) => setCursos(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/coordenador')
      .then((response) => setCoordenadores(response.data))
      .catch((err) => console.log(err));
  }, []);

  const removeCoordenador = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/coordenador/${id}`)
      .then((response) => {
        const AttListaCoordenador = coordenadores.filter((coordenador) => coordenador.id !== id);
        setCoordenadores(AttListaCoordenador);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCoordenador = (id) => {
    axios.get(`http://127.0.0.1:5000/api/coordenador/${id}`)
      .then((response) => {
        setEditCoordenadoresDados(response.data);
        setEditCoordenadoresId(id);
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          console.log(error);
        }
      });
  };

  const saveEditCoordenador = () => {
    if (!editCoordenadoresDados.nome || !editCoordenadoresDados.email || !editCoordenadoresDados.senha || !editCoordenadoresDados.telefone || !editCoordenadoresDados.disciplina || !editCoordenadoresDados.registrodeTrabalho || !editCoordenadoresDados.curso) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    } else {
      axios.put(`http://127.0.0.1:5000/api/coordenador/${editCoordenadoresId}`, editCoordenadoresDados)
        .then((response) => {
          const updatedCoordenadores = coordenadores.map((coordenador) => {
            if (coordenador.id === editCoordenadoresId) {
              return response.data;
            }
            return coordenador;
          });
          setCoordenadores(updatedCoordenadores);
          setEditCoordenadoresId(null);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.message) {
            alert(error.response.data.message);
          } else {
            console.log(error);
            alert('Email ou Senha já existentes');
          }
        });
    }
  };

  return (
    <>
      <SideBar />
      <main className={styles.conteudo}>
        <h1 className={styles.texto_header}>Coordenadores</h1>
        {editCoordenadoresId ? (
          <div className={styles.editForm}>
            <h2>Editar Perfil</h2>
            <form className={styles.formGroup}>
              <label>Nome:</label>
              <input type="text" value={editCoordenadoresDados.nome} onChange={(e) => {
                const nomeSemEspacosEspeciais = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                setEditCoordenadoresDados({ ...editCoordenadoresDados, nome: nomeSemEspacosEspeciais })
              }} required />
              <label>Email:</label>
              <input type="email" value={editCoordenadoresDados.email} onChange={(e) => {
                const emailSemEspacosEspeciais = e.target.value.replace(/[^a-zA-Z0-9@.]/g, '');
                setEditCoordenadoresDados({ ...editCoordenadoresDados, email: emailSemEspacosEspeciais })
              }} required />
              <label>Senha:</label>
              <input type="password" value={editCoordenadoresDados.senha} onChange={(e) => {
                const senhaSemEspacosEspeciais = e.target.value.replace(/[^a-zA-Z0-9@.!]/g, '');
                setEditCoordenadoresDados({ ...editCoordenadoresDados, senha: senhaSemEspacosEspeciais })
              }} required />
              <label>Telefone:</label>
              <input type="number" value={editCoordenadoresDados.telefone} onChange={(e) => {
                const telefoneSemEspacosEspeciais = e.target.value.replace(/[^0-9]/g, '');
                setEditCoordenadoresDados({ ...editCoordenadoresDados, telefone: telefoneSemEspacosEspeciais })
              }} required />
              <label>Disciplina:</label>
              <input type="text" value={editCoordenadoresDados.disciplina} onChange={(e) => {
                const disciplinaSemEspacosEspeciais = e.target.value.replace(/[^a-zA-Z0-9]/g, ' ');
                setEditCoordenadoresDados({ ...editCoordenadoresDados, disciplina: disciplinaSemEspacosEspeciais })
              }} required />
              <label>Registro de Trabalho:</label>
              <input type="text" value={editCoordenadoresDados.registrodeTrabalho} onChange={(e) => {
                const registroSemEspacosEspeciais = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
                setEditCoordenadoresDados({ ...editCoordenadoresDados, registrodeTrabalho: registroSemEspacosEspeciais })
              }} required />
              <label>Curso:</label>
              <select value={editCoordenadoresDados.curso.id} onChange={(e) =>
                setEditCoordenadoresDados({ ...editCoordenadoresDados, curso: { id: e.target.value } })}>
                <option value="">Selecione um curso</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </select>
              <button onClick={saveEditCoordenador}>Salvar</button>
            </form>
          </div>
        ) : (
          <section className={styles.CardPerfil}>
            {coordenadores.map((coordenador) => {
              return (
                <PerfilCard key={coordenador.id} nome={coordenador.nome} email={coordenador.email}
                  telefone={coordenador.telefone} disciplina={coordenador.disciplina} rgTrabalho={coordenador.registrodeTrabalho} curso={coordenador.curso ? coordenador.curso.nome : ""}
                  edit={() => editCoordenador(coordenador.id)} remove={() => removeCoordenador(coordenador.id)} />
              )
            })}
          </section>
        )}
      </main>
    </>
  );
}

export default EditPerfil;