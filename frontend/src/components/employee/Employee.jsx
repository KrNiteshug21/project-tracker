import { useEffect, useState } from "react";
import SectionWrapper from "../../wrapper/SectionWrapper";
import AssignedProjectCard from "./AssignedProjectCard";
import EmployeeDetails from "./EmployeeDetails";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("user");

  useEffect(() => {
    setUserId(JSON.parse(token)._id);
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

    if (userId) fetchEmployee();
  }, [userId, token]);

  if (!token) return <p>Please login to view this page</p>;

  return (
    <SectionWrapper>
      <div className="text-secondary dark:text-gray-300">
        <h1 className="mb-6 font-bold text-4xl text-center text-primary dark:text-white">
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
            <h1 className="mt-8 mb-4 font-bold text-3xl text-primary dark:text-white">
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
