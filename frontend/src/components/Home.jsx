import "./Home.css"
import { useNavigate } from "react-router-dom";

export const Home = () =>{
    const navigate = useNavigate();
    const login = ()=>{
    navigate("/login")
    }

    return (<div id="homeMain">
        <div id="homeDiv_1">
        <h1 id="homeHead">Welcome to MakeMyHouse</h1>
        <p>A House for Everyone</p>
        <button onClick={login}>Lets Go..</button>
        </div>
        
    </div>)
}

