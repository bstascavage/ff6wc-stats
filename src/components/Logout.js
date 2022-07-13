import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {
  const navigate = useNavigate();

  return (
    <a
      href="/"
      onClick={(e) =>
        handleClick(e, props.discordUserdata, props.setUserdataState, navigate)
      }
    >
      Logout
    </a>
  );
}

function handleClick(e, discordUserdata, setUserdataState, navigate) {
  e.preventDefault();

  localStorage.clear();
  setUserdataState({ type: "not_logged_in" });
  navigate("/");
}
export default Logout;
