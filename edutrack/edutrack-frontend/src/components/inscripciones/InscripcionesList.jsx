import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import inscripcionesService from '../../services/inscripcionesService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { ESTADOS_INSCRIPCION_LABELS, ESTADOS_INSCRIPCION_COLORS } from '../../utils/constants';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './InscripcionesList.module.css';

const InscripcionesList = () => {
  const [inscripciones, setInscripciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();
  const { isAdmin, isEstudiante, user } = useAuth();

  useEffect(() => {
    loadInscripciones();
  }, []);

  const loadInscripciones = async () => {
    try {
      let data;
      if (isEstudiante()) {
        data = await inscripcionesService.getAll({ estudiante_id: user.estudiante.id });
      } else {
        data = await inscripcionesService.getAll();
      }
      setInscripciones(data);
    } catch (error) {
      showNotification('Error al cargar inscripciones', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta inscripción?')) {
      try {
        await inscripcionesService.delete(id);
        showNotification('Inscripción eliminada exitosamente', 'success');
        loadInscripciones();
      } catch (error) {
        showNotification('Error al eliminar inscripción', 'error');
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Inscripciones</h2>
        {(isAdmin() || isEstudiante()) && (
          <Link to="/inscripciones/nueva">
            <Button variant="primary">Nueva Inscripción</Button>
          </Link>
        )}
      </div>

      <div className={styles.grid}>
        {inscripciones.map((inscripcion) => (
          <Card key={inscripcion.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{inscripcion.estudiante?.usuario?.nombre_completo}</h3>
              <span 
                className={styles.badge}
                style={{ backgroundColor: ESTADOS_INSCRIPCION_COLORS[inscripcion.estado] || '#eee' }}
              >
                {ESTADOS_INSCRIPCION_LABELS[inscripcion.estado] || inscripcion.estado}
              </span>
            </div>
            <div className={styles.cardBody}>
              <p><strong>Curso:</strong> {inscripcion.curso?.nombre}</p>
              <p><strong>Fecha:</strong> {new Date(inscripcion.fecha_inscripcion).toLocaleDateString()}</p>
              {inscripcion.nota !== null && (
                <p><strong>Nota:</strong> {inscripcion.nota}</p>
              )}
            </div>
            <div className={styles.cardFooter}>
              {isAdmin() && (
                <Link to={`/inscripciones/editar/${inscripcion.id}`}>
                  <Button variant="secondary" size="small">Editar</Button>
                </Link>
              )}
              {isAdmin() && (
                <Button 
                  variant="danger" 
                  size="small" 
                  onClick={() => handleDelete(inscripcion.id)}
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

export default InscripcionesList;
