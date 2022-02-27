import "./Login.css"

import { useContext, useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


export const Login = () => {
  const [form, setForm] = useState([]);
  const { handleToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    fetch(`https://apartment-flat-manager.herokuapp.com/manager/${form.email}`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "content-type": "application/json" },
    })
      .then((d) => d.json())
      .then((res) => {
        console.log(res);
        
        if (res.token) {
          if (localStorage.getItem("user_token") === null) {
            localStorage.setItem("user_token", JSON.stringify(res.token));
          } else {
            localStorage.setItem("user_token", JSON.stringify(res.token));
          }
          alert("Login successful !!"); 
          navigate("/flat");
        } else {
          alert(res.message);
        }
      });
  };


  useEffect(() => {
    userToken();
  }, [login]);

  const userToken = () => {
    let user_token = JSON.parse(localStorage.getItem("user_token"));
    if (user_token) {
      handleToken(user_token);  
      navigate("/flat");
      console.log("User:", user_token);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

 
  return (
    <div id="loginDiv">
        <h1>Log In</h1>
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
      <button id="loginBtn" onClick={login}>Log In</button>
     <p id="regLine"> Don't have a account ? <Link id="regLink" to={"/register"}>Register</Link></p>
    </div>
  );
};
