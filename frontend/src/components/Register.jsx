import "./Register.css"
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"; 



export const Register =() =>{
    const [form, setForm] = useState([]);
    const navigate = useNavigate();

    const handleChange = ({ target: { name, value } }) => {
        setForm({
          ...form,
          [name]: value,
        });
      };
    
      const register = () => {
        fetch(`http://localhost:4500/manager`, {
          method: "POST",
          body: JSON.stringify(form),
          headers: { "content-type": "application/json" },
        })
          .then((d) => d.json())
          .then((res) => {
            console.log(res);
            if(res.message){
                alert("User Already Registered !!");
            }else{
                  alert("User Registered Successfully !!")
            navigate("/login");
            }
          
          });
      };
    

    return (
        <div id="regDiv">
        <h1>Register</h1>
        <input
        type="text"
        onChange={handleChange}
        name="first_name"
        placeholder="First Name"
      />
       <input
        type="text"
        onChange={handleChange}
        name="last_name"
        placeholder="Last Name"
      />
       <input
        type="text"
        onChange={handleChange}
        name="gender"
        placeholder="Gender"
      />
       <input
        type="number"
        onChange={handleChange}
        name="age"
        placeholder="Age"
      />
      <input
        type="text"
        onChange={handleChange}
        name="email"
        placeholder="Email"
      />
      <input
        type="password"
        onChange={handleChange}
        name="password"
        placeholder="Password"
      />
      <button id="regBtn" onClick={register}>Register</button>
     <p id="logLine"> Already Registered ? <Link id="logLink" to={"/login"}>Log in</Link></p>
    </div>
    );
}