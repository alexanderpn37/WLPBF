import React from "react";
import { useParams,Link } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";

const Home = () => {
    const [rentals,setRentals] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/rentals')
            .then(res => {
                setRentals(res.data);
                console.log(res.data);
    
                const today = new Date();
                const rentalToday = res.data.filter(rental => {
                    const rentalDate = new Date(rental.date);
                    return rentalDate.getDate() === today.getDate() &&
                        rentalDate.getMonth() === today.getMonth() &&
                        rentalDate.getFullYear() === today.getFullYear();
                });
    
                setRentals(rentalToday);
            })
            .catch(err => {
                console.log(err);
                console.log("Error fetching data");
            });
    }, []);
    
    
    return(
    <div className="container mt-5">
        <h1 className="text-center">Today's Schedule</h1>
        
        <table className="table mt-4">
            <thead>
                <tr>
                    <th>Reservation code</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Time</th>
                    <th>Number of Players</th>
                    <th>Caliber</th>
                </tr>
            </thead>
            <tbody>
                {rentals.map((rental) => (
                    <tr key={rental._id}>
                        <td>
                        <Link to={`/${rental._id}/details`}>
                        {rental.id}
                        </Link> 
                        </td>
                        <td>{rental.firstName}</td>
                        <td>{rental.lastName}</td>
                        <td>{rental.time}</td>
                        <td>{rental.numberOfPlayers}</td>
                        <td>{rental.caliber}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
    )
}
export default Home
