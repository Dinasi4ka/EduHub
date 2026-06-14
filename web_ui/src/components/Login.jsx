import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import axios from "axios";
import {useAppDispatch} from "../AppContext.jsx";

export default Login;

function Login() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/register');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
                username: username,
                password: password,
            });
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            dispatch({ type: 'Login',  data: true})
            navigate('/');
        } catch (err) {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="register_student">
            <div className="login_form">
                <div className="back_home" onClick={() => navigate('/')}/>
                <div className="login_form_svg"></div>
                <p className="register_student_form_title">Вхід в кабінет</p>
                <div className="register_student_form_block">
                    <label>Електронна пошта</label>
                    <input type="text" className="register_student_form_input" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="register_student_form_block">
                    <label>Пароль</label>
                    <input type="password" className="register_student_form_input" onChange={(e) => setPassword(e.target.value)}/>
                    <label className="forgot_password">Забули пароль?</label>
                    <label className="register" onClick={goToLogin}>Зареєструватися</label>
                </div>
                <div className="register_student_form_button" onClick={handleLogin}>
                    <p>Увійти</p>
                </div>
            </div>
        </div>
    );
}