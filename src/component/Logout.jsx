import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/home');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;