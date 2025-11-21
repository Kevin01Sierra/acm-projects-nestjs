import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import styles from './Register.module.css';
import { validateRegisterForm } from '../../utils/validators';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    rol: 'estudiante',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const validationErrors = validateRegisterForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!validate()) {
      setAlert({
        type: 'error',
        message: 'Por favor corrige los errores en el formulario',
      });
      return;
    }

    setLoading(true);

    try {
      const { confirmarContrasena, ...userData } = formData;
      const result = await register(userData);

      if (!result.success) {
        setAlert({
          type: 'error',
          message: result.message || 'Error al registrarse',
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Error al registrarse. Por favor intenta de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <div className={styles.registerHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
            <h1 className={styles.logoText}>EduTrack</h1>
          </div>
          <h2 className={styles.title}>Crear Cuenta</h2>
          <p className={styles.subtitle}>
            Completa el formulario para registrarte
          </p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={handleSubmit} className={styles.registerForm}>
          <Input
            label="Nombre Completo"
            type="text"
            name="nombre_completo"
            value={formData.nombre_completo}
            onChange={handleChange}
            placeholder="Juan Pérez García"
            error={errors.nombre_completo}
            required
            icon="👤"
          />

          <Input
            label="Correo Electrónico"
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="tu@correo.com"
            error={errors.correo}
            required
            icon="📧"
          />

          <Input
            label="Contraseña"
            type="password"
            name="contrasena"
            value={formData.contrasena}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.contrasena}
            required
            icon="🔒"
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            name="confirmarContrasena"
            value={formData.confirmarContrasena}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.confirmarContrasena}
            required
            icon="🔒"
          />

          <div className={styles.roleSelector}>
            <label className={styles.roleLabel}>
              Tipo de Usuario <span className={styles.required}>*</span>
            </label>
            <div className={styles.roleOptions}>
              <label className={`${styles.roleOption} ${formData.rol === 'estudiante' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="rol"
                  value="estudiante"
                  checked={formData.rol === 'estudiante'}
                  onChange={handleChange}
                />
                <div className={styles.roleContent}>
                  <span className={styles.roleIcon}>🎓</span>
                  <span className={styles.roleText}>Estudiante</span>
                </div>
              </label>

              <label className={`${styles.roleOption} ${formData.rol === 'profesor' ? styles.selected : ''}`}>
                <input
                  type="radio"
                  name="rol"
                  value="profesor"
                  checked={formData.rol === 'profesor'}
                  onChange={handleChange}
                />
                <div className={styles.roleContent}>
                  <span className={styles.roleIcon}>👨‍🏫</span>
                  <span className={styles.roleText}>Profesor</span>
                </div>
              </label>
            </div>
            {errors.rol && <span className={styles.errorMessage}>{errors.rol}</span>}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Registrarse
          </Button>
        </form>

        <div className={styles.registerFooter}>
          <p className={styles.footerText}>
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className={styles.footerLink}>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>

      <div className={styles.decorations}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
};

export default Register;