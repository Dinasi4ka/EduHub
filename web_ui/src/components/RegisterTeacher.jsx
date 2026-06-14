import axios from "axios";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default RegisterStudent;

function RegisterStudent() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState(0);

    const handleRegister = async (e) => {
        e.preventDefault();
        const [firstName, lastName] = username.split(" ");
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                username: firstName,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                user_type: "tutor",
                experience: Number(experience),
            });
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            alert("Invalid username or password.");
        }
    };

    return (
        <div className="register_student">
            <div className="login_form">
                <div className="back_home" onClick={() => navigate('/')}/>
                <p className="register_student_form_title teacher_register_margin">Реєстрація репетитора</p>
                <div className="register_student_form_block teacher_register">
                    <label>Ім’я та прізвище</label>
                    <input type="text" className="register_student_form_input" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="register_student_form_block teacher_register">
                    <label>Електронна пошта</label>
                    <input type="text" className="register_student_form_input" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="register_student_form_block teacher_register">
                    <label>Пароль</label>
                    <input type="password" className="register_student_form_input" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="register_student_form_block teacher_register">
                    <label>Стаж репетиторства</label>
                    <input type="text" className="register_student_form_input" onChange={(e) => setExperience(e.target.value)}/>
                </div>
                <div className="register_student_form_button teacher_register_button" onClick={handleRegister}>
                    <p>Зареєструватись</p>
                </div>
            </div>
        </div>
    );
}