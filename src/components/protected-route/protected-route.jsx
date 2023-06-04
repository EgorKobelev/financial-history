import React, { FC, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const getUserFromStore = (state) => state.userReducer.user;

const ProtectedRoute = ({ element, anonymous }) => {
    const userAuth = useSelector(getUserFromStore);
    const location = useLocation();
    const from = location.state?.from || "/";
    if (anonymous && userAuth) {
        return <Navigate to={from} />;
    }

    if (!anonymous && !userAuth) {
        return <Navigate to="/register" state={{ from: location }} />;
    }

    return element;
};

export default ProtectedRoute;
