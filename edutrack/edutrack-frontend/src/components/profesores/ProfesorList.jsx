import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import profesoresService from '../../services/profesoresService';
import { useNotification } from '../../context/NotificationContext';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './ProfesorList.module.css';

const ProfesorList = () => {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    loadProfesores();
  }, []);

  const loadProfesores = async () => {
    try {
      const data = await profesoresService.getAll();
      setProfesores(data);
    } catch (error) {
      showNotification('Error al cargar profesores', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este profesor?')) {
      try {
        await profesoresService.delete(id);
        showNotification('Profesor eliminado exitosamente', 'success');
        loadProfesores();
      } catch (error) {
        showNotification('Error al eliminar profesor', 'error');
      }
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Profesores</h2>
        <Link to="/profesores/nuevo">
          <Button variant="primary">Nuevo Profesor</Button>
        </Link>
      </div>

      <div className={styles.grid}>
        {profesores.map((profesor) => (
          <Card key={profesor.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>{profesor.usuario?.nombre_completo || 'Sin nombre'}</h3>
              <span className={styles.badge}>{profesor.especialidad}</span>
            </div>
            <div className={styles.cardBody}>
              <p><strong>Email:</strong> {profesor.usuario?.correo}</p>
              <p><strong>Teléfono:</strong> {profesor.telefono || 'N/A'}</p>
              {profesor.biografia && (
                <p className={styles.bio}>{profesor.biografia}</p>
              )}
            </div>
            <div className={styles.cardFooter}>
              <Link to={`/profesores/editar/${profesor.id}`}>
                <Button variant="secondary" size="small">Editar</Button>
              </Link>
              <Button 
                variant="danger" 
                size="small" 
                onClick={() => handleDelete(profesor.id)}
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

export default ProfesorList;
