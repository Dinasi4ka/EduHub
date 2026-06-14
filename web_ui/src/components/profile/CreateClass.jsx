import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useApp} from "../../AppContext.jsx";

function CreateClass() {
    const initData = useApp();
    const navigate = useNavigate();
    const [type, setType] = useState("individual");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [theme, setTheme] = useState("");
    const [about, setAbout] = useState("");
    const [hours, setHours] = useState(0);
    const [price, setPrice] = useState(0);
    const [max, setMax] = useState(0);

    const goToProfile = () => {
        navigate('/profile');
    };

    async function createMeet() {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/create-meet/", {
                    type: type,
                    date: date,
                    time: time.replace(".",":"),
                    theme: theme,
                    about: about,
                    hours: hours,
                    price: price,
                    max: max
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response?.data?.status === "this time already busy"){
                alert("this time already busy");
            } else {
                goToProfile();
            }
        } catch (error) {
            console.log(error);
        }
    }
    if (!initData?.id) return
    return (
        <div className="register_student">
            <div className="login_form class_creation">
                <strong>Створення уроку</strong>
                <div className="class_type">
                    Тип:
                    <label className="checkbox_label">
                        <input
                            type="checkbox"
                            checked={type === "individual"}
                            onChange={() => setType("individual")}
                        />
                        <span className="checkmark"></span>
                        <div className="checkbox_name">Індивідуальне</div>
                    </label>
                    <label className="checkbox_label">
                        <input
                            type="checkbox"
                            checked={type === "group"}
                            onChange={() => setType("group")}
                        />
                        <span className="checkmark"></span>
                        <div className="checkbox_name">Групове</div>
                    </label>
                </div>
                <div className="form">
                    <label>Дата:</label>
                    <input type="text" className="register_student_form_input" placeholder="приклад: 2025-07-12" onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className="form">
                    <label>Час:</label>
                    <input type="text" className="register_student_form_input" placeholder="приклад: 13:00" onChange={(e) => setTime(e.target.value)}/>
                </div>
                <></>
                {type === "group" && <>
                    <div className="form">
                        <label>Тема:</label>
                        <input type="text" className="register_student_form_input" placeholder="" onChange={(e) => setTheme(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Опис:</label>
                        <input type="text" className="register_student_form_input" placeholder="" onChange={(e) => setAbout(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Кількість годин:</label>
                        <input type="number" className="register_student_form_input" placeholder="" onChange={(e) => setHours(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Ціна з людини:</label>
                        <input type="number" className="register_student_form_input" placeholder="" onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="form">
                        <label>Максимальна кількість людей:</label>
                        <input type="number" className="register_student_form_input" placeholder="" onChange={(e) => setMax(e.target.value)}/>
                    </div>
                </>}
                <div className="buttons">
                    <button className="register_student_form_button button" onClick={createMeet}>Створити</button>
                    <button className="register_student_form_button button cancel" onClick={goToProfile}>Скасувати</button>
                </div>
            </div>
        </div>
    )
}

export default CreateClass;
