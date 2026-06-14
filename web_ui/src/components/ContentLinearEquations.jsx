import Filters from "./Filters.jsx";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

function ContentLinearEquations() {
    const navigate = useNavigate();
    const [selectedFilters, setSelectedFilters] = useState({topic: [], grade: [], goal: [], difficulty: [], experience: []});
    return (
        <main className="choosing-theam">
            <div className="back_home" onClick={() => navigate('/')}/>
            <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>

            {/* Content Section */}
            <section className="topics">
                <div className="topic topic_selected">
                    <div className="topic_title topic_title_selected">Лінійні рівняння</div>
                    <p>У дані темі будуть розглядатись такі аспекти, як рівняння та його розв’язок, лінійне рівняння з однією змінною, властивості рівняння, алгоритм розв’язування лінійних рівнянь, лінійні рівняння з двома змінними, графік лінійного рівняння, практичне застосування лінійних рівнянь, системи лінійних рівнянь, методи розв’язання систем, графічний метод розв’язання рівнянь</p>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/hoM0AHKTc7k" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Лінійні рівняння з однією змінною
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/XyJXIpBnVxE" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Усе про лінійні рівняння
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                    <div className="video_block">
                        <div className="video_block_video"><iframe width="280" height="160" src="https://www.youtube.com/embed/xvl7MFs1Uuo" title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div>
                        <div className="video_block_datails">
                            Лінійні рівняння - це просто!
                            <div className="video_block_datails_user"><div className="video_block_datails_user_photo"></div><span className="review-name">Максим</span></div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContentLinearEquations;
