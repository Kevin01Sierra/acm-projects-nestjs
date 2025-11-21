import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout, isProfesor, isEstudiante } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/dashboard" className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <span className={styles.logoText}>EduTrack</span>
        </Link>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          <Link to="/dashboard" className={styles.navLink}>
            📊 Dashboard
          </Link>
          
          {isProfesor() && (
            <Link to="/cursos" className={styles.navLink}>
              📚 Mis Cursos
            </Link>
          )}
          
          {isEstudiante() && (
            <>
              <Link to="/cursos" className={styles.navLink}>
                📚 Cursos
              </Link>
              <Link to="/inscripciones" className={styles.navLink}>
                📝 Mis Inscripciones
              </Link>
            </>
          )}
        </div>

        {/* User Menu */}
        <div className={styles.userSection}>
          <div className={styles.userInfo} onClick={toggleUserMenu}>
            <div className={styles.userAvatar}>
              {user?.nombre_completo?.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userData}>
              <span className={styles.userName}>{user?.nombre_completo}</span>
              <span className={styles.userRole}>
                {user?.rol === 'profesor' ? '👨‍🏫 Profesor' : '🎓 Estudiante'}
              </span>
            </div>
            <span className={styles.dropdownIcon}>▼</span>
          </div>

          {showUserMenu && (
            <div className={styles.userMenu}>
              <div className={styles.menuHeader}>
                <p className={styles.menuEmail}>{user?.correo}</p>
              </div>
              <Link to="/profile" className={styles.menuItem} onClick={() => setShowUserMenu(false)}>
                👤 Mi Perfil
              </Link>
              <button onClick={handleLogout} className={styles.menuItem}>
                🚪 Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
          {showMobileMenu ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className={styles.mobileMenu}>
          <Link to="/dashboard" className={styles.mobileLink} onClick={toggleMobileMenu}>
            📊 Dashboard
          </Link>
          
          {isProfesor() && (
            <Link to="/cursos" className={styles.mobileLink} onClick={toggleMobileMenu}>
              📚 Mis Cursos
            </Link>
          )}
          
          {isEstudiante() && (
            <>
              <Link to="/cursos" className={styles.mobileLink} onClick={toggleMobileMenu}>
                📚 Cursos
              </Link>
              <Link to="/inscripciones" className={styles.mobileLink} onClick={toggleMobileMenu}>
                📝 Mis Inscripciones
              </Link>
            </>
          )}
          
          <div className={styles.mobileDivider}></div>
          
          <Link to="/profile" className={styles.mobileLink} onClick={toggleMobileMenu}>
            👤 Mi Perfil
          </Link>
          
          <button onClick={handleLogout} className={styles.mobileLink}>
            🚪 Cerrar Sesión
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;