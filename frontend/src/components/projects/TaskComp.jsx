import { useState } from "react";
import SuccessModal from "../../Modal/SuccessModal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

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
      <Card className="w-[350px] text-wrap">
        <CardHeader>
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1">
              <CardTitle className="text-justify">
                {task.title.length > 15
                  ? task.title.slice(0, 15) + "..."
                  : task.title}
              </CardTitle>
              <CardDescription>Score: {task.score}</CardDescription>
            </div>
            <Badge
              variant={task.status === "Completed" ? "default" : "secondary"}
            >
              {task.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-justify text-muted-foreground text-sm text-wrap">
            {task.description.length > 120
              ? task.description.slice(0, 120) + "..."
              : task.description}
          </p>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleTaskDone}
            variant={task.status === "Completed" ? "secondary" : "default"}
            className="w-full"
            disabled={task.status === "Completed"}
          >
            <CheckCircle2 className="mr-2 w-4 h-4" />
            {task.status === "Completed" ? "Completed" : "Mark as Complete"}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default TaskComp;
