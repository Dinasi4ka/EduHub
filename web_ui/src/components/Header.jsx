import {useNavigate} from "react-router-dom";
import {useApp, useAppDispatch} from "../AppContext.jsx";

function Header() {
    const initData = useApp();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const goToLogin = () => {
        navigate('/login');
    };
    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch({ type: 'Login',  data: false})
        dispatch({ type: 'User',  data: {}})
        navigate('/login');
    };
    const Profile = () => {
        navigate('/profile');
    };
    return (
        <header className="header">
            <div className="header__container">
                <div className="header_search_block">
                    <input type="text" className="header__search" placeholder="Пошук тем"/>
                    <button className="register_student_form_button">Пошук</button>
                </div>
                <div className="header_manage">
                    {!initData.login && <button className="header__login" onClick={goToLogin}>Увійти</button>}
                    {initData.login &&
                        <div className="header_menu">
                            <div className="header_menu_droplist">
                                <div onClick={Profile}>Профіль</div>
                                <div onClick={Logout}>Вийти</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
