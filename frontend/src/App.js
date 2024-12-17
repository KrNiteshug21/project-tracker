import { Routes, Route } from "react-router-dom";
import Homepage from "./componenets/Homepage";
import Employee from "./componenets/Employee";
import Project from "./componenets/Projects";
import Task from "./componenets/Task";
import Navbar from "./componenets/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </div>
  );
}

export default App;
