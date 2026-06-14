import Header from "./Header.jsx";
import ContentHome from "./ContentHome.jsx";
import Footer from "./Footer.jsx";
import {useApp, useAppDispatch} from "../AppContext.jsx";
import {useEffect} from "react";
import axios from "axios";

export default Home;

function Home() {
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

    return(
        <>
            <Header />
            <ContentHome />
            <Footer />
        </>
    )
}