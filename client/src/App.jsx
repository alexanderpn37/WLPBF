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
import Details from './assets/components/Details';
import Update from './assets/components/Update';

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
            <Route path="/home" element={<Home />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/rentals/newrental" element={<Newrental />} />
            <Route path="/:id/details" element={<Details />} />
            <Route path="/:id/update" element={<Update />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </>
      ) : (
        <>
          <Dashboard />
          <Routes>
            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;


