import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from "../pages/Cadastro";
import Login from "../pages/Login";
import Sobre from '../pages/Sobre';
import Home from '../pages/Home';
import Professor from '../tables/Professor';
import Mensagem from '../tables/Mensagem';
import Coordenador from '../tables/Coordenador';
import Alunos from '../tables/Alunos';
import Curso from '../tables/Curso';
import Endereco from '../tables/Endereco';
import Grupo from '../tables/Grupo';
import Instituicao from '../tables/Instituicao';
import Periodos from '../tables/Periodos';
import Pessoas from '../tables/Pessoas';
import EditPerfil from '../pages/EditPerfil';
import EnvioDeMensagem from '../pages/EnvioDeMensagem';
import Servicos from '../pages/Servicos';
import Ajuda from '../pages/Ajuda';
import Inicial from '../pages/Inicial';
import ControleAlunos from '../pages/ControleAlunos';

function Rotas() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Ajuda" element={<Ajuda />} />
          <Route path="/Serviços" element={<Servicos />} />
          <Route path="/EditPerfil" element={<EditPerfil />} />
          <Route path="/Inicio" element={<Inicial />} />
          <Route path="/EnvioDeMensagem" element={<EnvioDeMensagem />} />
          <Route path="/ControleAlunos" element={<ControleAlunos />} />
          <Route path="/Professor" element={<Professor />} />
          <Route path="/Mensagem" element={<Mensagem />} />
          <Route path="/Coordenador" element={<Coordenador />} />
          <Route path="/Alunos" element={<Alunos />} />
          <Route path="/Curso" element={<Curso />} />
          <Route path="/Endereco" element={<Endereco />} />
          <Route path="/Grupo" element={<Grupo />} />
          <Route path="/Instituicao" element={<Instituicao />} />
          <Route path="/Periodos" element={<Periodos />} />
          <Route path="/Pessoas" element={<Pessoas />} />
        </Routes>
      </Router>
    </div>
  )
}

export default Rotas;