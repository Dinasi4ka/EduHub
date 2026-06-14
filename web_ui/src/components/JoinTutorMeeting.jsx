import {useApp} from "../AppContext.jsx";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const durations = [
    { label: "1 год", value: 1 },
    { label: "1,5 год", value: 1.5 },
    { label: "2 год", value: 2 },
    { label: "3 год", value: 3 }
];

function JoinTutorMeeting() {
    const initData = useApp();
    const navigate = useNavigate();
    const [comment, setComment] = useState("");
    const [hours, setHours] = useState(1);
    const [meet, setMeet] = useState( {datetime: null});
    async function joinTutorMeet() {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/join-tutor-meetings/", {
                    meet_id: meet.id,
                    hours: hours,
                    comment: comment,
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }}
            );
        } catch (error) {
            console.log(error);
        }
        navigate('/tutors');
    }

    if (!initData?.tutorMeets) return
    const data = initData.tutorMeets
    return (
        <div className="register_student">
            <div className="login_form">
                <div className="back_home" onClick={() => navigate('/tutors')}/>
                <div className="join_group_meet">
                    Підтвердження запису на заняття <br/> до {data.tutor.username}
                        <div className="when">
                            <div className="datetime_block tutor_block">
                                <div className="tutor_times">
                                    <div>Дата:</div>
                                    <div>Час:</div>
                                </div>
                                <div className="tutor_times selector">
                                {data.meetings.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div className={`datetime ${meet.datetime === item.datetime ? "checked" : ""}`} onClick={() => setMeet(item)}>{item.datetime.slice(0,10)}</div>
                                        <div className={`datetime ${meet.datetime === item.datetime ? "checked" : ""}`} onClick={() => setMeet(item)}>{item.datetime.slice(11,16)}</div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        </div>
                    <div className="datetime_block">
                        Тривалість заняття:
                        <ul>
                            {durations.map((item, index) => (
                                <li key={index}>
                                    <label className="checkbox_label">
                                        <input
                                            type="checkbox"
                                            checked={hours === item.value}
                                            onChange={() => setHours(item.value)}
                                        />
                                        <span className="checkmark"></span>
                                        <div className="checkbox_name">{item.label}</div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <label>Коментар:</label>
                    <input type="text" className="register_student_form_input" onChange={(e) => setComment(e.target.value)}/>
                    <button className="register_student_form_button button tutor_course_button" onClick={joinTutorMeet}>Підтвердити</button>
                </div>
            </div>
        </div>
    )
}

export default JoinTutorMeeting;