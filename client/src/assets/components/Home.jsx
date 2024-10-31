import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [rentals, setRentals] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:8000/rentals/reservation/', {
            headers: {
                Authorization: `Token ${token}`
            }
        })
        .then(res => {
            console.log("Fetched Data:", res.data);

            
            const today = new Date().toISOString().split('T')[0];
            const rentalToday = res.data.filter(rental => {
                console.log(`Checking rental_date: ${rental.rental_date} against today's date: ${today}`);
                return rental.rental_date === today;
            });

            console.log("Today's rentals:", rentalToday);
            setRentals(rentalToday);
        })
        .catch(err => {
            console.log("Error fetching data:", err);
        });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Today's Schedule</h1>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Reservation Code</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Time</th>
                        <th>Number of Players</th>
                        <th>Caliber</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.length > 0 ? (
                        rentals.map((rental) => (
                            <tr key={rental.id}>
                                <td>
                                    <Link to={`/${rental.id}/details`}>
                                        {rental.id}
                                    </Link>
                                </td>
                                <td>{rental.first_name}</td>
                                <td>{rental.last_name}</td>
                                <td>{rental.rental_time}</td>
                                <td>{rental.number_of_players}</td>
                                <td>{rental.caliber}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No rentals scheduled for today.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Home;


