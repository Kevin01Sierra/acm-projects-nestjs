import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import estudiantesService from '../../services/estudiantesService';
import { useNotification } from '../../context/NotificationContext';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './EstudiantesList.module.css';

const EstudiantesList = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadEstudiantes();
  }, []);

  const loadEstudiantes = async () => {
    try {
      const data = await estudiantesService.getAll();
      setEstudiantes(data);
    } catch (error) {
      showNotification('Error al cargar estudiantes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este estudiante?')) {
      try {
        await estudiantesService.delete(id);
        showNotification('Estudiante eliminado exitosamente', 'success');
        loadEstudiantes();
      } catch (error) {
        showNotification('Error al eliminar estudiante', 'error');
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Estudiantes</h2>
        <Link to="/estudiantes/nuevo">
          <Button variant="primary">Nuevo Estudiante</Button>
        </Link>
      </div>

      <div className={styles.grid}>
        {estudiantes.map((estudiante) => (
          <Card key={estudiante.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{estudiante.usuario?.nombre_completo || 'Sin nombre'}</h3>
              <span className={styles.badge}>Semestre {estudiante.semestre_actual}</span>
            </div>
            <div className={styles.cardBody}>
              <p><strong>Email:</strong> {estudiante.usuario?.correo}</p>
              <p><strong>Teléfono:</strong> {estudiante.telefono || 'N/A'}</p>
              <p><strong>Ingreso:</strong> {estudiante.anio_ingreso}</p>
            </div>
            <div className={styles.cardFooter}>
              <Link to={`/estudiantes/editar/${estudiante.id}`}>
                <Button variant="secondary" size="small">Editar</Button>
              </Link>
              <Button 
                variant="danger" 
                size="small" 
                onClick={() => handleDelete(estudiante.id)}
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EstudiantesList;
