// src/components/SignOut.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
    logout();
    navigate('/');
  return <></>
};

export default SignOut;
