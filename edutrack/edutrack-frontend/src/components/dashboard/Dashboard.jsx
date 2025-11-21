import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import Button from '../common/Button';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user, isProfesor, isEstudiante } = useAuth();
  const [stats, setStats] = useState({
    cursos: 0,
    estudiantes: 0,
    inscripciones: 0,
  });

  useEffect(() => {
    // Aquí podrías cargar estadísticas reales desde la API
    // Por ahora usamos datos de ejemplo
    setStats({
      cursos: 12,
      estudiantes: 150,
      inscripciones: 45,
    });
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>
            ¡Bienvenido, {user?.nombre_completo?.split(' ')[0]}! 👋
          </h1>
          <p className={styles.subtitle}>
            {isProfesor() 
              ? 'Panel de control para profesores' 
              : 'Tu espacio de aprendizaje personalizado'}
          </p>
        </div>
        <div className={styles.headerActions}>
          <Button 
            variant="primary" 
            onClick={() => window.location.href = '/profile'}
          >
            👤 Ver Perfil
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className={styles.statsGrid}>
        <Card hoverable className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statIcon} style={{ background: 'var(--pastel-blue)' }}>
              📚
            </div>
            <div className={styles.statInfo}>
              <h3 className={styles.statValue}>{stats.cursos}</h3>
              <p className={styles.statLabel}>
                {isProfesor() ? 'Cursos Impartidos' : 'Cursos Disponibles'}
              </p>
            </div>
          </div>
        </Card>

        <Card hoverable className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statIcon} style={{ background: 'var(--pastel-green)' }}>
              {isProfesor() ? '👥' : '📝'}
            </div>
            <div className={styles.statInfo}>
              <h3 className={styles.statValue}>
                {isProfesor() ? stats.estudiantes : stats.inscripciones}
              </h3>
              <p className={styles.statLabel}>
                {isProfesor() ? 'Estudiantes Activos' : 'Mis Inscripciones'}
              </p>
            </div>
          </div>
        </Card>

        <Card hoverable className={styles.statCard}>
          <div className={styles.statContent}>
            <div className={styles.statIcon} style={{ background: 'var(--pastel-yellow)' }}>
              ⭐
            </div>
            <div className={styles.statInfo}>
              <h3 className={styles.statValue}>
                {isProfesor() ? '4.8' : '3.9'}
              </h3>
              <p className={styles.statLabel}>
                {isProfesor() ? 'Calificación Promedio' : 'Promedio General'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className={styles.quickActions}>
        <h2 className={styles.sectionTitle}>⚡ Acciones Rápidas</h2>
        <div className={styles.actionsGrid}>
          {isProfesor() ? (
            <>
              <Card hoverable className={styles.actionCard}>
                <div className={styles.actionContent}>
                  <span className={styles.actionIcon}>➕</span>
                  <h3 className={styles.actionTitle}>Crear Curso</h3>
                  <p className={styles.actionDescription}>
                    Crea un nuevo curso para tus estudiantes
                  </p>
                  <Link to="/cursos/nuevo">
                    <Button variant="primary" size="sm" fullWidth>
                      Crear Ahora
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card hoverable className={styles.actionCard}>
                <div className={styles.actionContent}>
                  <span className={styles.actionIcon}>📊</span>
                  <h3 className={styles.actionTitle}>Ver Cursos</h3>
                  <p className={styles.actionDescription}>
                    Administra tus cursos existentes
                  </p>
                  <Link to="/cursos">
                    <Button variant="secondary" size="sm" fullWidth>
                      Ver Todos
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card hoverable className={styles.actionCard}>
                <div className={styles.actionContent}>
                  <span className={styles.actionIcon}>👥</span>
                  <h3 className={styles.actionTitle}>Estudiantes</h3>
                  <p className={styles.actionDescription}>
                    Revisa el progreso de tus estudiantes
                  </p>
                  <Link to="/estudiantes">
                    <Button variant="success" size="sm" fullWidth>
                      Ver Lista
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          ) : (
            <>
              <Card hoverable className={styles.actionCard}>
                <div className={styles.actionContent}>
                  <span className={styles.actionIcon}>🔍</span>
                  <h3 className={styles.actionTitle}>Explorar Cursos</h3>
                  <p className={styles.actionDescription}>
                    Descubre nuevos cursos disponibles
                  </p>
                  <Link to="/cursos">
                    <Button variant="primary" size="sm" fullWidth>
                      Explorar
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card hoverable className={styles.actionCard}>
                <div className={styles.actionContent}>
                  <span className={styles.actionIcon}>📝</span>
                  <h3 className={styles.actionTitle}>Mis Inscripciones</h3>
                  <p className={styles.actionDescription}>
                    Revisa tus cursos actuales
                  </p>
                  <Link to="/inscripciones">
                    <Button variant="secondary" size="sm" fullWidth>
                      Ver Mis Cursos
                    </Button>
                  </Link>
                </div>
              </Card>

              <Card hoverable className={styles.actionCard}>
                <div className={styles.actionContent}>
                  <span className={styles.actionIcon}>📈</span>
                  <h3 className={styles.actionTitle}>Mi Progreso</h3>
                  <p className={styles.actionDescription}>
                    Consulta tu rendimiento académico
                  </p>
                  <Link to="/progreso">
                    <Button variant="success" size="sm" fullWidth>
                      Ver Notas
                    </Button>
                  </Link>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Actividad Reciente */}
      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>📌 Actividad Reciente</h2>
        <Card>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ background: 'var(--pastel-blue)' }}>
                📚
              </div>
              <div className={styles.activityDetails}>
                <p className={styles.activityText}>
                  {isProfesor() 
                    ? 'Nuevo estudiante inscrito en Cálculo Diferencial'
                    : 'Te inscribiste en el curso de Matemáticas Avanzadas'}
                </p>
                <span className={styles.activityTime}>Hace 2 horas</span>
              </div>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ background: 'var(--pastel-green)' }}>
                ✅
              </div>
              <div className={styles.activityDetails}>
                <p className={styles.activityText}>
                  {isProfesor()
                    ? 'Calificaste 15 tareas del curso de Física'
                    : 'Completaste la tarea de Programación Web'}
                </p>
                <span className={styles.activityTime}>Hace 5 horas</span>
              </div>
            </div>

            <div className={styles.activityItem}>
              <div className={styles.activityIcon} style={{ background: 'var(--pastel-yellow)' }}>
                🎉
              </div>
              <div className={styles.activityDetails}>
                <p className={styles.activityText}>
                  {isProfesor()
                    ? '3 nuevos estudiantes se inscribieron en tus cursos'
                    : 'Obtuviste 4.5 en tu último examen'}
                </p>
                <span className={styles.activityTime}>Hace 1 día</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;