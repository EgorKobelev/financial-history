import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../../hoc/error-boundary";
import Base from "../base/base";
import MainPage from "../../pages/main/main-page";
import RegisterPage from "../../pages/register/register-page";
import LoginPage from "../../pages/login-page/login-page";
import Profile from "../../pages/profile/profile";

const App: FC = () => {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<Base />}>
                    <Route index element={<MainPage />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;
