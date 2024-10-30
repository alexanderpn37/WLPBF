import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div className="container-fluid p-0">
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm">
                <div className="container-fluid">
                    
                <h1 className="navbar-brand mb-0">
                <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>WLPF</Link>
                </h1>

                    {/* Links for navigation */}
                    <div className="navbar" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/rentals" className="nav-link">Rental Field</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/scrimmage" className="nav-link">Scrimmage</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/field-management" className="nav-link">Field Management</Link>
                            </li>
                        </ul>

                        {/* Logout button on the right */}
                        <button className="btn btn-outline-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Dashboard;


