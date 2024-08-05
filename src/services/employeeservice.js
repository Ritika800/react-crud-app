import axios from 'axios';

const API_URL = 'https://api.cosmocloud.io/employees';

export const getEmployees = () => axios.get(API_URL);
export const getEmployeeById = (id) => axios.get(${API_URL}/${id});
export const createEmployee = (employeeData) => axios.post(API_URL, employeeData);
export const deleteEmployee = (id) => axios.delete(${API_URL}/${id});
