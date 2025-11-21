import api from './api';

const cursosService = {
  getAll: async (params) => {
    const response = await api.get('/cursos', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/cursos/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/cursos', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/cursos/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/cursos/${id}`);
    return response.data;
  },
};

export default cursosService;
