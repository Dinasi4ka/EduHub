import {useApp, useAppDispatch} from "../../AppContext.jsx";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


function EditProfile() {
    const initData = useApp();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initData.login === false){
            navigate('/login');
        }
    }, [initData.login])

    const [firstName, setFirstName] = useState(initData.first_name || '');
    const [lastName, setLastName] = useState(initData.last_name || '');
    const [years, setYears] = useState(initData.years_old || 0);
    const [price, setPrice] = useState(initData.price || 0);
    const [about, setAbout] = useState(initData.about || '');
    const [googleDriveLink, setGoogleDriveLink] = useState(initData.google_drive_link || '');

    const handleUpdate = async (e) => {
        try {
            let data = {
                first_name: firstName,
                last_name: lastName,
            }
            if (years){
                data.years = years
            }
            if (about){
                data.about = about
            }
            if (price){
                data.price = price
            }
            if (googleDriveLink){
                data.google_drive_link = googleDriveLink
            }
            const response = await axios.put("http://127.0.0.1:8000/api/update-user/", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            });
            dispatch({ type: 'User',  data: response.data})
            navigate('/profile');
        } catch (error) {
            console.log(error);
        }
    };

    if (!initData?.id) return
    return(
        <div className="register_student">
            <div className="login_form edit_form">
                <div className="back_home" onClick={() => navigate('/profile')}/>
                <div className="register_student_form_block">
                    <label>Ім'я</label>
                    <input type="text" className="register_student_form_input" defaultValue={initData.first_name || ''} onChange={(e) => setFirstName(e.target.value)}/>
                    <label>Прізвище</label>
                    <input type="text" className="register_student_form_input" defaultValue={initData.last_name || ''} onChange={(e) => setLastName(e.target.value)}/>
                    {initData.user_type === "tutor" &&
                        <>
                            <label>Вік</label>
                            <input type="number" className="register_student_form_input" defaultValue={initData.years_old || 0} onChange={(e) => setYears(e.target.value)}/>
                            <label>Ціна заняття за годину:</label>
                            <input type="number" className="register_student_form_input" defaultValue={initData.price || 0} onChange={(e) => setPrice(e.target.value)}/>
                            <label>Інформація про себе</label>
                            <input type="text" className="register_student_form_input" defaultValue={initData.about || ''} onChange={(e) => setAbout(e.target.value)}/>
                            <label>Google Drive посилання</label>
                            <input type="text" className="register_student_form_input" defaultValue={initData.google_drive_link || ''} onChange={(e) => setGoogleDriveLink(e.target.value)}/>
                        </>
                    }
                </div>
                <div className="register_student_form_button" onClick={handleUpdate}>
                    <p>Зберегти</p>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;