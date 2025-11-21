import api from './api';

const inscripcionesService = {
  getAll: async (params) => {
    const response = await api.get('/inscripciones', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/inscripciones/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/inscripciones', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/inscripciones/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/inscripciones/${id}`);
    return response.data;
  },
};

export default inscripcionesService;
