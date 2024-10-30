import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Newrental = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [caliber, setCaliber] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8005/api/patients", {
            firstName,
            lastName,
            phoneNumber,
            email,
            date,
            time,
            numberOfPlayers,
            caliber 
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
                        value={firstName}
                        placeholder="First Name..."
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastName}
                        placeholder="Last Name..."
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                        type="tel"
                        className="form-control"
                        value={phoneNumber}
                        placeholder="Phone Number..."
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
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
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    {errors.date && <p className="text-danger">{errors.date.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Time</label>
                    <input
                        type="time"
                        className="form-control"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                    {errors.time && <p className="text-danger">{errors.time.message}</p>}
                </div>

                <div className="mb-3">
                    <label className="form-label">Number of Players</label>
                    <input
                        type="number"
                        className="form-control"
                        value={numberOfPlayers}
                        placeholder="Number of Players..."
                        onChange={(e) => setNumberOfPlayers(e.target.value)}
                    />
                    {errors.numberOfPlayers && <p className="text-danger">{errors.numberOfPlayers.message}</p>}
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
