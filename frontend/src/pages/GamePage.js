import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./GamePage.css";

const GamePage = () => {
  const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [wordPair, setWordPair] = useState(null);
  const [currentUsername] = useState(localStorage.getItem("currentUsername"));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem(`highScore_${currentUsername}`);
    return savedHighScore ? parseInt(savedHighScore) : 0;
  });
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const fetchWords = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(`${REACT_APP_BACKEND_URL}/api/words`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      setWordPair(data);
    } catch (error) {
      console.error("Failed to fetch words:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchWords();
  }, []);

  const handleGuess = async (choice) => {
    if (!wordPair || isFetching) return;
    const correctChoice =
      wordPair.word1.searchCount >= wordPair.word2.searchCount
        ? "word1"
        : "word2";
    if (choice === correctChoice) {
      setScore((prevScore) => prevScore + 1);
      fetchWords();
    } else {
      if (score > highScore) {
        localStorage.setItem(`highScore_${currentUsername}`, score);
        setHighScore(score);

        const userId = localStorage.getItem(
          `user_${localStorage.getItem("currentUsername")}_userId`
        );

        try {
          const response = await fetch(`${REACT_APP_BACKEND_URL}/api/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify({ highScore: score }),
            headers: {
              "content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to update high score: ${response.status}`);
          }

          const data = await response.json();
        } catch (error) {
          console.error("Failed to fetch highScore:", error);
        }
      }
      setScore(0);
      navigate("/reset", { state: { score } });
    }
  };

  return (
    <div className="game-page">
      <div className="score-container">
        <span className="high-score">High Score: {highScore}</span>
        <span className="current-score">Score: {score}</span>
      </div>
      {wordPair && (
        <div className="words-container">
          <div
            className="word-card left"
            onClick={() => handleGuess("word1")}
            style={{ backgroundImage: `url(${wordPair.word1.imageUrl})` }}
          >
            <span className="word-text">{wordPair.word1.word}</span>
            <span className="word-count">
              {wordPair.word1.searchCount.toLocaleString()}{" "}
            </span>
            <br />
            <span className="word-count-text">average monthly searches</span>
          </div>
          <div
            className="word-card right"
            onClick={() => handleGuess("word2")}
            style={{ backgroundImage: `url(${wordPair.word2.imageUrl})` }}
          >
            <span className="word-text">{wordPair.word2.word}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
