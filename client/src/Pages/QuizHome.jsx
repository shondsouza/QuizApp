import { Link } from "react-router-dom";

const categories = ["html", "css", "javascript", "react"];

export default function QuizHome() {
  return (
    <div>
      <h1>Choose a quiz category</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/quiz/${category}`}>{category.toUpperCase()}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
