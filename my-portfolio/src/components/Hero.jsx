import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ReactTyped } from "react-typed";


function Hero({ personalData }) {
    return (
        <section
            id="home"
            className="pt-32 pb-20 px-4 min-h-screen flex items-center bg-gradient-to-b from-white dark:from-gray-950 to-transparent"
        >
            <div className="container mx-auto flex flex-col md:flex-row items-center">
                {/* Left Content */}
                <div className="md:w-1/2 mb-10 md:mb-0 animate-fade-in-up">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        Hi, I'm{" "}
                        <span className="text-blue-600 dark:text-blue-400">
                            <ReactTyped
                                strings={[personalData.name]}
                                typeSpeed={100}
                                backSpeed={50}
                                backDelay={1000}   
                                loop={true}       
                            />
                        </span>
                    </h1>

                    <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-6 font-medium">
                        {personalData.title}
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
                        I craft{" "}
                        <span className="font-semibold text-blue-600 dark:text-blue-400">
                            accessible, efficient
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-purple-600 dark:text-purple-400">
                            user-friendly
                        </span>{" "}
                        software solutions for the web and beyond.
                    </p> 
 <div className="flex space-x-4">
 
  <a
    href="#projects"
    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg transform transition duration-300 hover:shadow-xl"
  >
    View My Work
  </a>
 
  <a
    href="#contact"
    className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-semibold rounded-xl shadow-md transition duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg"
  >
     Contact Me
  </a>
</div>

                    <div className="mt-8 flex space-x-5">
                        {personalData.social.github && (
                            <SocialLink
                                href={personalData.social.github}
                                label="GitHub"
                                icon={<FaGithub size={24} />}
                            />
                        )}
                        {personalData.social.linkedin && (
                            <SocialLink
                                href={personalData.social.linkedin}
                                label="LinkedIn"
                                icon={<FaLinkedin size={24} />}
                            />
                        )}
            
                    </div>
                </div>

                {/* Right Content - Profile */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl animate-fade-in">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-80"></div>
                        <div className="relative w-full h-full flex items-center justify-center text-white">
                            {personalData.image ? (
                                <img
                                    src={personalData.image}
                                    alt={`${personalData.name} profile`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-24 w-24 opacity-80"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* --- Social Link Reusable Component --- */
const SocialLink = ({ href, label, icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
    >
        {icon}
    </a>
);

export default Hero;
