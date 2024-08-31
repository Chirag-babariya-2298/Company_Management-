import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Redux/Slice/LoginSlice';
import "../CSS/Header.css"
import { isTokenExpired } from "../Utils/AuthUtils";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (isTokenExpired()) {
        dispatch(logoutUser());
        navigate('/login');
      }
    };

    checkTokenExpiration();
    const interval = setInterval(checkTokenExpiration, 60000); 

    return () => clearInterval(interval); 
  }, [dispatch, navigate]);

  useEffect(() => {
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (expirationTime) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const remainingTime = expirationTime - currentTime;

        if (remainingTime <= 0) {
          clearInterval(interval);
          dispatch(logoutUser());
        } else {
          setTimeLeft(remainingTime);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [dispatch]);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="header bg-Clr py-3">
      {timeLeft !== null && (
        <p>Logout reminder : {formatTime(timeLeft)}</p>
      )}
    </div>
  );
};

export default Header;
