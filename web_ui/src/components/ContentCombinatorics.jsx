import Filters from "./Filters.jsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function ContentCombinatorics() {
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({topic: [], grade: [], goal: [], difficulty: [], experience: []});
    return (
        <main className="choosing-theam">
            <div className="back_home" onClick={() => navigate('/')}/>
            <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>

            {/* Content Section */}
            <section className="topics">
                <div className="topic topic_selected">
                    <div className="topic_title topic_title_selected">Основи комбінаторики</div>
                    <p>Розділ включає пояснення основних принципів комбінаторики: перестановки, розміщення та комбінації. Ви дізнаєтесь, як обчислювати кількість способів упорядкування та вибору об'єктів із множини, а також як ці знання застосовуються при вирішенні типових задач. Матеріал містить теоретичні пояснення, приклади розв’язання задач і практичні вправи для закріплення знань.</p>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/6_wWUI0HjDo" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Комбінаторика на НМТ-2025
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/HoW6PeTv3ZY" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Основне про ЙМОВІРНІСТЬ та КОМБІНАТОРНІ задачі
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/_e84XzG9v4U" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Вся комбінаторика на НМТ. Не втрачай 13 балів
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContentCombinatorics;
