import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Newrental = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [rental_date, setDate] = useState('');
    const [rental_time, setTime] = useState('');
    const [number_of_players, setNumberOfPlayers] = useState('');
    const [caliber, setCaliber] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/rentals/reservation/", {
            first_name,
            last_name,
            phone_number,
            email,
            rental_date,
            rental_time,
            number_of_players,
            caliber 
        }, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then((res) => {
            console.log(res);
            navigate('/home'); 
        })
        .catch((err) => { 
            console.log(err);
            if (err.response && err.response.data && err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ general: 'An error occurred' });
            }
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">New Rental</h2>

            <form onSubmit={submitHandler} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={first_name}
                        placeholder="First Name..."
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={last_name}
                        placeholder="Last Name..."
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={phone_number}
                        placeholder="Phone Number..."
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phone_number && <p className="text-danger">{errors.phone_number.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        placeholder="Email..."
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={rental_date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.rental_date && <p className="text-danger">{errors.rental_date.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input
                        type="time"
                        className="form-control"
                        value={rental_time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    {errors.rental_time && <p className="text-danger">{errors.rental_time.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Number of Players</label>
                    <input
                        type="number"
                        className="form-control"
                        value={number_of_players}
                        placeholder="Number of Players..."
                        onChange={(e) => setNumberOfPlayers(e.target.value)}
                    />
                    {errors.number_of_players && <p className="text-danger">{errors.number_of_players.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Caliber</label>
                    <select
                    className="form-control"
                    value={caliber}
                    onChange={(e) => setCaliber(e.target.value)}
                    >
                        <option value="">Select Caliber</option>
                        <option value=".68">.68</option>
                        <option value=".50">.50</option>
                    </select>
                    {errors.caliber && <p className="text-danger">{errors.caliber.message}</p>}
                </div>

                {errors.general && <p className="text-danger">{errors.general}</p>}

                <button type="submit" className="btn btn-primary w-100">Submit Rental</button>
                <button className="btn btn-secondary mt-3" onClick={() => navigate('/home')}>Back to Home</button>
            </form>
        </div>
    );
};

export default Newrental;
