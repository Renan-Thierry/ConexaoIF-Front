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
import EmailForm from './components/pages/EmailForm';
import GruposUser from './components/pages/GruposUser';
import EditPerfil from './components/pages/EditPerfil';
import AdicionarAlunos from './components/pages/AdicionarAlunos';
import GuiaUsuario from './components/pages/GuiaUsuario';
import Lista from './components/pages/Lista';


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
          <Route path="/EmailForm" element={<EmailForm />} />
          <Route path="/GruposUser" element={<GruposUser />} />
          <Route path="/EditPerfil" element={<EditPerfil />} />
          <Route path="/AdicionarAlunos" element={<AdicionarAlunos />} />
          <Route path="/GuiaUsuario" element={<GuiaUsuario />} />
          <Route path="/Lista" element={<Lista />} />
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
