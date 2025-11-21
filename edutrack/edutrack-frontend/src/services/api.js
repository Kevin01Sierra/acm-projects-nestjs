import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Error con respuesta del servidor
      const { status, data } = error.response;
      
      // Si es 401, redirigir al login
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      
      // Propagar el error con información útil
      return Promise.reject({
        status,
        message: data.message || 'Error en la petición',
        errors: data.errors || [],
      });
    } else if (error.request) {
      // Error de red
      return Promise.reject({
        message: 'No se pudo conectar con el servidor. Verifica tu conexión.',
      });
    } else {
      // Otro tipo de error
      return Promise.reject({
        message: error.message || 'Error desconocido',
      });
    }
  }
);

export default api;