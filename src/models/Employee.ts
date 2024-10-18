import { Department } from './Department';

export interface Employee {
    employeeID: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string; 
    age: number;
    salary: number;
    departmentID: number;
    department?: Department; 
}
