import { Navigate, Outlet } from 'react-router-dom';

function Autenticacao() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    jwt.verify(token, secretKey);
    return <Outlet />;
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }
}

export default Autenticacao;
