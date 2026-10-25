import React, { useRef } from "react";

const getHost = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return "localhost";
  }
};

function Projects({ projectsData }) {
  return (
    <section
      id="projects"
      className="relative py-20 px-4 sm:px-8 md:px-14 bg-gray-950 text-white"
    >
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] max-w-full h-[600px] bg-blue-500/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-purple-500/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
              Projects
              <span className="block text-xs sm:text-sm font-normal text-blue-400 mt-2 tracking-wide font-mono">
                // things I've built & shipped
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
        </div>

        {/* Stacked cards */}
        <div className="max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="lg:sticky mb-10 lg:mb-24"
              style={{ top: `${88 + index * 22}px` }}
            >
              <ProjectCard
                project={project}
                index={index}
                total={projectsData.length}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }) {
  const cardRef = useRef(null);

  // Cursor-following spotlight
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="
        group/card relative overflow-hidden rounded-3xl
        bg-gray-900/90 backdrop-blur-sm
        border border-gray-800/80 hover:border-blue-500/30
        shadow-[0_-10px_40px_rgba(0,0,0,0.5)]
        p-5 sm:p-8 lg:p-10
        transition-colors duration-500
      "
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(96,165,250,0.10), rgba(192,132,252,0.05) 40%, transparent 70%)",
        }}
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: details */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          {/* Index + period */}
          <div className="flex items-center gap-3 font-mono text-xs mb-5">
            <span className="text-purple-400">
              {(index + 1).toString().padStart(2, "0")}
              <span className="text-gray-600"> / {total.toString().padStart(2, "0")}</span>
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-blue-500/40 to-transparent" />
            {project.period && <span className="text-gray-500">{project.period}</span>}
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-3">
            {project.title}
          </h3>

          <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
            {project.description}
          </p>

          {/* Key stat */}
          {project.stat && (
            <div className="inline-flex items-baseline gap-3 mb-6 px-4 py-3 rounded-xl bg-gray-950/60 border border-gray-800">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {project.stat.value}
              </span>
              <span className="font-mono text-xs text-gray-500">{project.stat.label}</span>
            </div>
          )}

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <ul className="space-y-2 mb-6">
              {project.highlights.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-gray-400">
                  <span className="mt-2 w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                  {point}
                </li>
              ))}
            </ul>
          )}

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  px-3 py-1 rounded-lg font-mono text-xs
                  bg-gray-950/60 border border-gray-800 text-gray-400
                  hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10
                  transition-all duration-200 cursor-default
                "
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  px-6 py-2 rounded-full text-sm font-medium
                  bg-blue-500 hover:bg-blue-600
                  shadow-[0_0_20px_rgba(59,130,246,0.25)]
                  transition
                "
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 rounded-full text-sm font-medium border border-white/30 hover:border-white transition"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Right: browser-style preview */}
        <div className="lg:col-span-6 order-1 lg:order-2">
          <div className="rounded-2xl overflow-hidden border border-gray-800 bg-gray-950 shadow-[0_0_40px_rgba(96,165,250,0.08)] transition-transform duration-500 group-hover/card:-translate-y-1">
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-800 bg-gray-900/80">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              <span className="ml-3 flex-1 truncate rounded-md bg-gray-950/80 px-3 py-1 font-mono text-[11px] text-gray-500">
                {project.liveUrl ? getHost(project.liveUrl) : "localhost:3000"}
              </span>
            </div>

            {/* Screenshot */}
            <div className="relative overflow-hidden">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                    w-full h-[200px] sm:h-[260px] lg:h-[320px]
                    object-cover object-top
                    transition-transform duration-700
                    group-hover/card:scale-105
                  "
                />
              ) : (
                <div className="w-full h-[200px] sm:h-[260px] lg:h-[320px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center font-mono text-gray-600 text-sm">
                  {project.title}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;