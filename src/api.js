import axios from 'axios';

const api = axios.create({
  baseURL: 'https://free-ap-south-1.cosmocloud.io/development/api',
  headers: {
    'Content-Type': 'application/json',
    'environmentId': '66aba7c190ea89e275f47303',
    'projectId': '66aba7c190ea89e275f47302'
  },
});

export const getEmployees = (params) => api.get('/employees', {params});
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const createEmployee = (employee) => api.post('/employees', employee);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export default api;
