import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ContentGroupMeetings from "./ContentGroupMeetings.jsx";

//Треба в App.jsx додати
export default ContentGroup;

function ContentGroup() {

    return(
        <>
            <Header />
            <ContentGroupMeetings />
            <Footer />
        </>
    )
}