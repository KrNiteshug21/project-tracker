import { Routes, Route } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import Employee from "./components/employee/Employee";
import Project from "./components/projects/Projects";
import Task from "./components/Task";
import Navbar from "./components/Navbar";
import Login from "./components/Forms/Login";
import Signup from "./components/Forms/Signup";
import AuthMiddleware from "./middleware/AuthMiddleware";
import ProjectPage from "./components/projects/ProjectPage";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/employee"
          element={
            <AuthMiddleware>
              <Employee />
            </AuthMiddleware>
          }
        />
        <Route
          path="/projects"
          element={
            <AuthMiddleware>
              <Project />
            </AuthMiddleware>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <AuthMiddleware>
              <ProjectPage />
            </AuthMiddleware>
          }
        />
        <Route
          path="/task"
          element={
            <AuthMiddleware>
              <Task />
            </AuthMiddleware>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
