import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormpage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<RegisterPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route
            path="/tasks"
            element={<TaskPage />}
          />
          <Route
            path="/tasks/:id"
            element={<TaskFormPage />}
          />
          <Route
            path="/add-task"
            element={<TaskFormPage />}
          />
          <Route
            path="/profile"
            element={<ProfilePage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
