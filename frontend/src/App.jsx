import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Flat } from "./components/Flat";
import { FlatDetails } from "./components/FlatDetails";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import {PrivateRoute} from "./components/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="/flat" element={<PrivateRoute><Flat /></PrivateRoute>}></Route>
        <Route path="/flat/:id" element={<PrivateRoute><FlatDetails /></PrivateRoute>}></Route>
      </Routes>
    </div>
  );
}

export default App;
