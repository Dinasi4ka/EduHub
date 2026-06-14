import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import ContentParametersTasks from "./ContentParametersTasks.jsx";

//Треба в App.jsx додати
export default ParametersTasks;

function ParametersTasks() {

    return(
        <>
            <Header />
            <ContentParametersTasks />
            <Footer />
        </>
    )
}