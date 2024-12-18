import { useState } from "react";
import SuccessModal from "../../Modal/SuccessModal";
const initModalaObj = {
  header: "",
  msg: "",
  trigger: false,
};

const TaskComp = ({ task }) => {
  const [modalObj, setModalObj] = useState(initModalaObj);
  console.log("task", task);

  const updateEmployeeScore = async () => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ scores: task.score }),
      };
      const emp = JSON.parse(localStorage.getItem("user"));
      console.log("emp", emp._id);

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employee/${emp._id}/updateScores`,
        options
      );
      const data = await response.json();
      console.log("updateEmployeeScore", data);
      return data;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  };

  const updateTaskStatus = async () => {
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "Completed" }),
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/tasks/${task._id}`,
        options
      );
      const data = await response.json();
      console.log("updateTaskStatus", data);
      return data;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  };

  const handleTaskDone = async () => {
    const empScore = await updateEmployeeScore();
    const taskStatus = await updateTaskStatus();
    if (empScore.status === "success" && taskStatus.status === "success") {
      console.log("Task done successfully");
      setModalObj({
        header: "Success",
        msg: "Task done successfully",
        trigger: true,
      });
      window.location.reload();
    } else {
      console.log("Error in updating task status or employee score");
      setModalObj({
        header: "Error",
        msg: "Error in updating task status or employee score",
        trigger: true,
      });
    }
  };

  return (
    <>
      {modalObj.trigger && (
        <SuccessModal
          modalObj={modalObj}
          clickFunction={() => setModalObj(initModalaObj)}
        />
      )}
      <div
        className="space-y-2 border-2 border-primary/70 p-4 rounded-lg w-96"
        style={{ flex: "0 0 auto" }}
      >
        <h1 className="font-semibold text-xl">{task.title}</h1>
        <p className="text-base text-secondary">{task.description}</p>
        <p className="text-base text-secondary">Task Score: {task.score}</p>
        <p className="text-base text-secondary">Status: {task.status}</p>
        <button
          onClick={handleTaskDone}
          className="bg-primary px-2 py-1 rounded-md text-white"
        >
          Task done
        </button>
      </div>
    </>
  );
};

export default TaskComp;
