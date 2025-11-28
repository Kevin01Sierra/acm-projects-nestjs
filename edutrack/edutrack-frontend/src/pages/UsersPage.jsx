import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';
import Alert from '../components/common/Alert';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import usersService from '../services/usersService';
import styles from './UsersPage.module.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo: '',
    contrasena: '',
    rol: 'estudiante',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await usersService.getAll();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await usersService.delete(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        setError('Error al eliminar usuario');
      }
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Navbar />
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Gestión de Usuarios</h1>
            <p className={styles.subtitle}>Administra los usuarios del sistema</p>
          </div>
          <Button onClick={() => setShowModal(true)}>
            + Nuevo Usuario
          </Button>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className={styles.grid}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden' }}>
              <thead style={{ background: '#f3f4f6' }}>
                <tr>
                  <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Nombre</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Correo</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Rol</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{user.id}</td>
                    <td style={{ padding: '12px' }}>{user.nombre_completo}</td>
                    <td style={{ padding: '12px' }}>{user.correo}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '0.85em',
                        background: user.rol === 'admin' ? '#fee2e2' : user.rol === 'profesor' ? '#dbeafe' : '#d1fae5',
                        color: user.rol === 'admin' ? '#991b1b' : user.rol === 'profesor' ? '#1e40af' : '#065f46'
                      }}>
                        {user.rol}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
