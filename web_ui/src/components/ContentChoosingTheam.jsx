import Filters from "./Filters.jsx";
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";

function ContentChoosingTheam() {
    const [selectedFilters, setSelectedFilters] = useState({topic: [], grade: [], goal: [], difficulty: [], experience: []});
    const navigate = useNavigate();
    const goToLinear = () => {
        navigate('/linear-equations');
    };
    const goToParametersTasks = () => {
        navigate('/parameters-tasks');
    };
    const goToCombinatorics = () => {
        navigate('/combinatorics');
    };

    return (
        <main className="choosing-theam">
            <div className="back_home" onClick={() => navigate('/')}/>
            <Filters selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>

            {/* Content Section */}
            <section className="topics">
                <div className="topic" onClick={goToLinear}>
                    <div className="topic_title">Лінійні рівняння</div>
                    <p>У дані темі будуть розглядатись такі аспекти, як рівняння та його розв’язок, лінійне рівняння з однією змінною, властивості рівняння, алгоритм розв’язування лінійних рівнянь, лінійні рівняння з двома змінними, графік лінійного рівняння, практичне застосування лінійних рівнянь, системи лінійних рівнянь, методи розв’язання систем, графічний метод розв’язання рівнянь</p>
                </div>
                <div className="topic" onClick={goToParametersTasks}>
                    <div className="topic_title">Параметри у задачах</div>
                    <p>Розгляд методів розв’язання задач із параметрами, включаючи теоретичні пояснення та приклади. Включає практичні вправи для відпрацювання навичок.</p>
                </div>
                <div className="topic" onClick={goToCombinatorics}>
                    <div className="topic_title">Основи комбінаторики</div>
                    <p>Розділ включає пояснення основних принципів комбінаторики: перестановки, розміщення та комбінації. Ви дізнаєтесь, як обчислювати кількість способів упорядкування та вибору об'єктів із множини, а також як ці знання застосовуються при вирішенні типових задач. Матеріал містить теоретичні пояснення, приклади розв’язання задач і практичні вправи для закріплення знань.</p>
                </div>
            </section>
        </main>
    );
}

export default ContentChoosingTheam;
