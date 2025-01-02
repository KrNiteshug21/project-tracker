import { Link } from "react-router-dom";
import SectionWrapper from "../../wrapper/SectionWrapper";

const HeroSection = () => {
  const token = localStorage.getItem("token");
  return (
    <SectionWrapper className="flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-8 max-w-screen-sm h-full">
        <h1 className="font-bold text-4xl text-center text-primary dark:text-white">
          Streamline Your Projects and Track Progress Effortlessly!
        </h1>
        <p className="text-center text-lg text-secondary dark:text-gray-300">
          An all-in-one solution to manage project assignments, monitor task
          progress, and calculate scores seamlessly.
        </p>
        <div>
          <Link
            to="/employee"
            className="bg-primary dark:bg-white mt-8 px-4 py-2 rounded-lg font-semibold text-white dark:text-primary"
          >
            Get Started
          </Link>
          {!token && (
            <Link
              to="/login"
              className="bg-secondary dark:bg-gray-300 mt-8 ml-4 px-4 py-2 rounded-lg font-semibold text-white dark:text-primary"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default HeroSection;
