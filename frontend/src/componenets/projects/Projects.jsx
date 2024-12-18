import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionWrapper from "../../wrapper/SectionWrapper";
import SuccessModal from "../../Modal/SuccessModal";

const initModalObj = {
  header: "",
  msg: "",
  trigger: false,
};

const Projects = () => {
  const [modalObj, setModalObj] = useState(initModalObj);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/projects`,
          options
        );

        const data = await response.json();
        console.log("data", data);
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  const acceptProject = async (project) => {
    try {
      const token = localStorage.getItem("token");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      };
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("userId", user._id);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employee/${user._id}/assign`,
        options
      );

      const data = await response.json();
      console.log("data", data);
      if (data.status === "success") {
        setModalObj({
          header: "Success",
          msg: data.message,
          trigger: true,
        });
      } else {
        setModalObj({
          header: "Error",
          msg: data.message,
          trigger: true,
        });
      }
    } catch (error) {
      console.error(error);
      setModalObj({
        header: "Error",
        msg: error.message,
        trigger: true,
      });
    }
  };

  return (
    <>
      {modalObj.trigger && (
        <SuccessModal
          modalObj={modalObj}
          clickFunction={() => setModalObj(initModalObj)}
        />
      )}
      <SectionWrapper>
        <div>
          <h2 className="font-bold text-4xl text-center">Projects</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              projects.map((project) => (
                <div
                  className="border-2 hover:border-white hover:bg-primary p-4 border-black/80 rounded-md w-80 hover:text-white cursor-pointer group"
                  key={project._id}
                >
                  <Link
                    className="text-start text-xl hover:underline"
                    to={`/projects/${project._id}`}
                  >
                    <h3>{project.title}</h3>
                  </Link>
                  <p className="group-hover:text-white/80 text-lg text-secondary">
                    {project.description}
                  </p>
                  <button
                    onClick={() => acceptProject(project)}
                    className="group-hover:bg-white group-hover:text-black bg-primary mt-2 px-4 py-2 rounded-md text-white"
                  >
                    Accept Project
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Projects;
