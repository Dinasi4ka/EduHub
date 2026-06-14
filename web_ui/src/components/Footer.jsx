import {useNavigate} from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate('/');
    };
    return (
        <footer className="footer">
            <div className="footer_title_block">
                <div className="footer_title pointer" onClick={goToHome}>EduHub</div>
                <div className="footer__social-icons">
                    <div className="insta_svg"></div>
                    <div className="facebook_svg"></div>
                    <div className="telegram_svg"></div>
                </div>
            </div>
            <div className="footer__column">
                <h3>Послуги</h3>
                <ul>
                    <div className="footer_line"></div>
                    <li>Заняття з репепитором</li>
                    <li>Індивідуальні заняття</li>
                    <li>Групові заняття</li>
                </ul>
            </div>
            <div className="footer__column">
                <h3>Про EduHub</h3>
                <ul>
                    <div className="footer_line"></div>
                    <li>Про нас</li>
                    <li>Блог</li>
                </ul>
            </div>
            <div className="footer__column">
                <h3>Контакти</h3>
                <ul>
                    <div className="footer_line"></div>
                    <li><div className="location_svg"></div>м. Палаюча Москва, Вул. Мертвого москаля 24</li>
                    <li><div className="email_svg"></div>eduhub@gmail.com</li>
                    <li><div className="phone_svg"></div>+380 96 666 66 66</li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;
