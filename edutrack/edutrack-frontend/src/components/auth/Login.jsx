import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Alert from '../common/Alert';
import styles from './Login.module.css';
import { validateLoginForm } from '../../utils/validators';

const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
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
    const validationErrors = validateLoginForm(formData);
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
      const result = await login(formData.correo, formData.contrasena);

      if (!result.success) {
        setAlert({
          type: 'error',
          message: result.message || 'Error al iniciar sesión',
        });
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Error al iniciar sesión. Por favor intenta de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🎓</span>
            <h1 className={styles.logoText}>EduTrack</h1>
          </div>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <p className={styles.subtitle}>
            Ingresa tus credenciales para acceder al sistema
          </p>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className={styles.loginFooter}>
          <p className={styles.footerText}>
            ¿No tienes una cuenta?{' '}
            <Link to="/register" className={styles.footerLink}>
              Regístrate aquí
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

export default Login;