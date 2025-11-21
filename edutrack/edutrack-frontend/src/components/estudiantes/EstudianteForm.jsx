import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import estudiantesService from '../../services/estudiantesService';
import { useNotification } from '../../context/NotificationContext';
import { validateEstudianteForm } from '../../utils/validators';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import styles from './EstudianteForm.module.css';

const EstudianteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    usuario_id: '',
    anio_ingreso: new Date().getFullYear(),
    telefono: '',
    semestre_actual: 1,
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadEstudiante();
    }
  }, [id]);

  const loadEstudiante = async () => {
    try {
      const data = await estudiantesService.getById(id);
      setFormData({
        usuario_id: data.usuario_id,
        anio_ingreso: data.anio_ingreso,
        telefono: data.telefono || '',
        semestre_actual: data.semestre_actual,
      });
    } catch (error) {
      showNotification('Error al cargar datos del estudiante', 'error');
      navigate('/estudiantes');
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
    
    const validationErrors = validateEstudianteForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await estudiantesService.update(id, formData);
        showNotification('Estudiante actualizado exitosamente', 'success');
      } else {
        await estudiantesService.create(formData);
        showNotification('Estudiante creado exitosamente', 'success');
      }
      navigate('/estudiantes');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al guardar estudiante';
      showNotification(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <h2 className={styles.title}>
          {isEdit ? 'Editar Estudiante' : 'Nuevo Estudiante'}
        </h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="ID Usuario"
            name="usuario_id"
            type="number"
            value={formData.usuario_id}
            onChange={handleChange}
            error={errors.usuario_id}
            disabled={isEdit}
            placeholder="ID del usuario existente"
          />

          <Input
            label="Año de Ingreso"
            name="anio_ingreso"
            type="number"
            value={formData.anio_ingreso}
            onChange={handleChange}
            error={errors.anio_ingreso}
          />

          <Input
            label="Semestre Actual"
            name="semestre_actual"
            type="number"
            value={formData.semestre_actual}
            onChange={handleChange}
            error={errors.semestre_actual}
            min="1"
            max="12"
          />

          <Input
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
            placeholder="1234567890"
          />

          <div className={styles.actions}>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/estudiantes')}
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

export default EstudianteForm;
