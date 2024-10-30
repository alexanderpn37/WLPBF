// Rentals.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Rentals = () => {
    const [allRentals, setAllRentals] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/rentals")
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
                                <Link to={`/${rental._id}/details`}>
                                    {rental.id}
                                </Link>
                            </td>
                            <td>{rental.firstName}</td>
                            <td>{rental.lastName}</td>
                            <td>{rental.phoneNumber}</td>
                            <td>{rental.email}</td>
                            <td>{new Date(rental.date).toLocaleDateString()}</td>
                            <td>{rental.time}</td>
                            <td>{rental.numberOfPlayers}</td>
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

