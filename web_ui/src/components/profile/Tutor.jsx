import {useApp, useAppDispatch} from "../../AppContext.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import RandomItems from "./RandomPublic.jsx";


function Tutor() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const initData = useApp();
    const navigate = useNavigate();
    const [individual, setIndividual] = useState(true);
    const [group, setGroup] = useState(true);

    useEffect(() => {
        async function checkAnotherUser() {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/user/?user_id=${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }}
            );
            if (response.status === 200){
                dispatch({ type: 'AnotherUser',  data: response.data})
            }
        }
        checkAnotherUser();
    }, [])

    if (!initData.id) return
    if (id && !initData.anotherUser)  return

    const data = id && initData.anotherUser ? initData.anotherUser : initData

    const goToEdit = () => {
        navigate('/profile/edit');
    };

    const goToCreateClass = () => {
        navigate('/create/class');
    };

    const goToGoogleDrive = () => {
        if (data.google_drive_link){
            window.open(data.google_drive_link, '_blank');
        }
    };

    return(
        <div className="register_student">
            <div className="register_column">
                <div className="profile">
                    <div className="back_home" onClick={() => navigate('/')}/>
                    <div className="profile_about">
                        <div className="profile_about_top">
                            <div className="video_block_datails_user_photo tutor_block_user_photo join_group_meet_photo photo" />
                            <div className="profile_about_top_text">
                                <div>{data.first_name ? `${data.first_name} ${data.last_name}` : data.username}</div>
                                {data?.years_old && <div>Вік: {data.years_old} років</div>}
                                <div>{data.email}</div>
                                <div>Досвід: {data.experience} років(-и)</div>
                                {data?.price > 0 && <div>Ціна заняття за годину: {data.price}грн</div>}
                            </div>
                        </div>
                        {!(id && initData.anotherUser) && <div className="profile_about_bottom">
                            <strong>Нагадування</strong>
                            <div className="notifications">
                                {data.meetings.map((item, index) => (
                                    <div className="notifications_item" key={index}>
                                        <div className="bell_svg"/>
                                        <div className="notifications_item_text">
                                            <strong>Урок</strong>
                                            {item.datetime}
                                        </div>
                                    </div>
                                ))}
                                {data.group_meetings.map((item, index) => (
                                    <div className="notifications_item" key={index}>
                                        <div className="bell_svg"/>
                                        <div className="notifications_item_text">
                                            <strong>Урок</strong>
                                            {item.datetime}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>}
                        {!(id && initData.anotherUser) && <button className="register_student_form_button button" onClick={goToEdit}>Змінити
                            профіль</button>}
                    </div>
                    <div className="profile_others">
                        <div className="profile_others_planned tutor">
                            <div className="title tutor">
                                Заплановані уроки
                                <div/>
                                <div className="filter">
                                    <span className="filter_selected">
                                        <div onClick={()=> setGroup(!group)} className={group ? "" : "selected"}>Індивідуальні заняття</div>
                                        <div className="line"/>
                                        <div onClick={()=> setIndividual(!individual)} className={individual ? "" : "selected"}>Групові заняття</div>
                                    </span>
                                </div>
                            </div>
                            <div className="table tutor">
                                {((!group && !individual) || individual) && data.meetings.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div><strong>{item.datetime}</strong></div>
                                        <div>Індувідуальне</div>
                                        <div className="theme">-</div>
                                    </div>
                                ))}
                                {((!group && !individual) || group) && data.group_meetings.map((item, index) => (
                                    <div className="row" key={index}>
                                        <div><strong>{item.datetime}</strong></div>
                                        <div>Групове</div>
                                        <div className="theme">{item.theme}</div>
                                    </div>
                                ))}
                            </div>
                            {!(id && initData.anotherUser) && <button className="register_student_form_button button" onClick={goToCreateClass}>Створити
                                урок</button>}
                        </div>
                        <div className="publications">
                            <div className="publications_title_block">
                                Публікації
                                <div className="sort">
                                    <span className="sort_selected" onClick={goToGoogleDrive}>
                                        <div >Відеоуроки</div>
                                        <div className="line"/>
                                        <div >Конспекти</div>
                                        <div className="line"/>
                                        <div >Збірники</div>
                                        <div className="line"/>
                                        <div >Тести</div>
                                    </span>
                                </div>
                                <div className="line"/>
                            </div>
                            <div className="publications_list">
                                <RandomItems data={initData}/>
                                {!(id && initData.anotherUser) && <div className="attach-file" onClick={goToGoogleDrive}>
                                    <div className="folder"/>
                                    Прикріпити файл
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_statistic">
                    <div className="about">
                        <strong>Про репетитора</strong>
                        {data?.about && <div className="about_text">{data.about} </div>}
                        <div>Тривалість заняття: від 1 год</div>
                        {data?.years_old && <div>Вік: {data.years_old} років</div>}
                        <div>Досвід: більше {data.experience} років</div>
                    </div>
                    <div className="comments">
                        <strong>Відгуки</strong>
                        <div className="tutor_data">
                            <div>{data.first_name ? `${data.first_name} ${data.last_name}` : data.username}</div>
                            <div>⭐ {data.comments.avg_score}/5</div>
                            <div> 2 відгуків</div>
                        </div>
                        <div className="comments_list">
                            {data.comments.comments.map((item, index) => (
                                <div className="item" key={index}>
                                    <div className="user">
                                        <div>{item.who}</div>
                                        <div className="stars">{"⭐".repeat(item.score)}</div>
                                        <div>{item.date}</div>
                                    </div>
                                    <div className="comment">{item.comment}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tutor;