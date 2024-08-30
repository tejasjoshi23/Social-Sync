import React, { useContext } from "react";
import textlogo from "../img/textlogo.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
// import Home from "../img/home.png"
import {
  ProfileIcon,
  AddPostIcon,
  UserFollowIcon,
  LogOutIcon,
  HomeIcon
} from "../img/svg";

export default function Navbar({ login }) {
  const navigate = useNavigate();
  const { setModalOpen } = useContext(LoginContext);
  
  const loginStatus = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <Link to="/profile" className="nav-link">
            <li className="nav-item">
              <ProfileIcon />
            </li>
          </Link>
          <Link to="/createPost" className="nav-link">
            <li className="nav-item">
              <AddPostIcon />
            </li>
          </Link>
          <Link to="/followingpost" className="nav-link">
            <li className="nav-item">
              <UserFollowIcon />
            </li>
          </Link>
          <button
            className="logout-btn nav-link"
            onClick={() => setModalOpen(true)}
          >
            <LogOutIcon />
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup" className="nav-link">
            <li className="nav-item nav-signup">Sign Up</li>
          </Link>
          <Link to="/signin" className="nav-link">
            <li className="nav-item nav-signin">Sign In</li>
          </Link>
        </>
      );
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("jwt");
    if (login || token) {
      return (
        <>
          <Link to="/" className="nav-link">
            <li className="nav-item">
            <HomeIcon/>
            </li>
          </Link>
          <Link to="/profile" className="nav-link">
            <li className="nav-item">
            <ProfileIcon/>
            </li>
          </Link>
          <Link to="/createPost" className="nav-link">
            <li className="nav-item">
              <AddPostIcon />
            </li>
          </Link>
          <Link to="/followingpost" className="nav-link">
            <li className="nav-item">
              <UserFollowIcon />
            </li>
          </Link>
          <button
            className="logout-btn nav-link"
            onClick={() => setModalOpen(true)}
          >
            <LogOutIcon />
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/signup" className="nav-link">
            <li className="nav-item nav-signup">Sign Up</li>
          </Link>
          <Link to="/signin" className="nav-link">
            <li className="nav-item nav-signin">Sign In</li>
          </Link>
        </>
      );
    }
  };

  return (
    <div className="navbar">
      <img
          src={textlogo}
        alt="logo"
        className="nav-logo"
        onClick={() => navigate("/")}
      />
      <ul className="nav-menu">{loginStatus()}</ul>
      <ul className="nav-menu-mobile">{loginStatusMobile()}</ul>

    </div>
  );
}
