import { useEffect, useState } from "react";
import SectionWrapper from "../../wrapper/SectionWrapper";
import AssignedProjectCard from "./AssignedProjectCard";
import EmployeeDetails from "./EmployeeDetails";

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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <EmployeeDetails employee={employee} />
          )}
        </div>
        {employee.assignedProjects && (
          <>
            <h1 className="mt-8 mb-4 font-bold text-3xl text-primary">
              Assigned Projects
            </h1>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {employee.assignedProjects.map((project) => (
                <AssignedProjectCard key={project._id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </SectionWrapper>
  );
};

export default Employee;
