import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import UserRoutes from "./Modules/User/URoutes/UserRoutes";
import AdminRoutes from "./Modules/Admin/ARoutes/AdminRoutes";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserCategories from "./Pages/UserCategories";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/categories" 
          element={
            <ProtectedRoute>
              <UserCategories />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/quiz/*" 
          element={
            <ProtectedRoute>
              <UserRoutes />
            </ProtectedRoute>
          } 
        />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
