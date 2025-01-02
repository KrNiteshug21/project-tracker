import React from "react";
import SectionWrapper from "../../wrapper/SectionWrapper";

const Introduction = () => {
  return (
    <SectionWrapper>
      <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-8">
        <div className="w-full lg:w-1/2">
          <img src="/img/7010937_3521512.svg" alt="introduction" />
        </div>
        <div className="space-y-2 px-8 lg:px-2 w-full lg:w-1/2">
          <h2 className="font-semibold text-3xl text-primary dark:text-white">
            What is Project Tracker?
          </h2>
          <p className="text-lg text-secondary dark:text-gray-300">
            Project Tracker is a project management and progress tracking system
            designed for candidates, teams, and managers. It enables users to
            view, accept, and track project assignments while dynamically
            monitoring progress and calculating scores based on task completion.
          </p>
          <div>
            <p className="font-semibold text-lg">Features Summary</p>
            <ul className="space-y-2 pl-4 text-secondary dark:text-gray-300 list-disc">
              <li>📋Project Assignment Management</li>
              <li>✅Task Progress Tracking</li>
              <li>📊Dynamic Scoring System</li>
              <li>📈Real-Time Progress Insights</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Introduction;
