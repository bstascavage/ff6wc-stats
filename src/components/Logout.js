import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setUserData }) {
  const navigate = useNavigate();

  return (
    <a href="/" onClick={(e) => handleClick(e, setUserData, navigate)}>
      Logout
    </a>
  );
}

function handleClick(e, setUserData, navigate) {
  e.preventDefault();

  localStorage.removeItem("discord_access_token");
  localStorage.removeItem("discord_token_type");
  setUserData({ user_auth: "false", user_data: "" });
  navigate("/");
}
export default Logout;
