import "./Navbar.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const { handleToken } = useContext(AuthContext);

  let token = JSON.parse(localStorage.getItem("user_token"));

  let navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user_token");
    handleToken("");
    navigate("/");
  };

  return (
    <div id="navbar">
      <Link className="link" to={"/"}>
        Home
      </Link>
      <button id="logoutBtn" onClick={logout}>
          {" "}
          {token === null ? "Login" : "Logout"}
        </button>
    </div>
  );
};
