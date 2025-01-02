import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../wrapper/SectionWrapper";
import SuccessModal from "../../Modal/SuccessModal";
import AddTask from "../../Modal/AddTask";
import TaskComp from "./TaskComp";
import { Badge } from "../ui/badge";
import { CalendarDays } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Button } from "../ui/button";

const initModalObj = {
  header: "",
  msg: "",
  trigger: false,
};

const ProjectPage = () => {
  const { id } = useParams();
  const [modalObj, setModalObj] = useState(initModalObj);
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(true);
  const [openTaskForm, setOpenTaskForm] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/projects/${id}`,
          options
        );

        const data = await response.json();
        console.log("projectData", data.project);
        setProject(data.project);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <p>Project not found</p>;

  return (
    <>
      {modalObj.trigger && (
        <SuccessModal
          modalObj={modalObj}
          clickFunction={() => setModalObj(initModalObj)}
        />
      )}
      {openTaskForm && <AddTask id={id} setOpenTaskForm={setOpenTaskForm} />}
      <SectionWrapper className="">
        <div>
          <h1 className="mb-8 font-bold text-4xl text-center">Project Page</h1>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="font-bold text-3xl tracking-tight">
                      {project.title}
                    </h1>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <div>
                    <Badge variant="default" className="text-sm">
                      In progress
                    </Badge>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {project.createdAt.slice(0, 10)} -{" "}
                      {project.updatedAt.slice(0, 10)}
                    </span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                  <Progress value={progress} className="w-32" />
                  <span>{Math.round(progress)}% Complete</span>
                </div> */}
                  {JSON.parse(localStorage.getItem("user")).role ===
                    "admin" && (
                    <Button
                      onClick={() => setOpenTaskForm(true)}
                      className="bg-primary mt-4 px-4 py-2 rounded-md text-white"
                    >
                      Add Task
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {project?.tasks?.length > 0 ? (
            <>
              <h2 className="my-6 font-semibold text-2xl">Tasks</h2>
              <ScrollArea className="border rounded-lg w-full whitespace-nowrap">
                <div className="flex gap-4 p-4 w-max">
                  {project.tasks.map((task) => (
                    <TaskComp key={task._id} task={task} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </>
          ) : (
            <p>No tasks found</p>
          )}
        </div>
      </SectionWrapper>
    </>
  );
};

export default ProjectPage;
