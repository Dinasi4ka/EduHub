import {useNavigate} from "react-router-dom";

export default Register;

function Register() {
    const navigate = useNavigate();

    const goToRegisterStudent = () => {
        navigate('/register/student');
    };

    const goToRegisterTeacher = () => {
        navigate('/register/teacher');
    };

    return (
        <div className="register_student">
            <div className="login_form choose_user_type">
                <div className="login_form_svg"></div>
                <label>Виберіть тип облікового запису</label>
                <div className="choose_image_block">
                    <div className="choose_image_block_student" onClick={goToRegisterStudent}>
                        <div className="register_student_svg"></div>
                        <label>Учень</label>
                    </div>
                    <div className="choose_image_block_teacher" onClick={goToRegisterTeacher}>
                        <div className="register_teacher_svg"></div>
                        <label>Репетитор</label>
                    </div>
                </div>
            </div>
        </div>
    )
}