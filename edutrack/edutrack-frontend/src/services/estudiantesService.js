import api from './api';

const estudiantesService = {
  getAll: async (params) => {
    const response = await api.get('/estudiantes', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/estudiantes/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/estudiantes', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/estudiantes/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/estudiantes/${id}`);
    return response.data;
  },
};

export default estudiantesService;
