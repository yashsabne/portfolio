import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function About({ personalData }) {
  return (
    <section
      id="about"
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative">
          About Me 
        </h2>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed text-center">
          {personalData.about ||
            `I am a passionate 3rd-year student in my 5th semester, learning and building projects in software development and web technologies. I enjoy exploring new tools, frameworks, and solving challenging problems.`}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8 text-gray-700 dark:text-gray-300">
          <div className="flex items-center space-x-3">
            <FaEnvelope className="text-blue-600 dark:text-blue-400" />
            <span  >{personalData.email}</span> 
          </div>
          <div className="flex items-center space-x-3">
            <FaPhone className="text-blue-600 dark:text-blue-400" />
            <span>{personalData.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400" />
            <span>{personalData.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
