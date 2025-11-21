import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import profesoresService from '../../services/profesoresService';
import { useNotification } from '../../context/NotificationContext';
import { validateProfesorForm } from '../../utils/validators';
import { ESPECIALIDADES } from '../../utils/constants';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import styles from './ProfesorForm.module.css';

const ProfesorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showNotification } = useNotification();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    usuario_id: '', // Se debería seleccionar un usuario existente o crear uno nuevo
    especialidad: '',
    telefono: '',
    biografia: '',
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      loadProfesor();
    }
  }, [id]);

  const loadProfesor = async () => {
    try {
      const data = await profesoresService.getById(id);
      setFormData({
        usuario_id: data.usuario_id,
        especialidad: data.especialidad,
        telefono: data.telefono || '',
        biografia: data.biografia || '',
      });
    } catch (error) {
      showNotification('Error al cargar datos del profesor', 'error');
      navigate('/profesores');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    const validationErrors = validateProfesorForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      if (isEdit) {
        await profesoresService.update(id, formData);
        showNotification('Profesor actualizado exitosamente', 'success');
      } else {
        await profesoresService.create(formData);
        showNotification('Profesor creado exitosamente', 'success');
      }
      navigate('/profesores');
    } catch (error) {
      const msg = error.response?.data?.message || 'Error al guardar profesor';
      showNotification(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Card className={styles.formCard}>
        <h2 className={styles.title}>
          {isEdit ? 'Editar Profesor' : 'Nuevo Profesor'}
        </h2>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Nota: En un caso real, aquí deberíamos tener un selector de usuarios 
              o un formulario anidado para crear el usuario primero */}
          <Input
            label="ID Usuario"
            name="usuario_id"
            type="number"
            value={formData.usuario_id}
            onChange={handleChange}
            error={errors.usuario_id}
            disabled={isEdit} // No se suele cambiar el usuario asociado
            placeholder="ID del usuario existente"
          />

          <div className={styles.formGroup}>
            <label className={styles.label}>Especialidad</label>
            <select
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="">Seleccione una especialidad</option>
              {ESPECIALIDADES.map(esp => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
            {errors.especialidad && <span className={styles.error}>{errors.especialidad}</span>}
          </div>

          <Input
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            error={errors.telefono}
            placeholder="1234567890"
          />

          <div className={styles.formGroup}>
            <label className={styles.label}>Biografía</label>
            <textarea
              name="biografia"
              value={formData.biografia}
              onChange={handleChange}
              className={styles.textarea}
              rows="4"
              placeholder="Breve descripción profesional..."
            />
            {errors.biografia && <span className={styles.error}>{errors.biografia}</span>}
          </div>

          <div className={styles.actions}>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/profesores')}
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

export default ProfesorForm;
