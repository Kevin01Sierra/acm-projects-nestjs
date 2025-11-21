import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ROUTES, ROLE_ICONS } from '../../utils/constants';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout, isProfesor, isEstudiante } = useAuth();

  if (!user) return null;

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {ROLE_ICONS[user.rol] || '👤'}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user.nombre_completo}</span>
            <span className={styles.userRole}>{user.rol}</span>
          </div>
        </div>
      </div>

      <nav className={styles.nav}>
        <NavLink 
          to={ROUTES.DASHBOARD} 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={toggleSidebar}
        >
          📊 Dashboard
        </NavLink>

        <NavLink 
          to={ROUTES.CURSOS} 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={toggleSidebar}
        >
          📚 Cursos
        </NavLink>

        <NavLink 
          to={ROUTES.PROFESORES} 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={toggleSidebar}
        >
          👨‍🏫 Profesores
        </NavLink>

        <NavLink 
          to={ROUTES.ESTUDIANTES} 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={toggleSidebar}
        >
          🎓 Estudiantes
        </NavLink>

        <NavLink 
          to={ROUTES.INSCRIPCIONES} 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
          onClick={toggleSidebar}
        >
          📝 Inscripciones
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <button onClick={logout} className={styles.logoutButton}>
          🚪 Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
