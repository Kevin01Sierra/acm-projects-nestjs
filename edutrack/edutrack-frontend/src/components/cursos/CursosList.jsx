import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cursosService from '../../services/cursosService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './CursosList.module.css';

const CursosList = () => {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  const { isAdmin, isProfesor, isEstudiante, user } = useAuth();

  useEffect(() => {
    loadCursos();
  }, []);

  const loadCursos = async () => {
    try {
      let data;
      if (isProfesor()) {
        data = await cursosService.getAll({ profesor_id: user.profesor.id });
      } else if (isEstudiante()) {
        // Estudiantes ven sus cursos inscritos (o disponibles, según lógica de negocio)
        // Usamos el nuevo endpoint backend para filtrar por estudiante
        data = await cursosService.getAll({ estudiante_id: user.estudiante.id });
      } else {
        data = await cursosService.getAll();
      }
      setCursos(data);
    } catch (error) {
      showNotification('Error al cargar cursos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este curso?')) {
      try {
        await cursosService.delete(id);
        showNotification('Curso eliminado exitosamente', 'success');
        loadCursos();
      } catch (error) {
        showNotification('Error al eliminar curso', 'error');
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Cursos</h2>
        {(isAdmin() || isProfesor()) && (
          <Link to="/cursos/nuevo">
            <Button variant="primary">Nuevo Curso</Button>
          </Link>
        )}
      </div>

      <div className={styles.grid}>
        {cursos.map((curso) => (
          <Card key={curso.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{curso.nombre}</h3>
              <span className={styles.badge}>{curso.codigo_curso}</span>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.description}>{curso.descripcion}</p>
              <div className={styles.details}>
                <span>📚 {curso.creditos} Créditos</span>
                <span>👥 Cupo: {curso.cupo_maximo}</span>
              </div>
              <p className={styles.profesor}>
                <strong>Profesor:</strong> {curso.profesor?.usuario?.nombre_completo || 'No asignado'}
              </p>
            </div>
            <div className={styles.cardFooter}>
              {(isAdmin() || isProfesor()) && (
                <Link to={`/cursos/editar/${curso.id}`}>
                  <Button variant="secondary" size="small">Editar</Button>
                </Link>
              )}
              {isAdmin() && (
                <Button 
                  variant="danger" 
                  size="small" 
                  onClick={() => handleDelete(curso.id)}
                >
                  Eliminar
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CursosList;
