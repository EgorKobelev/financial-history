import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../../hoc/error-boundary";
import Base from "../base/base";
import MainPage from "../../pages/main-page/main-page";
import RegisterPage from "../../pages/register-page/register-page";
import LoginPage from "../../pages/login-page/login-page";
import Profile from "../../pages/profile-page/profile";
import { useDispatch } from "react-redux";
import ProtectedRoute from "../protected-route/protected-route";
import { loginWithToken } from "../../services/actions/user";
import StatisticPage from "../../pages/statistic-page/statistic-page";
import NotFoundPage from "../../pages/not-found-page/not-found-page";
import RecoverPasswordPage from "../../pages/recover-password-page/recover-password-page";

const App = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(loginWithToken());
    }, []);
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<ProtectedRoute anonymous={false} element={<Base />} />}>
                    <Route index element={<MainPage />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="/statistics" element={<StatisticPage />} />
                </Route>
                <Route path="/register" element={<ProtectedRoute anonymous={true} element={<RegisterPage />} />} />
                <Route path="/login" element={<ProtectedRoute anonymous={true} element={<LoginPage />} />} />
                <Route path="/recover" element={<ProtectedRoute anonymous={true} element={<RecoverPasswordPage />} />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;
