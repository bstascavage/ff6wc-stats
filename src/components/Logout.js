import React from "react";
import { useNavigate } from "react-router-dom";

function Logout({ discordUserdata, setDiscordUserdata }) {
  const navigate = useNavigate();

  return (
    <a
      href="/"
      onClick={(e) =>
        handleClick(e, discordUserdata, setDiscordUserdata, navigate)
      }
    >
      Logout
    </a>
  );
}

function handleClick(e, discordUserdata, setDiscordUserdata, navigate) {
  e.preventDefault();

  localStorage.clear();
  setDiscordUserdata({ ...discordUserdata, user_data: "" });
  navigate("/");
}
export default Logout;
