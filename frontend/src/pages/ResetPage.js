import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ResetPage.css";
import video1 from "../assets/videos/1-5.gif";
import video2 from "../assets/videos/5-10.gif";
import video3 from "../assets/videos/10-15.gif";
import video4 from "../assets/videos/15-20.gif";
import video5 from "../assets/videos/20.gif";

const ResetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;

  // Select background video based on score
  let videoSrc = "";
  if (score <= 5) videoSrc = video1;
  else if (5 < score <= 10) videoSrc = video2;
  else if (10 < score <= 15) videoSrc = video3;
  else if (15 < score <= 20) videoSrc = video4;
  else videoSrc = video5;

  return (
    <div className="reset-page">
      <img
        src={videoSrc}
        alt="Background animation"
        className="background-gif"
      />

      <div className="reset-content">
        <h1>Game Over!</h1>
        <h2>Your Score: {score}</h2>
        <div className="reset-buttons">
          <button onClick={() => navigate("/")}>Main Menu</button>
          <button onClick={() => navigate("/game")}>Retry</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
