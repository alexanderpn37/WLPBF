import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const Details = () => {
    const [rental, setRental] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const dischargeHandler = () => {
        axios.delete(`http://localhost:8000/rentals/reservation/${id}/`,
            {
                headers: {
                    Authorization: `Token ${token}`
                }
            })
            .then((res) => {
                navigate (`/home`);
            })
            .catch((err) => {
                console.log(err); 
            });
    };

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
            console.log(err);
        });
    }, [id]);
    

    return (
        <div className="container mt-5">
            <h1>Rental Details</h1>
            <h2>First Name {rental.first_name}</h2>
            <h2>Last Name: {rental.last_name}</h2>
            <h2>Phone Number: {rental.phone_number}</h2>
            <h2>Email: {rental.email}</h2>
            <h2>Date: {rental.rental_date}</h2>
            <h2>Time: {rental.rental_time}</h2>
            <h2>Number of Players: {rental.number_of_players}</h2>
            <h2>Caliber: {rental.caliber}</h2>

            <button className="btn btn-danger" onClick={dischargeHandler}>Delete Reservation</button>

            <button className="btn btn-primary ms-3" onClick={() => navigate (`/${id}/update`)}>
                Update
            </button>
            <button className="btn btn-secondary ms-3" onClick={() => navigate('/home')}>Home</button>

        </div>
    );
};

export default Details;