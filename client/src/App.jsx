import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './assets/components/Login';
import Signup from './assets/components/Signup';
import Dashboard from './assets/components/Dashboard';
import Home from './assets/components/Home';
import Rentals from './assets/components/Rentals';
import Newrental from './assets/components/Newrental';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); 
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Dashboard />

          <Routes>
          


          </Routes>
        </>
      ) : (

        <>
        <Dashboard />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="rentals/newrental" element={<Newrental />} />
        </Routes>
        </>
      )}
    </>
  );
}

export default App;

