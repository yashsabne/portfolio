import React from "react";

function Achievements({ achievementsData, educationData }) {
  const TimelineItem = ({ title, subtitle, year, description, isLast = false }) => (
    <div className="relative pl-10">
     
      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-blue-400 z-10 animate-pulse-fade-in"></div>
 
      {!isLast && <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-600 animate-expand-height"></div>}

      <h4 className=" font-semibold mb-1 text-white">{title}</h4>
      <h5 className=" text-blue-400 mb-2">
        {subtitle} | {year}
      </h5>
      <p className="text-gray-300">{description}</p>
    </div>
  );

  return (
    <section id="achievements" className="py-20 px-10 bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
          Achievements & Involvement
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Achievements & Projects */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-blue-400">
              Achievements & Projects
            </h3>
            <div className="space-y-8">
              {achievementsData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  title={item.title}
                  subtitle={item.organization}
                  year={item.year}
                  description={item.description}
                  isLast={index === achievementsData.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-8 text-blue-400">
              Education
            </h3>
            <div className="space-y-8">
              {educationData.map((item, index) => (
                <TimelineItem
                  key={item.id}
                  title={item.degree}
                  subtitle={item.institution}
                  year={item.year}
                  description={item.description}
                  isLast={index === educationData.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
