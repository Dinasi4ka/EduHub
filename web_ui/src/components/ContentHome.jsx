import {useNavigate} from "react-router-dom";
import {useState} from "react";
import ContentGroupMeetings from "./ContentGroupMeetings.jsx";

export default ContentHome;

const reviews = [
    {
        id: 1,
        name: "Дмитро",
        text: "Дуже радий, що обрав саме цю платформу.",
        time: "9 місяців тому",
        stars: 5,
    },
    {
        id: 2,
        name: "Максим",
        text: "Дуже радий, що обрав саме цю платформу.",
        time: "9 місяців тому",
        stars: 5,
    },
    {
        id: 3,
        name: "Ольга",
        text: "Дуже рада, що обрала саме цю платформу.",
        time: "9 місяців тому",
        stars: 5,
    },
];

function ContentHome() {
    const [activeReview, setActiveReview] = useState(1);
    const navigate = useNavigate();
    const goToChoosingTheam = () => {
        navigate('/choosing-theam');
    };
    const goToTutors = () => {
        navigate('/tutors');
    };
    const goToGroupMeetings = () => {
        navigate('/group-meetings');
    };

    return (
        <main className="content_home">
            <section className="hero">
                <h1>Підготовка до математики для будь- <br/> якого рівня!</h1>
                <p>
                    <div>Інтерактивні уроки, завдання та тести для <br/>  вивчення основних тем. <br/>
                    Покращуй свої навички вже сьогодні!</div>
                </p>
                <div className="group"/>
                <div className="stack_books"/>
                <div className="vector"/>
            </section>

            <section className="features">
                <div className="feature">
                    <div className="self_study"></div>
                    <div className="feature_button" onClick={goToChoosingTheam}>
                        <p>Самостійне вивчення</p>
                    </div>
                </div>
                <div className="feature">
                    <div className="tutoring_session"></div>
                    <div className="feature_button" onClick={goToTutors}>
                        <p>Заняття з репетитором</p>
                    </div>
                </div>
                <div className="feature">
                    <div className="group_lessons"></div>
                    <div className="feature_button" onClick={goToGroupMeetings}>
                        <p>Групові заняття</p>
                    </div>
                </div>
            </section>

            <div className="reviews-widget">
                <div className="reviews">
                    {reviews.map((review, index) => (
                        <div key={review.id} className={`review ${index === activeReview ? "active" : ""}`} onClick={() => setActiveReview(index)}>
                            <div className="review-header"><div className="review-photo"></div><span className="review-name">{review.name}</span></div>
                            <p className="review-text">{review.text}</p>
                            <div className="review-footer">
                                <span className="review-time">{review.time}</span>
                                <span className="review-stars">{"⭐".repeat(review.stars)}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="indicators">
                    {reviews.map((_, index) => (
                        <span
                            key={index}
                            className={`indicator ${index === activeReview ? "active" : ""}`}
                            onClick={() => setActiveReview(index)}
                        ></span>
                    ))}
                </div>
            </div>

        </main>
    );
}
