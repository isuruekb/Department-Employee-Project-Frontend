import React, { useState, useEffect } from 'react';
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee, fetchDepartments } from '../services/api';
import '../css/Employee.css'; 

const Employee = () => {
    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [newEmployee, setNewEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        salary: '',
        departmentID: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const loadEmployees = async () => {
        try {
            setLoading(true);
            const employeeData = await fetchEmployees();
            setEmployees(employeeData);
        } catch (error) {
            setErrorMessage('Failed to fetch employees');
        } finally {
            setLoading(false);
        }
    };

    const loadDepartments = async () => {
        const departmentData = await fetchDepartments();
        setDepartments(departmentData);
    };

    useEffect(() => {
        loadEmployees();
        loadDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeData = {
            employeeID: currentEmployeeId, 
            firstName: newEmployee.firstName,
            lastName: newEmployee.lastName,
            email: newEmployee.email,
            dateOfBirth: newEmployee.dob, 
            salary: parseFloat(newEmployee.salary), 
            departmentID: parseInt(newEmployee.departmentID, 10), 
        };
    
        try {
            if (isEditing) {
                await updateEmployee(currentEmployeeId, employeeData);
                setSuccessMessage('Employee updated successfully!');
            } else {
                await createEmployee(employeeData);
                setSuccessMessage('Employee added successfully!');
            }
            resetForm();
            loadEmployees();
        } catch (error) {
            setErrorMessage('Failed to save employee: ' + error.message);
            console.error(error);
        }
    };
    

    const handleEdit = (employee) => {
        setNewEmployee({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            dob: employee.dateOfBirth.split('T')[0], 
            salary: employee.salary,
            departmentID: employee.departmentID
        });
        setIsEditing(true);
        setCurrentEmployeeId(employee.employeeID); 
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            setSuccessMessage('Employee deleted successfully!');
            loadEmployees();
        } catch (error) {
            setErrorMessage('Failed to delete employee');
        }
    };

    const resetForm = () => {
        setNewEmployee({
            firstName: '',
            lastName: '',
            email: '',
            dob: '',
            salary: '',
            departmentID: ''
        });
        setIsEditing(false);
        setCurrentEmployeeId(null); 
    };

    return (
        <div className="employee-container">
            <h2 className="employee-header">Employees</h2>

            <form onSubmit={handleSubmit} className="employee-form">
                {/* Form inputs */}
                <input
                    type="text"
                    placeholder="First Name"
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                    required
                    className="input-field"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    required
                    className="input-field"
                />
                <input
                    type="date"
                    placeholder="Date of Birth"
                    value={newEmployee.dob}
                    onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })}
                    required
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Salary"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                    required
                    className="input-field"
                />
                <select
                    value={newEmployee.departmentID}
                    onChange={(e) => setNewEmployee({ ...newEmployee, departmentID: e.target.value })}
                    required
                    className="select-field"
                >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                        <option key={dept.departmentID} value={dept.departmentID}>
                            {dept.departmentName}
                        </option>
                    ))}
                </select>
                <div className="button-group">
                    <button type="submit" className="primary-button">
                        {isEditing ? 'Update' : 'Add'} Employee
                    </button>
                    {isEditing && (
                        <button type="button" onClick={resetForm} className="secondary-button">
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Salary</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp) => (
                            <tr key={emp.employeeID}>
                                <td>{emp.firstName}</td>
                                <td>{emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.age}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.department.departmentName}</td>
                                <td>
                                    <button onClick={() => handleEdit(emp)} className="primary-button">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(emp.employeeID)} className="secondary-button">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
};

export default Employee;
