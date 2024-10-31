// Rentals.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Rentals = () => {
    const [allRentals, setAllRentals] = useState([]);
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        axios.get("http://localhost:8000/rentals/reservation/", {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        .then(res => setAllRentals(res.data))
        .catch(err => console.log("Error fetching all rentals:", err));
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Rentals History</h1>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Reservation code</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th> 
                        <th>Date</th>
                        <th>Time</th>
                        <th>Number of Players</th>
                        <th>Caliber</th>
                    </tr>
                </thead>
                <tbody>
                    {allRentals.map(rental => (
                        <tr key={rental._id}>
                            <td>
                                <Link to={`/${rental.id}/details`}>
                                    {rental.id}
                                </Link>
                            </td>
                            <td>{rental.first_name}</td>
                            <td>{rental.last_name}</td>
                            <td>{rental.phone_number}</td>
                            <td>{rental.email}</td>
                            <td>{new Date(rental.rental_date).toLocaleDateString()}</td>
                            <td>{rental.rental_time}</td>
                            <td>{rental.number_of_players}</td>
                            <td>{rental.caliber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <Link to="/rentals/newrental">
                    <button className="btn btn-primary">Create Reservation</button>
                </Link>
            </div>
        </div>
    );
};

export default Rentals;

