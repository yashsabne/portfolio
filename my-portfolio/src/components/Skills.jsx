import React, { useEffect, useRef, useState } from "react";

const categorizedSkills = {
  "Programming Languages": [
    { name: "Java", level: 85 },
    { name: "SQL", level: 80 },
    { name: "JavaScript", level: 95 },
    { name: "Python", level: 75 }
  ],
  "Frontend Development": [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "React.js", level: 90 },
    { name: "Vite", level: 80 },
    { name: "Bootstrap", level: 85 },
    { name: "Tailwind CSS", level: 90 }
  ],
  "Backend Development": [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 85 },
    { name: "JWT", level: 80 },
    { name: "APIs", level: 85 },
    { name: "OAuth & Google Auth", level: 75 },
    { name: "Session & Cookies", level: 80 },
    { name: "WebSockets (Socket.IO)", level: 70 }
  ],
  "DevOps & Tools": [
    { name: "Git", level: 90 },
    { name: "GitHub", level: 90 },
    { name: "CI/CD (GitHub Actions)", level: 75 },
    { name: "NGINX", level: 70 },
    { name: "Apache", level: 65 },
    { name: "Shell Scripting", level: 70 },
    { name: "Docker (Basic)", level: 60 },
    { name: "Environment Variables", level: 80 },
    { name: "Log Monitoring", level: 70 }
  ],
  "Databases": [
    { name: "MongoDB", level: 85 },
    { name: "MySQL", level: 80 },
    { name: "PostgreSQL", level: 75 }
  ],
  "Computer Science Fundamentals": [
    { name: "OOP", level: 85 },
    { name: "DSA", level: 80 },
    { name: "DBMS", level: 80 },
    { name: "Operating Systems", level: 75 },
    { name: "Computer Networks", level: 70 }
  ],
  "Soft Skills": [
    { name: "Communication", level: 85 },
    { name: "Problem-Solving", level: 90 },
    { name: "Teamwork", level: 85 }
  ]
};


function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 relative">
          My Skills 
        </h2>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.keys(categorizedSkills).map((category) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-y-auto max-h-80"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 text-center">
                {category}
              </h3>
              <div className="space-y-4">
                {categorizedSkills[category].map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {skill.name}
                      </span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-[2000ms] ease-out"
                        style={{ width: visible ? `${skill.level}%` : "0%" }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
