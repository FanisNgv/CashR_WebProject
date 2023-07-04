import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRouteUser = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" />;
    }
    else if(role!=='User'){
        return <Navigate to="/login" />;
    }
    else {
        return <Outlet />;
    }
};

export default PrivateRouteUser;