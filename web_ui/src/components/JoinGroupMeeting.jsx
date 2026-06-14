import {useApp} from "../AppContext.jsx";
import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function JoinGroupMeeting() {
    const initData = useApp();
    const navigate = useNavigate();
    async function joinGroup(data) {
        try {
            await axios.post(
                "http://127.0.0.1:8000/api/join-group-meetings/", {
                    meet_id: data.id,
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
        } catch (error) {
            console.log(error);
        }
        navigate('/group-meetings');
    }

    if (!initData?.joinGroup) return
    const data = initData.joinGroup
    return (
        <div className="register_student">
            <div className="login_form">
                <div className="back_home" onClick={() => navigate('/group-meetings')}/>
                <div className="join_group_meet">
                    <div className="video_block_datails_user_photo tutor_block_user_photo join_group_meet_photo" />
                    Підтвердження запису у групу
                    <div className="theme">
                        <strong>Тема:</strong>
                        <div className="theme_name">{data.theme}</div>
                    </div>
                    <div className="tutor"><strong>Викладач:</strong> {data.tutor.username}</div>
                    <div className="when">
                        <div className="datetime_block">
                            Дата:
                            <div className="datetime">{data.datetime.slice(0,10)}</div>
                        </div>
                        <div className="datetime_block">
                            Час:
                            <div className="datetime">{data.datetime.slice(11,16)}</div>
                        </div>
                    </div>
                    <div className="datetime_block">
                        Тривалість заняття:
                        <div className="datetime">{data.hours} год</div>
                    </div>
                    <button className="register_student_form_button button" onClick={() => joinGroup(data)}>Підтвердити</button>
                </div>
            </div>
        </div>
    )
}

export default JoinGroupMeeting;