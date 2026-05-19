import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
          <h2 style={{ textAlign: "center" }}>Loading questions...</h2>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <h2 style={{ textAlign: "center" }}>{error || "No questions found for this category."}</h2>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="quiz-next" onClick={() => navigate('/categories')}>Back</button>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-page">
        <div className="quiz-card quiz-result">
          <h2 className="quiz-result__title">Quiz Completed!</h2>
          <p className="quiz-result__score">Your Score: <span>{score}</span> / {questions.length}</p>
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
          <h1 className="quiz-card__title">{category.toUpperCase()} Quiz</h1>
          <p className="quiz-card__subtitle">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        
        <div className="quiz-progress" style={{ marginBottom: "30px" }}>
          <div 
            className="quiz-progress__bar" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <h2 className="quiz-question">
          {currentIndex + 1}. {question.question}
        </h2>

        <div className="quiz-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${selected === option ? "quiz-option--selected" : ""}`}
              onClick={() => setSelected(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="quiz-footer">
          <button 
            className="quiz-next" 
            onClick={handleNext}
            disabled={!selected}
          >
            {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
}