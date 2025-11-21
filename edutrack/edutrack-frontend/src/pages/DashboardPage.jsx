import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import { Link } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', color: 'var(--primary-dark)' }}>
        Bienvenido, {user.nombre_completo} 👋
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        <Card>
          <h3>📚 Cursos</h3>
          <p>Gestiona los cursos disponibles, asigna profesores y revisa detalles.</p>
          <Link to={ROUTES.CURSOS} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>
            Ir a Cursos →
          </Link>
        </Card>

        <Card>
          <h3>👨‍🏫 Profesores</h3>
          <p>Administra el personal docente, sus especialidades y datos de contacto.</p>
          <Link to={ROUTES.PROFESORES} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>
            Ir a Profesores →
          </Link>
        </Card>

        <Card>
          <h3>🎓 Estudiantes</h3>
          <p>Visualiza y gestiona la información de los estudiantes matriculados.</p>
          <Link to={ROUTES.ESTUDIANTES} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>
            Ir a Estudiantes →
          </Link>
        </Card>

        <Card>
          <h3>📝 Inscripciones</h3>
          <p>Controla las inscripciones de estudiantes a cursos y sus calificaciones.</p>
          <Link to={ROUTES.INSCRIPCIONES} style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 'bold' }}>
            Ir a Inscripciones →
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
