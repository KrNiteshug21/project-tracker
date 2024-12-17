import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SectionWrapper from "../../wrapper/SectionWrapper";
import SuccessModal from "../../Modal/SuccessModal";

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
        console.log("data", data.project);
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
      <SectionWrapper className="justify-center grid">
        <div>
          <h1 className="mb-8 font-bold text-4xl text-center">Project Page</h1>
          {loading && <p>Loading..</p>}
          <p className="font-semibold text-2xl">{project.title}</p>
          <p className="text-lg text-secondary">{project.description}</p>
          <p>Start date: {project.startDate}</p>
          <p>End date: {project.endDate}</p>

          {project?.tasks?.length > 0 ? (
            <div>
              <h2 className="font-semibold text-2xl">Tasks</h2>
              <ul>
                {project.tasks.map((task) => (
                  <li key={task._id}>{task.title}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No tasks found</p>
          )}

          <button className="bg-primary mt-4 px-4 py-2 rounded-md text-white">
            Add Task
          </button>
        </div>
      </SectionWrapper>
    </>
  );
};

export default ProjectPage;
