import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const loadUser = () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (correo, contrasena) => {
    try {
      const data = await authService.login({ correo, contrasena });
      const { token: newToken, user: userData } = data;

      // Guardar en estado y localStorage
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirigir al dashboard
      navigate('/dashboard');

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al iniciar sesión',
      };
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      const { token: newToken, user: newUser } = data;

      // Guardar en estado y localStorage
      setToken(newToken);
      setUser(newUser);
      localStorage.setItem('token', newToken);
      localStorage.setItem('user', JSON.stringify(newUser));

      // Redirigir al dashboard
      navigate('/dashboard');

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Error al registrarse',
        errors: error.errors || [],
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!token && !!user;
  };

  const isProfesor = () => {
    return user?.rol === 'profesor';
  };

  const isEstudiante = () => {
    return user?.rol === 'estudiante';
  };

  const isAdmin = () => {
    return user?.rol === 'admin';
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isProfesor,
    isEstudiante,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};