import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterStudent from "./components/RegisterStudent.jsx";
import Login from "./components/Login.jsx";
import RegisterTeacher from "./components/RegisterTeacher.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import ChoosingTheam from "./components/ChoosingTheam.jsx";
import LinearEquations from "./components/LinearEquations.jsx";
import Combinatorics from "./components/Combinatorics.jsx";
import ParametersTasks from "./components/ParametersTasks.jsx";
import Tutors from "./components/Tutors.jsx";
import Profile from "./components/Profile.jsx";
import ContentGroupMeetings from "./components/ContentGroupMeetings.jsx";
import ContentGroup from "./components/GroupMeetings.jsx";
import {useEffect} from "react";
import axios from "axios";
import {useApp, useAppDispatch} from "./AppContext.jsx";
import JoinGroupMeeting from "./components/JoinGroupMeeting.jsx";
import JoinTutorMeeting from "./components/JoinTutorMeeting.jsx";
import EditProfile from "./components/profile/EditProfile.jsx";
import CreateClass from "./components/profile/CreateClass.jsx";
import Tutor from "./components/profile/Tutor.jsx";

export default App

function App() {
    const initData = useApp();
    const dispatch = useAppDispatch();
    useEffect(() => {
        async function checkToken() {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/verify", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        }}
                );
                if (response.status === 200){
                    dispatch({ type: 'Login',  data: true})
                } else {
                    dispatch({ type: 'Login',  data: false})
                }
            } catch (error) {
                dispatch({ type: 'Login', data: false });
            }
        }
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
        checkToken();
        checkUser();
    }, []);

    return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/register/student" element={<RegisterStudent/>} />
                  <Route path="/register/teacher" element={<RegisterTeacher/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/choosing-theam" element={<ChoosingTheam />} />
                  <Route path="/linear-equations" element={<LinearEquations />} />
                  <Route path="/parameters-tasks" element={<ParametersTasks />} />
                  <Route path="/combinatorics" element={<Combinatorics />} />
                  <Route path="/tutors" element={<Tutors />} />
                  <Route path="/group-meetings" element={<ContentGroup />} />
                  <Route path="/join-group-meeting" element={<JoinGroupMeeting />} />
                  <Route path="/join-tutor-meeting" element={<JoinTutorMeeting />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:id" element={<Tutor />} />
                  <Route path="/profile/edit" element={<EditProfile />} />
                  <Route path="/create/class" element={<CreateClass />} />
              </Routes>
          </div>
      </Router>
    )
}

