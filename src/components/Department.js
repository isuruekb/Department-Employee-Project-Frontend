import React, { useState, useEffect } from 'react';
import { fetchDepartments, createDepartment, updateDepartment, deleteDepartment } from '../services/api';
import '../css/Department.css'; 

const Department = () => {
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState({ departmentCode: '', departmentName: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentDepartmentId, setCurrentDepartmentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    
    const loadDepartments = async () => {
        try {
            setLoading(true);
            const data = await fetchDepartments();
            setDepartments(data);
        } catch (error) {
            setErrorMessage('Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const departmentData = {
            departmentCode: newDepartment.departmentCode,
            departmentName: newDepartment.departmentName,
        };
    
        try {
            if (isEditing) {
                
                await updateDepartment(currentDepartmentId, { ...departmentData, departmentID: currentDepartmentId });
                setSuccessMessage('Department updated successfully!');
            } else {
                
                await createDepartment(departmentData);
                setSuccessMessage('Department added successfully!');
            }
            setNewDepartment({ departmentCode: '', departmentName: '' });
            setIsEditing(false);
            loadDepartments();
        } catch (error) {
            setErrorMessage('Failed to save department');
            console.error('Error creating department:', error); 
        }
    };
    
    

    // Edit department
    const handleEdit = (department) => {
        setNewDepartment({
            departmentCode: department.departmentCode,
            departmentName: department.departmentName,
        });
        setIsEditing(true);
        setCurrentDepartmentId(department.departmentID);
    };

    // Delete department
    const handleDelete = async (id) => {
        try {
            await deleteDepartment(id);
            setSuccessMessage('Department deleted successfully!');
            loadDepartments();
        } catch (error) {
            setErrorMessage('Failed to delete department');
        }
    };

    return (
        <div className="department-container">
            <h2 className="department-header">Departments</h2>

            <form onSubmit={handleSubmit} className="department-form">
                <input
                    type="text"
                    placeholder="Department Code"
                    value={newDepartment.departmentCode}
                    onChange={(e) => setNewDepartment({ ...newDepartment, departmentCode: e.target.value })}
                    required
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Department Name"
                    value={newDepartment.departmentName}
                    onChange={(e) => setNewDepartment({ ...newDepartment, departmentName: e.target.value })}
                    required
                    className="input-field"
                />
                <div className="button-group">
                    <button type="submit" className="primary-button">
                        {isEditing ? 'Update' : 'Add'} Department
                    </button>
                    {isEditing && (
                        <button type="button" onClick={() => setIsEditing(false)} className="secondary-button">
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
                            <th>Department Code</th>
                            <th>Department Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept) => (
                            <tr key={dept.departmentID}>
                                <td>{dept.departmentCode}</td>
                                <td>{dept.departmentName}</td>
                                <td>
                                    <button onClick={() => handleEdit(dept)} className="primary-button">
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(dept.departmentID)} className="secondary-button">
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

export default Department;
