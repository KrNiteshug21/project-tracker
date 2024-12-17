import { Routes, Route } from "react-router-dom";
import Homepage from "./componenets/home/Homepage";
import Employee from "./componenets/Employee";
import Project from "./componenets/projects/Projects";
import Task from "./componenets/Task";
import Navbar from "./componenets/Navbar";
import Login from "./componenets/Forms/Login";
import Signup from "./componenets/Forms/Signup";
import AuthMiddleware from "./middleware/AuthMiddleware";
import ProjectPage from "./componenets/projects/ProjectPage";

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
