import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../../../Pages/AdminDashboard";
import ManageQuestions from "../../../Pages/ManageQuestions";
import Categories from "../../../Pages/Categories";
import AdminLayout from "../components/AdminLayout";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="questions" element={<ManageQuestions />} />
        <Route path="add-question" element={<div style={{padding: '20px'}}>Add Question Page</div>} />
      </Route>
    </Routes>
  );
}
