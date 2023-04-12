import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "../../hoc/error-boundary";
import Base from "../base/base";
import MainPage from "../../pages/main/main-page";
import RegisterPage from "../../pages/register/register-page";
import LoginPage from "../../pages/login-page/login-page";
import Profile from "../../pages/profile/profile";
import {useDispatch} from "react-redux";
import {AuthService} from "../../utils/auth-service";
import ProtectedRoute from "../protected-route/protected-route";

const App = () => {
    const dispatch = useDispatch()
    const g =  async () => {
        // const b = await AuthService.tokenLogin()
        // console.log(b)
    }
    React.useEffect(() => {g()}, [])
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<ProtectedRoute anonymous={false} element={<Base />}/>}>
                    <Route index element={<MainPage />} />
                    <Route path="profile" element={<Profile />} />
                </Route>
                <Route path="/register"  element={<ProtectedRoute anonymous={true} element={<RegisterPage />}/>} />
                <Route path="/login" element={<ProtectedRoute anonymous={true} element={<LoginPage />}/>} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;
