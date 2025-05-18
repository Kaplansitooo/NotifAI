
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '@/components/auth/Login';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [navigate]);
  
  return <Login />;
};

export default Index;
