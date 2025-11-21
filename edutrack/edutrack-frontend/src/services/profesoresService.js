import api from './api';

const profesoresService = {
  getAll: async (params) => {
    const response = await api.get('/profesores', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/profesores/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/profesores', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/profesores/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/profesores/${id}`);
    return response.data;
  },
};

export default profesoresService;
