import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
    const [rental, setRental] = useState(null);  
    const [errors, setErrors] = useState({});
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/rentals/reservation/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then((res) => {
            setRental(res.data);  
        })
        .catch((err) => {
            console.log("Error fetching data:", err);
        });
    }, [id, token]);

    const updateHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/rentals/reservation/${id}/`, rental, {  
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(() => {
            navigate(`/home`);
        })
        .catch((err) => {
            if (err.response && err.response.data) {
                setErrors(err.response.data.errors || {});
            } else {
                console.log("Error updating reservation:", err);
            }
        });
    };


    const handleChange = (e) => {
        setRental({
            ...rental,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Update Reservation</h2>
            {rental ? (
                <form onSubmit={updateHandler} className="w-50 mx-auto">
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            className="form-control"
                            value={rental.first_name || ""}
                            onChange={handleChange}
                        />
                        {errors.first_name && <p className="text-danger">{errors.first_name.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            className="form-control"
                            value={rental.last_name || ""}
                            onChange={handleChange}
                        />
                        {errors.last_name && <p className="text-danger">{errors.last_name.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            name="phone_number"
                            className="form-control"
                            value={rental.phone_number || ""}
                            onChange={handleChange}
                        />
                        {errors.phone_number && <p className="text-danger">{errors.phone_number.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={rental.email || ""}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Date</label>
                        <input
                            type="date"
                            name="rental_date"
                            className="form-control"
                            value={rental.rental_date || ""}
                            onChange={handleChange}
                        />
                        {errors.rental_date && <p className="text-danger">{errors.rental_date.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Time</label>
                        <input
                            type="time"
                            name="rental_time"
                            className="form-control"
                            value={rental.rental_time || ""}
                            onChange={handleChange}
                        />
                        {errors.rental_time && <p className="text-danger">{errors.rental_time.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Number of Players</label>
                        <input
                            type="number"
                            name="number_of_players"
                            className="form-control"
                            value={rental.number_of_players || ""}
                            onChange={handleChange}
                        />
                        {errors.number_of_players && <p className="text-danger">{errors.number_of_players.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Caliber</label>
                        <select
                            name="caliber"
                            className="form-control"
                            value={rental.caliber || ""}
                            onChange={handleChange}
                        >
                            <option value="">Select Caliber</option>
                            <option value=".68">.68</option>
                            <option value=".50">.50</option>
                        </select>
                        {errors.caliber && <p className="text-danger">{errors.caliber.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Submit Rental</button>
                    <button type="button" className="btn btn-secondary mt-3" onClick={() => navigate('/home')}>Back to Home</button>
                </form>
            ) : (
                <p>Loading reservation details...</p>
            )}
        </div>
    );
};

export default Update;
