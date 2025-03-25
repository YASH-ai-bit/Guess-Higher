import React, { useState } from "react";
import "../index.css";
import logo from "../assets/logo4.png";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || []; //created for checking whether users are entered into local
                                                                              //storage or not..
    // Check if username exists
    if (existingUsers.includes(username)) {
      console.log("Logging in as", username);
      localStorage.setItem("currentUsername", username);
      navigate("/game");
      return;
    }

    // If username doesn't exist, create a new user
    const user = { username };
    const response = await fetch(`${REACT_APP_BACKEND_URL}/api/users`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "content-Type": "application/json" },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      return;
    }

    console.log("User created", json);
    existingUsers.push(username);
    localStorage.setItem("allUsers", JSON.stringify(existingUsers));

    localStorage.setItem("currentUsername", username);
    localStorage.setItem(`user_${username}_userId`, json._id);

    if (!localStorage.getItem(`highScore_${username}`)) {
      localStorage.setItem(`highScore_${username}`, 0);
    }

    setUsername("");
    navigate("/game");
  };

  return (
    <div className="home">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="" />
          <span className="logo-text">
            An annoyingly addictive game based on Google Searches ! !
          </span>
          <span className="logo-text2">What's Googled More?</span>
        </div>
      </div>
      <form className="createUser" onSubmit={handleUserLogin}>
        <label>Enter UserName :</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <button type="submit">Start Game</button>
        {error && <div className="error">{error}</div>}
      </form>
      <div className="Api_text">Powered by Serp API and Google API</div>
    </div>
  );
};

export default HomePage;
