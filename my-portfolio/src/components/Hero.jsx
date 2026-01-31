import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { ReactTyped } from "react-typed";

function Hero({ personalData }) {
    return (
       <section
  id="home"
  className="pt-36 pb-28 px-6 min-h-screen flex items-center bg-gray-950"
>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    
    {/* Left Content */}
    <div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-6">
        Hi, I’m{" "}
        <span className="text-gray-300">
          <ReactTyped
            strings={[personalData.name]}
            typeSpeed={90}
            backSpeed={40}
            backDelay={1200}
            loop
          />
        </span>
      </h1>

      <h2 className="text-xl md:text-2xl text-gray-400 mb-8 font-normal">
        {personalData.title}
      </h2>

      <p className="text-lg text-gray-500 leading-relaxed max-w-xl mb-10">
        I build thoughtful, reliable software focused on clarity,
        performance, and long-term maintainability.
      </p>

      {/* CTAs */}
      <div className="flex gap-6">
        <a
          href="#projects"
          className="text-white font-medium border-b border-gray-500 hover:border-white transition"
        >
          View work
        </a>

        <a
          href="#contact"
          className="text-gray-400 font-medium hover:text-white transition"
        >
          Contact
        </a>
      </div>

      {/* Socials */}
      <div className="mt-10 flex gap-6 text-gray-400">
        {personalData.social.github && (
          <SocialLink
            href={personalData.social.github}
            label="GitHub"
            icon={<FaGithub size={20} />}
          />
        )}
        {personalData.social.linkedin && (
          <SocialLink
            href={personalData.social.linkedin}
            label="LinkedIn"
            icon={<FaLinkedin size={20} />}
          />
        )}
        {personalData.social.twitter && (
          <SocialLink
            href={personalData.social.twitter}
            label="Twitter"
            icon={<FaTwitter size={20} />}
          />
        )}
      </div>
    </div>

    {/* Right Content – Image */}
    <div className="flex justify-center md:justify-end">
      <div className="w-72 h-72 md:w-96 md:h-96 overflow-hidden">
        <img
          src={personalData.image}
          alt={`${personalData.name} profile`}
          className="w-full h-full object-cover rounded-full"
        />
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
        className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
    >
        {icon}
    </a>
);

export default Hero;
