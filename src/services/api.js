import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7000/api', 
});

// Error handling function
const handleError = (error) => {
    console.error('API call error:', error);
    throw error; // re-throw the error for further handling if needed
};

// Department API calls
export const fetchDepartments = async () => {
    try {
        const response = await api.get('/Departments');
        console.log("response", response)
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createDepartment = async (department) => {
    try {
        const response = await api.post('/Departments', department);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateDepartment = async (id, department) => {
    try {
        const response = await api.put(`/Departments/${id}`, department);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteDepartment = async (id) => {
    try {
        const response = await api.delete(`/Departments/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

// Employee API calls
export const fetchEmployees = async () => {
    try {
        const response = await api.get('/Employees');
        console.log("response", response)
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const createEmployee = async (employee) => {
    try {
        const response = await api.post('/Employees', employee);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const updateEmployee = async (id, employee) => {
    try {
        const response = await api.put(`/Employees/${id}`, employee);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteEmployee = async (id) => {
    try {
        const response = await api.delete(`/Employees/${id}`);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};
