import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SectionWrapper from "../../wrapper/SectionWrapper";
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
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

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
          <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              projects.map((project) => (
                <Card
                  key={project._id}
                  className="hover:shadow-lg transition-shadow group"
                >
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {/* <div className="bg-primary/10 p-2 rounded-full text-primary">
                        <project.icon className="w-4 h-4" />
                      </div> */}
                      <Badge variant="secondary">Web Development</Badge>
                    </div>
                    <CardTitle>
                      <Link to={`/projects/${project._id}`}>
                        {project.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Open</Badge>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => acceptProject(project)}
                      className="group-hover:bg-primary/90 w-full"
                    >
                      Accept Project
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default Projects;
