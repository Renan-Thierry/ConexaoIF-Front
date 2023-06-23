import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cadastro from "./components/pages/Cadastro";
import Login from "./components/pages/Login";
import EmailForm from "./components/pages/EmailForm";
import Sobre from './components/pages/Sobre';
import Home from './components/pages/Home';
import Professor from './components/pages/tables/Professor';
import Lista from './components/pages/tables/Lista';
import Coordenador from './components/pages/tables/Coordenador';
import Alunos from './components/pages/tables/Alunos';
import Curso from './components/pages/tables/Curso';
import Endereco from './components/pages/tables/Endereco';
import Grupo from './components/pages/tables/Grupo';
import Instituicao from './components/pages/tables/Instituicao';
import Periodos from './components/pages/tables/Periodos';
import Pessoas from './components/pages/tables/Pessoas';



function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/EmailForm" element={<EmailForm />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Professor" element={<Professor />} />
          <Route path="/Lista" element={<Lista />} />
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
    
    </>
  );
}

export default App;
