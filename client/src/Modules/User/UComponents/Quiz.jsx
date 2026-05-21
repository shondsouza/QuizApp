import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Quiz.css";

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/quiz/${category}`);
        setQuestions(response.data);
      } catch (err) {
        setError("Error fetching questions.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [category]);

  const handleNext = () => {
    if (selected === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected("");
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-lg)", padding: "var(--space-2xl)" }}>
            <div className="spinner"></div>
            <h2 style={{ textAlign: "center", color: "var(--text-primary)", margin: 0 }}>Loading questions...</h2>
          </div>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-card quiz-result">
          <h2 className="quiz-result__title" style={{ color: "var(--error)" }}>Error</h2>
          <p className="quiz-result__message">{error || "No questions found for this category."}</p>
          <button className="quiz-next" onClick={() => navigate('/categories')}>Back to Categories</button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let message = "";
    let messageColor = "var(--text-secondary)";

    if (percentage >= 80) {
      message = "Excellent work! You're a quiz master! 🎉";
      messageColor = "var(--success)";
    } else if (percentage >= 60) {
      message = "Good job! Keep practicing! 👍";
      messageColor = "var(--primary)";
    } else if (percentage >= 40) {
      message = "Not bad! Room for improvement. 💪";
      messageColor = "var(--warning)";
    } else {
      message = "Keep studying and try again! 📚";
      messageColor = "var(--error)";
    }

    return (
      <div className="quiz-page">
        <div className="quiz-card quiz-result">
          <h2 className="quiz-result__title">Quiz Completed!</h2>
          <p className="quiz-result__score">{score}<span>/{questions.length}</span></p>
          <p className="quiz-result__message" style={{ color: messageColor, fontWeight: 600 }}>{message}</p>
          <p className="quiz-result__message">You completed the {category.toUpperCase()} quiz.</p>
          <button className="quiz-next" onClick={() => navigate('/categories')}>Back to Categories</button>
        </div>
      </div>
    );
  }

  const question = questions[currentIndex];

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-card__header">
          <p className="quiz-card__subtitle">{category.toUpperCase()} Quiz</p>
          <h1 className="quiz-card__title">Question {currentIndex + 1}</h1>
          <div className="quiz-card__meta">
            <span>Total: <strong>{questions.length}</strong></span>
            <span>Score: <strong>{score}</strong></span>
          </div>
        </div>
        
        <div className="quiz-progress">
          <div 
            className="quiz-progress__bar" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <h2 className="quiz-question">
          {question.question}
        </h2>

        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${selected === option ? "quiz-option--selected" : ""}`}
              onClick={() => setSelected(option)}
            >
              <span className="quiz-option__letter">{String.fromCharCode(65 + index)}</span>
              <span className="quiz-option__text">{option}</span>
            </button>
          ))}
        </div>

        <div className="quiz-footer">
          <button 
            className="quiz-next" 
            onClick={handleNext}
            disabled={!selected}
          >
            {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question →"}
          </button>
        </div>
      </div>
    </div>
  );
}
