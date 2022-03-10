import "./Home.css"
import { useNavigate } from "react-router-dom";

export const Home = () =>{
    const navigate = useNavigate();
    const handleClick = ()=>{
    navigate("/red")
    }

    return (<div id="homeMain">
        <div id="homeDiv_1">
        <h1 id="homeHead">Welcome to MakeMyHouse</h1>
        <p>A House for Everyone</p>
        <button onClick={handleClick}>Lets Go..</button>
        </div>
        
    </div>)
}

