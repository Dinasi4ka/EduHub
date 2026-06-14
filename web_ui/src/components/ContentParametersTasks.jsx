import Filters from "./Filters.jsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function ContentParametersTasks() {
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({topic: [], grade: [], goal: [], difficulty: [], experience: []});
    return (
        <main className="choosing-theam">
            <div className="back_home" onClick={() => navigate('/')}/>
            <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>

            {/* Content Section */}
            <section className="topics">
                <div className="topic topic_selected">
                    <div className="topic_title topic_title_selected">Параметри у задачах</div>
                    <p>Розгляд методів розв’язання задач із параметрами, включаючи теоретичні пояснення та приклади. Включає практичні вправи для відпрацювання навичок.</p>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/vxWTeVE4mjI" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Лінійні рівняння з параметрами
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/6VUFGg_ypMg" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Параметри НМТ
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/iGt2FBl_7Fo" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Рівняння з параметрами на НМТ | Вчимося розв'язувати завдання
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContentParametersTasks;
