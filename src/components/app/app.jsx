import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../../hoc/error-boundary";
import Base from "../base/base";
import MainPage from "../../pages/main/main-page";
import RegisterPage from "../../pages/register/register-page";
import LoginPage from "../../pages/login-page/login-page";
import Profile from "../../pages/profile/profile";
import { useDispatch } from "react-redux";
import ProtectedRoute from "../protected-route/protected-route";
import { loginWithToken } from "../../services/actions/user";
import StatisticPage from "../../pages/statistic-page/statistic-page";

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
                </Route>
                <Route path="/register" element={<ProtectedRoute anonymous={true} element={<RegisterPage />} />} />
                <Route path="/login" element={<ProtectedRoute anonymous={true} element={<LoginPage />} />} />

                {/* <Route path="/" element={<Base />}>
                    <Route index element={<MainPage />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/statistics" element={<StatisticPage />} /> */}
            </Routes>
        </ErrorBoundary>
    );
};

export default App;
