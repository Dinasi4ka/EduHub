import {useApp, useAppDispatch} from "../AppContext.jsx";
import Student from "./profile/Student.jsx";
import Tutor from "./profile/Tutor.jsx";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


function Profile() {
    const dispatch = useAppDispatch();
    const initData = useApp();
    const navigate = useNavigate();


    useEffect(() => {
        if (initData.login === false){
            navigate('/login');
        }
    }, [initData.login])

    useEffect(() => {
        async function checkUser() {
            const response = await axios.get(
                "http://127.0.0.1:8000/api/user/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                    }}
            );
            if (response.status === 200){
                dispatch({ type: 'User',  data: response.data})
            }
        }
        checkUser();
    }, [])

    return(
        <>
            {initData.user_type === 'student' && <Student />}
            {initData.user_type === 'tutor' && <Tutor/>}
        </>
    )
}

export default Profile;