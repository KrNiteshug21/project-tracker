import React from "react";
import SectionWrapper from "../../wrapper/SectionWrapper";

const features = [
  {
    title: "Project Management",
    description:
      "Easily view and accept projects assigned to you. Keep all project details organized in one place.",
    img: "/img/document_15122444.png",
  },
  {
    title: "Task Progress Tracking",
    description:
      "Track the status of individual tasks with real-time updates. Know what's pending, in progress, or completed",
    img: "/img/yes_9426997.png",
  },
  {
    title: "Dynamic Scoring",
    description:
      "Earn scores based on task completions and progress. Visualize your achievements and stay motivated.",
    img: "/img/scoring-system.png",
  },
  {
    title: "Progress Visualization",
    description:
      "Understand your progress at a glance with dynamic charts and performance summaries.",
    img: "/img/progress_17019907.png",
  },
];

const KeyFeatures = () => {
  return (
    <SectionWrapper>
      <div>
        <h2 className="mb-6 font-semibold text-3xl text-center text-primary">
          Key Features
        </h2>
        <div className="flex flex-wrap lg:flex-nowrap justify-center items-stretch gap-4 mt-4">
          {features.map((item) => (
            <div
              className="space-y-4 border-2 border-gray-400 rounded-lg w-[252px]"
              key={item.title}
            >
              <div>
                <img
                  className="mx-auto my-2 w-48 h-48"
                  src={item.img}
                  alt={item.title}
                />
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-start text-xl">
                  {item.title}
                </h2>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default KeyFeatures;
