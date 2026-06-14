import Filters from "./Filters.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useApp, useAppDispatch} from "../AppContext.jsx";

function ContentGroupMeetings() {
    const initData = useApp();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({topic: [], grade: [], goal: [], difficulty: [], experience: [], additional: true});
    const [meetings, setMeetings] = useState([])
    useEffect(() => {
        async function fetchGroupMeetings() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/get-group-meetings/", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }}
                );
                setMeetings(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchGroupMeetings();
    }, []);
    useEffect(() => {
        if (initData.login === false){
            navigate('/login');
        }
    }, [initData.login])

    function joinGroup(user) {
        dispatch({ type: 'GroupMeet',  data: user})
        navigate('/join-group-meeting');
    }

    async function getUserData(user_id) {
        navigate(`/profile/${user_id}`);
    }

    return (
        <main className="choosing-theam">
            <div className="back_home" onClick={() => navigate('/')}/>
            <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>

            <section className="topics">
                {meetings.map((user, index) => {
                    return (
                    <div className="topic tutor_block" key={index} >
                        <div className="tutor_block_user" onClick={() => getUserData(user.user)}>
                            <div className="video_block_datails_user_photo tutor_block_user_photo" />
                            {user.tutor.username}
                        </div>
                        <div className="tutor_block_about">
                            Тема: {user.theme} <br/>
                            Тривалість: {user.hours} год
                            <p className="tutor_about">{user.about}</p>
                            <div className="tutor_block_about_planning">
                                <div>{user.datetime}</div>
                                <div>Кількість учасників: {user.busy_amount}/{user.max_students}</div>
                            </div>
                        </div>
                        <div className="split"/>
                        <div className="tutor_block_price">
                            {user.price} грн
                            <button className="register_student_form_button button" onClick={() => joinGroup(user)}>Приєднатись</button>
                        </div>
                    </div>
                    );
                })}
            </section>
        </main>
    );
}

export default ContentGroupMeetings;
