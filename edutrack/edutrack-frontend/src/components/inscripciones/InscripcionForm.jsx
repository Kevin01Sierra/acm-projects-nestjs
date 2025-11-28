import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import inscripcionesService from '../../services/inscripcionesService';
import estudiantesService from '../../services/estudiantesService';
import cursosService from '../../services/cursosService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import { validateInscripcionForm } from '../../utils/validators';
import { ESTADOS_INSCRIPCION, ESTADOS_INSCRIPCION_LABELS } from '../../utils/constants';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import styles from './InscripcionForm.module.css';

const InscripcionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const { isEstudiante, user } = useAuth();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    estudiante_id: '',
    curso_id: '',
    fecha_inscripcion: new Date().toISOString().split('T')[0],
    estado: ESTADOS_INSCRIPCION.INSCRITO,
    nota: '',
  });
  
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
    if (isEdit) {
      loadInscripcion();
    }
  }, [id]);

  const loadData = async () => {
    try {
      const promises = [cursosService.getAll()];
      
      if (!isEstudiante()) {
        promises.push(estudiantesService.getAll());
      }

      const [cursosData, estudiantesData] = await Promise.all(promises);
      
      setCursos(cursosData);
      if (estudiantesData) {
        setEstudiantes(estudiantesData);
      }
      
      // Si es estudiante, setear su ID automáticamente
      if (isEstudiante() && user?.estudiante?.id) {
        setFormData(prev => ({
          ...prev,
          estudiante_id: user.estudiante.id
        }));
      }
    } catch (error) {
      showNotification('Error al cargar listas', 'error');
    }
  };

  const loadInscripcion = async () => {
    try {
      const data = await inscripcionesService.getById(id);
      setFormData({
        estudiante_id: data.estudiante_id,
        curso_id: data.curso_id,
        fecha_inscripcion: data.fecha_inscripcion.split('T')[0],
        estado: data.estado,
        nota: data.nota || '',
      });
    } catch (error) {
      showNotification('Error al cargar datos de la inscripción', 'error');
      navigate('/inscripciones');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateInscripcionForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await inscripcionesService.update(id, formData);
        showNotification('Inscripción actualizada exitosamente', 'success');
      } else {
        await inscripcionesService.create(formData);
        showNotification('Inscripción creada exitosamente', 'success');
      }
      navigate('/inscripciones');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al guardar inscripción';
      showNotification(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <h2 className={styles.title}>
          {isEdit ? 'Editar Inscripción' : 'Nueva Inscripción'}
        </h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Estudiante</label>
            {isEstudiante() ? (
              <div className={styles.readOnlyField}>
                {user.nombre_completo}
              </div>
            ) : (
              <select
                name="estudiante_id"
                value={formData.estudiante_id}
                onChange={handleChange}
                className={styles.select}
                disabled={isEdit}
              >
                <option value="">Seleccione un estudiante</option>
                {estudiantes.map(est => (
                  <option key={est.id} value={est.id}>
                    {est.usuario?.nombre_completo}
                  </option>
                ))}
              </select>
            )}
            {errors.estudiante_id && <span className={styles.error}>{errors.estudiante_id}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Curso</label>
            <select
              name="curso_id"
              value={formData.curso_id}
              onChange={handleChange}
              className={styles.select}
              disabled={isEdit}
            >
              <option value="">Seleccione un curso</option>
              {cursos.map(curso => (
                <option key={curso.id} value={curso.id}>
                  {curso.nombre} - {curso.codigo_curso}
                </option>
              ))}
            </select>
            {errors.curso_id && <span className={styles.error}>{errors.curso_id}</span>}
          </div>

          <Input
            label="Fecha de Inscripción"
            name="fecha_inscripcion"
            type="date"
            value={formData.fecha_inscripcion}
            onChange={handleChange}
            error={errors.fecha_inscripcion}
          />

          <div className={styles.formGroup}>
            <label className={styles.label}>Estado</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className={styles.select}
            >
              {Object.entries(ESTADOS_INSCRIPCION).map(([key, value]) => (
                <option key={key} value={value}>
                  {ESTADOS_INSCRIPCION_LABELS[value]}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Nota Final"
            name="nota"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.nota}
            onChange={handleChange}
            error={errors.nota}
            placeholder="Opcional"
          />

          <div className={styles.actions}>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/inscripciones')}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              loading={loading}
            >
              {isEdit ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default InscripcionForm;
