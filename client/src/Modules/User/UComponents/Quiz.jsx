import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";

export default function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resultSaved, setResultSaved] = useState(false);

  useEffect(() => {
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setError("");
    setResultSaved(false);
    fetchQuestions();
  }, [category]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`http://localhost:7000/api/quiz/${category}`);
      setQuestions(res.data);
    } catch (err) {
      setError("Failed to load questions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[index];

  const progress = useMemo(() => {
    if (!questions.length) return 0;
    return Math.round(((index + 1) / questions.length) * 100);
  }, [index, questions.length]);

  const handleSelect = (option) => {
    if (selected !== null) return;
    setSelected(option);
  };

  const handleNext = () => {
    if (selected === null) return;

    if (selected === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setSelected(null);
    setIndex((prev) => prev + 1);
  };

  const handleRestart = async () => {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setResultSaved(false);
    setError("");
    await fetchQuestions();
  };

  const saveResult = async () => {
    if (resultSaved || questions.length === 0) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    if (!user?._id) return;

    try {
      await axios.post("http://localhost:7000/api/result/add", {
        userId: user._id,
        score,
        total: questions.length,
      });
      setResultSaved(true);
    } catch (err) {
      console.warn("Could not save result", err);
    }
  };

  useEffect(() => {
    if (!loading && !error && index >= questions.length && questions.length) {
      saveResult();
    }
  }, [index, questions.length, loading, error]);

  const percent = questions.length
    ? Math.round((score / questions.length) * 100)
    : 0;
  const statusMessage =
    percent === 100
      ? "Perfect score! You nailed it."
      : percent >= 80
        ? "Excellent work! You're on a roll."
        : percent >= 50
          ? "Nice effort! Keep practicing to improve."
          : "Good start! Review the material and try again.";

  if (loading) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "120px" }}>Loading...</h1>
    );
  }

  if (error) {
    return <h1 style={{ textAlign: "center", marginTop: "120px" }}>{error}</h1>;
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-page">
        <div className="quiz-card quiz-result">
          <h1 className="quiz-result__title">No Questions Available</h1>
          <p className="quiz-result__message">
            There are no questions in the {category.toUpperCase()} category
            right now.
          </p>
          <button className="quiz-next" onClick={() => navigate("/categories")}>
            Return to Categories
          </button>
        </div>
      </div>
    );
  }

  if (index >= questions.length) {
    return (
      <div className="quiz-page">
        <div className="quiz-card quiz-result">
          <h1 className="quiz-result__title">Quiz Complete</h1>
          <p className="quiz-result__score">
            {score}/{questions.length}
          </p>
          <p className="quiz-result__message">{statusMessage}</p>
          <div className="quiz-result-details">
            <span>{percent}% correct</span>
            <span>{questions.length} questions answered</span>
          </div>
          <div className="quiz-result-actions">
            <button className="quiz-next" onClick={handleRestart}>
              Retry Quiz
            </button>
            <button
              className="quiz-next quiz-next--secondary"
              onClick={() => navigate("/categories")}
            >
              Back to Categories
            </button>
          </div>
        </div>
      </div>
    );
  }

  const selectedCorrect = selected === currentQuestion.correctAnswer;

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-card__header">
          <p className="quiz-card__subtitle">{category.toUpperCase()} Quiz</p>
          <h1 className="quiz-card__title">
            Test your {category.toUpperCase()} knowledge
          </h1>
          <div className="quiz-card__meta">
            <span>
              Question {index + 1} of {questions.length}
            </span>
            <span>Score {score}</span>
          </div>
        </div>

        <h2 className="quiz-question">{currentQuestion.question}</h2>

        <div className="quiz-options">
          {currentQuestion.options.map((option, i) => {
            const isSelected = selected === option;
            const isCorrectAnswer =
              selected !== null && option === currentQuestion.correctAnswer;
            const isIncorrectAnswer =
              selected !== null &&
              option === selected &&
              selected !== currentQuestion.correctAnswer;

            return (
              <button
                key={i}
                type="button"
                className={`quiz-option ${isSelected ? "quiz-option--selected" : ""} ${isCorrectAnswer ? "quiz-option--correct" : ""} ${isIncorrectAnswer ? "quiz-option--incorrect" : ""}`}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
              >
                <span className="quiz-option__letter">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="quiz-option__text">{option}</span>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div
            className={`quiz-feedback ${selectedCorrect ? "quiz-feedback--correct" : "quiz-feedback--incorrect"}`}
          >
            {selectedCorrect ? (
              <span>✅ Correct! Well done.</span>
            ) : (
              <span>
                ❌ Oops! The correct answer is{" "}
                <strong>{currentQuestion.correctAnswer}</strong>.
              </span>
            )}
          </div>
        )}

        <div className="quiz-footer">
          <div className="quiz-progress">
            <div
              className="quiz-progress__bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            type="button"
            className="quiz-next"
            disabled={selected === null}
            onClick={handleNext}
          >
            {index + 1 === questions.length ? "Finish" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}
