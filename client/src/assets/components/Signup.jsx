import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
});
const [message, setMessage] = useState('');
const navigate = useNavigate(); 

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
    const response = await axios.post('http://localhost:8005/api/register', formData);
    setMessage('Profile created successfully!');
    } catch (err) {
    setMessage('Profile creation failed. Please try again.');
    }
};

return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">User Sign Up</h2>
    <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
        />
        </div>
        <div className="mb-3">
        <input
            type="lastname"
            className="form-control"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
        />
        </div>
        <div className="mb-3">
        <input
            type="text"
            className="form-control"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
        />
        </div>
        <div className="mb-3">
            <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
        />
        </div>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
    </form>

    
    {message && <p className="text-center mt-3">{message}</p>}

    
    <div className="text-center mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
        Back to Login
        </button>
    </div>
    </div>
);
};

export default SignUp; 