import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Quiz() {
  const { category } = useParams();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setQuestions([]);
    setIndex(0);
    setScore(0);
    setSelected(null);
    fetchQuestions();
  }, [category]);

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(`http://localhost:7000/api/quiz/${category}`);
      setQuestions(res.data);
    } catch (err) {
      setError("Failed to load questions.");
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
      <h1 style={{ textAlign: "center", marginTop: "120px" }}>
        No questions found for {category}
      </h1>
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
          <p>You completed the {category.toUpperCase()} quiz.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <div className="quiz-card__header">
          <p className="quiz-card__subtitle">{category.toUpperCase()} Quiz</p>
          <h1 className="quiz-card__title">Test your HTML skills</h1>
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
            return (
              <button
                key={i}
                type="button"
                className={`quiz-option ${isSelected ? "quiz-option--selected" : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            );
          })}
        </div>

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
