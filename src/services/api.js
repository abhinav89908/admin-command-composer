
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const commandService = {
  getAll: async () => {
    const response = await api.get('/commands');
    return response.data;
  },
  
  get: async (id) => {
    const response = await api.get(`/commands/${id}`);
    return response.data;
  },
  
  create: async (command) => {
    const response = await api.post('/commands', command);
    return response.data;
  },
  
  update: async (id, command) => {
    const response = await api.put(`/commands/${id}`, command);
    return response.data;
  },
  
  delete: async (id) => {
    await api.delete(`/commands/${id}`);
    return id;
  },
};

export const flowService = {
  getAll: async () => {
    const response = await api.get('/flows');
    return response.data;
  },
  
  get: async (id) => {
    const response = await api.get(`/flows/${id}`);
    return response.data;
  },
  
  create: async (flow) => {
    const response = await api.post('/flows', flow);
    return response.data;
  },
  
  update: async (id, flow) => {
    const response = await api.put(`/flows/${id}`, flow);
    return response.data;
  },
  
  delete: async (id) => {
    await api.delete(`/flows/${id}`);
    return id;
  },
};

export const executionService = {
  getAll: async () => {
    const response = await api.get('/executions');
    return response.data;
  },
  
  get: async (id) => {
    const response = await api.get(`/executions/${id}`);
    return response.data;
  },
  
  execute: async (flowId) => {
    const response = await api.post('/execute', { flowId });
    return response.data;
  },
};

export default api;
