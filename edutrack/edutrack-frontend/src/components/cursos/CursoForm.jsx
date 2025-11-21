import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cursosService from '../../services/cursosService';
import profesoresService from '../../services/profesoresService';
import { useNotification } from '../../context/NotificationContext';
import { validateCursoForm } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import styles from './CursoForm.module.css';

const CursoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    creditos: 3,
    codigo_curso: '',
    cupo_maximo: 30,
    profesor_id: '',
  });
  
  const [profesores, setProfesores] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfesores();
    if (isEdit) {
      loadCurso();
    }
  }, [id]);

  const loadProfesores = async () => {
    try {
      const data = await profesoresService.getAll();
      setProfesores(data);
    } catch (error) {
      showNotification('Error al cargar lista de profesores', 'error');
    }
  };

  const loadCurso = async () => {
    try {
      const data = await cursosService.getById(id);
      setFormData({
        nombre: data.nombre,
        descripcion: data.descripcion,
        creditos: data.creditos,
        codigo_curso: data.codigo_curso,
        cupo_maximo: data.cupo_maximo,
        profesor_id: data.profesor_id,
      });
    } catch (error) {
      showNotification('Error al cargar datos del curso', 'error');
      navigate('/cursos');
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
    
    const validationErrors = validateCursoForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await cursosService.update(id, formData);
        showNotification('Curso actualizado exitosamente', 'success');
      } else {
        await cursosService.create(formData);
        showNotification('Curso creado exitosamente', 'success');
      }
      navigate('/cursos');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al guardar curso';
      showNotification(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <h2 className={styles.title}>
          {isEdit ? 'Editar Curso' : 'Nuevo Curso'}
        </h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Nombre del Curso"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            error={errors.nombre}
            placeholder="Ej. Matemáticas I"
          />

          <Input
            label="Código"
            name="codigo_curso"
            value={formData.codigo_curso}
            onChange={handleChange}
            error={errors.codigo_curso}
            placeholder="MAT101"
          />

          <div className={styles.row}>
            <Input
              label="Créditos"
              name="creditos"
              type="number"
              value={formData.creditos}
              onChange={handleChange}
              error={errors.creditos}
              min="1"
              max="10"
            />

            <Input
              label="Cupo Máximo"
              name="cupo_maximo"
              type="number"
              value={formData.cupo_maximo}
              onChange={handleChange}
              error={errors.cupo_maximo}
              min="1"
              max="100"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className={styles.textarea}
              rows="4"
              placeholder="Descripción detallada del curso..."
            />
            {errors.descripcion && <span className={styles.error}>{errors.descripcion}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Profesor Asignado</label>
            <select
              name="profesor_id"
              value={formData.profesor_id}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Seleccione un profesor</option>
              {profesores.map(prof => (
                <option key={prof.id} value={prof.id}>
                  {prof.usuario?.nombre_completo} - {prof.especialidad}
                </option>
              ))}
            </select>
            {errors.profesor_id && <span className={styles.error}>{errors.profesor_id}</span>}
          </div>

          <div className={styles.actions}>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/cursos')}
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

export default CursoForm;
