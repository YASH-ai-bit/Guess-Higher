import React, { useState, useEffect, useRef } from 'react';
import '../index.css';

const GamePage = () => {
    const [wordPair, setWordPair] = useState(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => localStorage.getItem('highScore') || 0);
    const [isFetching, setIsFetching] = useState(false);

    const fetchWords = async () => {
        setIsFetching(true);
        try {
            const response = await fetch('/api/words/random-pair');
            const data = await response.json();
            setWordPair(data);
        } catch (error) {
            console.error('Failed to fetch words:', error);
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchWords();
    }, []);

    const handleGuess = (choice) => {
        if (!wordPair || isFetching) return;
        const correctChoice = wordPair.word1.count >= wordPair.word2.count ? 'word1' : 'word2';
        if (choice === correctChoice) {
            setScore((prevScore) => prevScore + 1);
            fetchWords();
        } else {
            if (score > highScore) {
                localStorage.setItem('highScore', score);
                setHighScore(score);
            }
            setScore(0);
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
                        onClick={() => handleGuess('word1')} 
                        style={{ backgroundImage: `url(${wordPair.word1.image})` }}
                    >
                        <span className="word-text">{wordPair.word1.word}</span>
                        <span className="word-count">{wordPair.word1.count.toLocaleString()} average monthly searches</span>
                    </div>
                    <div className="vs-circle">VS</div>
                    <div 
                        className="word-card right" 
                        onClick={() => handleGuess('word2')} 
                        style={{ backgroundImage: `url(${wordPair.word2.image})` }}
                    >
                        <span className="word-text">{wordPair.word2.word}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GamePage;
