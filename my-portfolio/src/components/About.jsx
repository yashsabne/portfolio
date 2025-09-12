import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function About({ personalData }) {
  return (
    <section
      id="about"
      className="py-20 px-6  text-gray-200 bg-gradient-to-b from-gray-900 to-gray-950"
    >
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 relative text-white">
          About Me
          <span className="block w-20 h-1 bg-blue-500 mx-auto mt-3 rounded-full"></span>
        </h2>

        <p className="text-lg text-gray-300 mb-10 leading-relaxed text-center">
          {personalData.about ||
            `I am a passionate 3rd-year student in my 5th semester, learning and building projects in software development and web technologies. I enjoy exploring new tools, frameworks, and solving challenging problems.`}
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
          <div className="flex items-center space-x-3 text-gray-300">
            <FaEnvelope className="text-blue-500 text-xl" />
            <span>{personalData.email}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <FaPhone className="text-green-500 text-xl" />
            <span>{personalData.phone}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-300">
            <FaMapMarkerAlt className="text-red-500 text-xl" />
            <span>{personalData.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
