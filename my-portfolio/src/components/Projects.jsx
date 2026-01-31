import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

function Projects({ projectsData }) {
  // Track which card is active on mobile
  const [activeCard, setActiveCard] = useState(null);

  const toggleCard = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
<section
  id="projects"
  className="
    relative
    py-20
    px-4 sm:px-8 md:px-14
    bg-gray-950 text-white
  "
>
  {/* subtle background accent */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />

  <div className="container mx-auto relative z-10">
    {/* Header */}
    <div className="max-w-3xl mb-24">
      <span className="text-sm tracking-widest text-blue-400 uppercase">
        Selected Work
      </span>
      <h2 className="mt-3 text-4xl md:text-5xl font-bold leading-tight">
        Projects that reflect<br className="hidden sm:block" />
        how I think & build
      </h2>
      <p className="mt-4 text-gray-400 max-w-xl">
        A curated set of projects where design, engineering, and problem-solving
        come together.
      </p>
    </div>

    {/* Projects */}
    <div className="space-y-28">
      {projectsData.map((project, index) => {
        const isEven = index % 2 === 0

        return (
          <div
            key={project.id}
            className="
              grid grid-cols-1 lg:grid-cols-12
              gap-10 lg:gap-16
              items-center
            "
          >
            {/* Image */}
            <div
              className={`
                relative
                lg:col-span-7
                ${isEven ? "lg:order-1" : "lg:order-2"}
              `}
            >
              {/* frame */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 border border-white/10 rounded-2xl" />

              <div className="relative overflow-hidden rounded-2xl bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full h-[260px] sm:h-[340px] lg:h-[400px]
                    object-cover
                    transition-transform duration-700
                    hover:scale-105
                  "
                />

                {/* hover overlay */}
                <div className="
                  absolute inset-0
                  bg-black/60
                  flex items-center justify-center gap-6
                  opacity-0 hover:opacity-100
                  transition-opacity
                ">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 rounded-full bg-white text-gray-900 font-medium"
                    >
                      Live Preview
                    </a>
                  )}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 rounded-full border border-white/60 font-medium"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>

            {/* Content */}
            <div
              className={`
                lg:col-span-5
                ${isEven ? "lg:order-2" : "lg:order-1"}
              `}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-bold text-white/5">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-blue-500/40 to-transparent" />
              </div>

              <h3 className="text-3xl font-semibold mb-4">
                {project.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-3 mb-10">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-3 py-1
                      text-sm
                      rounded-full
                      bg-white/5
                      border border-white/10
                      text-gray-300
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {/* <div className="flex gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      px-6 py-2
                      rounded-full
                      bg-blue-500
                      hover:bg-blue-600
                      transition
                    "
                  >
                    Explore Project
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    px-6 py-2
                    rounded-full
                    border border-white/30
                    hover:border-white
                    transition
                  "
                >
                  GitHub
                </a>
              </div> */}
            </div>
          </div>
        )
      })}
    </div>
  </div>
</section>

  );
}

export default Projects;
