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
  else if ( score <= 10) videoSrc = video2;
  else if (score <= 15) videoSrc = video3;
  else if (score <= 20) videoSrc = video4;
  else videoSrc = video5;

  const MessageBasedOnScore = (score) => {
    if (score === 0) return "Zero? Seriously? Did you even try?";
    if (score <= 5) return "Ouch. I’ve seen potatoes make better guesses.";
    if (score <= 10)
      return "Not bad, but not impressive either. You're stuck in 'averageville.'";
    if (score <= 15) return "You're getting good at this... or just lucky.";
    if (score <= 20) return "Now we're talking! Almost genius-level.";
    return "🔥 LEGENDARY! You're on fire!";
  };

  return (
    <div className="reset-page">
      <img
        src={videoSrc}
        alt="Background animation"
        className="background-gif"
      />

      <div className="reset-content">
        <h1>Game Over!</h1>
        <h2>
          Your Score: <span style={{ color: "#FFD700" }}>{score}</span>
        </h2>
        <p>{MessageBasedOnScore(score)}</p>

        <div className="reset-buttons">
          <button onClick={() => navigate("/")}>Main Menu</button>
          <button onClick={() => navigate("/game")}>Retry</button>
        </div>
      </div>
    </div>
  );
};

export default ResetPage;
