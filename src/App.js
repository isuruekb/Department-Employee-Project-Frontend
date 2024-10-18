import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Department from './components/Department';
import Employee from './components/Employee';
import './css/App.css'; 

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <nav className="navbar">
                    <ul className="nav-list">
                        <li>
                            <Link to="/Departments" className="nav-link">Departments</Link>
                        </li>
                        <li>
                            <Link to="/Employees" className="nav-link">Employees</Link>
                        </li>
                    </ul>
                </nav>

                <main className="content">
                    <Routes>
                        <Route path="/Departments" element={<Department />} />
                        <Route path="/Employees" element={<Employee />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
