import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({setIsAuthenticated}) => {
const [formData, setFormData] = useState({ username: '', password: '' });
const [error, setError] = useState('');
const [success, setSuccess] = useState('');
const navigate = useNavigate();

const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const submitHandler = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://127.0.0.1:8000/users/login/', formData);
    console.log(response.data);
    
    const { token, user } = response.data;

    localStorage.setItem('token', token);

    setIsAuthenticated(true);

    
    setSuccess(user ? "Welcome, ${user.first_name}!" : 'Login successful!');
    setError('');

    navigate('/home');
    } catch (err) {
    setError('Invalid credentials, please try again.');
    setSuccess('');
    }
};

return (
    <div className="container mt-5">
    <h2 className="text-center mb-4">Manager Login</h2>
    <form onSubmit={submitHandler} className="w-50 mx-auto">
        <div className="mb-3">
        <input 
            type="text" 
            name="username" 
            className="form-control" 
            placeholder="Username" 
            value={formData.username} 
            onChange={changeHandler} 
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
            onChange={changeHandler} 
            required 
        />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
    </form>

    <p className="text-center mt-3">
        Not registered yet? <Link to="/signup">Create an account</Link>
    </p>

    {error && <p className="text-danger text-center mt-3">{error}</p>}
    {success && <p className="text-success text-center mt-3">{success}</p>}
    </div>
);
};

export default Login;

