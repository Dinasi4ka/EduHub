import Filters from "./Filters.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useApp, useAppDispatch} from "../AppContext.jsx";

function ContentTutors() {
    const dispatch = useAppDispatch();
    const initData = useApp();
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({topic: [], grade: [], goal: [], difficulty: [], experience: [], additional: true});
    const [users, setUsers] = useState([])
    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/get-tutors/", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }}
                );
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, []);
    useEffect(() => {
        if (initData.login === false){
            navigate('/login');
        }
    }, [initData.login])

    async function getTutorMeetings(tutor_id) {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/get-tutor-meetings/", {
                    tutor_id: tutor_id,
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }
                }
            );
            if (response.status === 200) {
                dispatch({type: 'TutorMeets', data: response.data})
                navigate('/join-tutor-meeting');
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getUserData(user_id) {
        navigate(`/profile/${user_id}`);
    }

    return (
        <main className="choosing-theam">
            <div className="back_home" onClick={() => navigate('/')}/>
            <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>

            <section className="topics">
                {users.map((user, index) => {
                    return (
                    <div className="topic tutor_block" key={index}>
                        <div className="tutor_block_user" onClick={() => getUserData(user.id)}>
                            <div className="video_block_datails_user_photo tutor_block_user_photo" />
                            {user.username}
                            <div className="rating">⭐{user.rating}</div>
                        </div>
                        <div className="tutor_block_about">
                            Досвід: більше {user.experience} років
                            <p className="tutor_about">Досвідчений викладач математики з понад {user.experience}-річним стажем. Успішно готую учнів до ЗНО/НМТ, допомагаю підвищити успішність та поглибити знання з алгебри, геометрії та математичного аналізу. Знаходжу індивідуальний підхід до кожного учня.</p>
                        </div>
                        <div className="split"/>
                        <div className="tutor_block_price">
                            {user.price} грн/год
                            <button className="register_student_form_button button" onClick={() => getTutorMeetings(user.id)}>Записатись</button>
                        </div>
                    </div>
                    );
                })}
            </section>
        </main>
    );
}

export default ContentTutors;
