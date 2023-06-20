import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from "./components/pages/Cadastro";
import Login from "./components/pages/Login";
import Sobre from './components/pages/Sobre';
import Home from './components/pages/Home';
import Professor from './components/tables/Professor';
import Mensagem from './components/tables/Mensagem';
import Coordenador from './components/tables/Coordenador';
import Alunos from './components/tables/Alunos';
import Curso from './components/tables/Curso';
import Endereco from './components/tables/Endereco';
import Grupo from './components/tables/Grupo';
import Instituicao from './components/tables/Instituicao';
import Periodos from './components/tables/Periodos';
import Pessoas from './components/tables/Pessoas';
import BotEmail from './components/pages/BotEmail';
import GruposUser from './components/pages/GruposUser';
import EditPerfil from './components/pages/EditPerfil';


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sobre" element={<Sobre />} />
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
          <Route path="/BotEmail" element={<BotEmail />} />
          <Route path="/GruposUser" element={<GruposUser />} />
          <Route path="/EditPerfil" element={<EditPerfil />} />
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
