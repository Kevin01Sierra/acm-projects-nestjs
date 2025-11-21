import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfesoresPage from './pages/ProfesoresPage';
import EstudiantesPage from './pages/EstudiantesPage';
import CursosPage from './pages/CursosPage';
import InscripcionesPage from './pages/InscripcionesPage';
import Navbar from './components/layout/Navbar';
import './App.css';

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-container"><div className="loader"></div><p className="loading-text">Cargando...</p></div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      <div className="container">
        {children}
      </div>
    </>
  );
};

// Componente para rutas públicas (redirige si ya está autenticado)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading-container"><div className="loader"></div><p className="loading-text">Cargando...</p></div>;
  }

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />

      {/* Rutas Protegidas */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      <Route path="/profesores/*" element={
        <ProtectedRoute>
          <ProfesoresPage />
        </ProtectedRoute>
      } />
      
      <Route path="/estudiantes/*" element={
        <ProtectedRoute>
          <EstudiantesPage />
        </ProtectedRoute>
      } />
      
      <Route path="/cursos/*" element={
        <ProtectedRoute>
          <CursosPage />
        </ProtectedRoute>
      } />
      
      <Route path="/inscripciones/*" element={
        <ProtectedRoute>
          <InscripcionesPage />
        </ProtectedRoute>
      } />

      {/* Redirección por defecto */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
