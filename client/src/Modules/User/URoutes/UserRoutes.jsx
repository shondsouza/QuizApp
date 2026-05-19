import { Routes, Route } from "react-router-dom";

import Quiz from "../UComponents/Quiz";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path=":category" element={<Quiz />} />
    </Routes>
  );
}
