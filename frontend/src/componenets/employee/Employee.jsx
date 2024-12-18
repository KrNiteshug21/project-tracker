import { useEffect, useState } from "react";
import SectionWrapper from "../../wrapper/SectionWrapper";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId] = useState(JSON.parse(localStorage.getItem("user"))._id);

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/employee/${userId}`
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      const data = await response.json();

      setEmployee(data);
      setLoading(false);
    };

    fetchEmployee();
  }, [userId]);
  return (
    <SectionWrapper>
      <div className="text-secondary">
        <h1 className="mb-6 font-bold text-4xl text-center text-primary">
          Employee
        </h1>
        <div className="space-y-2 text-xl">
          <p className="">Employee details and score</p>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>Your Name: {employee.name}</p>
              <p>{employee.email}</p>
              <p>Your Score: {employee.score}</p>
              <p>Your role: {employee.role}</p>
            </>
          )}
        </div>
        {employee.assignedProjects && (
          <>
            <h1 className="my-6 font-bold text-3xl text-primary">Projects</h1>
            <div className="flex flex-wrap justify-center items-stretch gap-4">
              {employee.assignedProjects.map((project) => (
                <div
                  key={project._id}
                  className="space-x-4 border-2 border-primary shadow-lg p-2 rounded-md w-96"
                >
                  <p className="text-center text-primary text-xl">
                    {project.title}
                  </p>
                  <p className="text-lg">{project.description}</p>
                  <p className="text-lg">Start Date: {project.startDate}</p>
                  <p className="text-lg">End Date: {project.endDate}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Employee;
