import {useApp} from "../../AppContext.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";


function Student() {
    const initData = useApp();
    const navigate = useNavigate();
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    const watchedPercent = getRandomInt(45, 90);
    const testsPassed = getRandomInt(30, 75);
    const consultations = getRandomInt(1, 4);
    const homeworkDone = getRandomInt(35, 65);
    const goToEdit = () => {
        navigate('/profile/edit');
    };

    if (!initData?.id) return
    return(
        <div className="register_student">
            <div className="profile">
                <div className="back_home" onClick={() => navigate('/')}/>
                <div className="profile_about">
                    <div className="profile_about_top">
                        <div className="video_block_datails_user_photo tutor_block_user_photo join_group_meet_photo photo" />
                        <div className="profile_about_top_text">
                            <div>{initData.first_name ? `${initData.first_name} ${initData.last_name}` : initData.username}</div>
                            {initData?.years_old && <div>Вік: {initData.years_old} років(-и)</div>}
                            <div>{initData.email}</div>
                            <div>Рівень знань/клас: підготовка <br/> до ЗНО</div>
                        </div>
                    </div>
                    <div className="profile_about_bottom">
                        <strong>Нагадування</strong>
                        <div className="notifications">
                            {initData.meetings.map((item, index) => (
                                <div className="notifications_item" key={index}>
                                    <div className="bell_svg"/>
                                    <div className="notifications_item_text">
                                        <strong>Урок</strong>
                                        {item.datetime}
                                    </div>
                                </div>
                            ))}
                            {initData.group_meetings.map((item, index) => (
                                <div className="notifications_item" key={index}>
                                    <div className="bell_svg"/>
                                    <div className="notifications_item_text">
                                        <strong>Урок</strong>
                                        {item.datetime}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="register_student_form_button button" onClick={goToEdit}>Змінити профіль</button>
                </div>
                <div className="profile_others">
                    <div className="profile_others_banner">
                        <strong>Ефективне навчання!</strong>
                        <div>Навчайся легко і ефективно разом  з нами. Обирай теми, переглядай <br/> відео та слідкуй за прогресом та зростанням твоїх знань.</div>
                    </div>
                    <div className="profile_others_planned">
                        <div className="title">
                            Заплановані уроки
                            <div/>
                        </div>
                        <div className="table_title">
                            <div>Дата та час</div>
                            <div>Тип заняття</div>
                            <div>Години</div>
                            <div className="theme">Тема</div>
                            <div>Викладач</div>
                        </div>
                        <div className="table">
                            {initData.meetings.map((item, index) => (
                                <div className="row" key={index}>
                                    <div><strong>{item.datetime}</strong></div>
                                    <div>Індувідуальне</div>
                                    <div>{item.hours}</div>
                                    <div className="theme">-</div>
                                    <div>{item.first_name ? `${item.first_name} ${item.last_name}` : item.username}</div>
                                </div>
                            ))}
                            {initData.group_meetings.map((item, index) => (
                                <div className="row" key={index}>
                                    <div><strong>{item.datetime}</strong></div>
                                    <div>Групове</div>
                                    <div>{item.hours}</div>
                                    <div className="theme">{item.theme}</div>
                                    <div>{item.first_name ? `${item.first_name} ${item.last_name}` : item.username}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="profile_others_planned">
                        <div className="title">
                            Активність та прогрес
                            <div/>
                        </div>
                        <div className="statistics">
                            <div className="wave-graph"/>
                            <div className="radial-diagram"/>
                            <div className="text">Переглянуто <strong>{watchedPercent}%</strong> відео, <br/> складено тести на <strong>{testsPassed}%</strong>, <br/> відвідав <strong>{consultations}</strong> консультації та <br/> виконано <strong>{homeworkDone}%</strong> домашніх <br/> завдань</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student;