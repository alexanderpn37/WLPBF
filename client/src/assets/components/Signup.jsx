import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [formData, setFormData] = useState({
        username: '',       
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
            await axios.post('http://localhost:8000/users/signup', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            setMessage('Profile created successfully!');
            setTimeout(() => navigate('/'), 1500);  
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
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        placeholder="First Name"
                        value={formData.first_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        placeholder="Last Name"
                        value={formData.last_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        name="email"
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
                        name="password"
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
