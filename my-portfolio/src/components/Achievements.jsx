import React, { useEffect, useRef, useState } from "react";

function Achievements({ achievementsData, educationData }) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Reveal on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      if (window.innerHeight >= sectionRef.current.getBoundingClientRect().top) {
        setVisible(true);
        observer.disconnect();
      }
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative overflow-hidden py-14 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 bg-gray-950 text-white"
    >
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
              Achievements & Involvement
              <span className="block text-xs sm:text-sm font-normal text-blue-400 mt-2 tracking-wide font-mono">
                // milestones & where I learned
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Achievements */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs text-purple-400/80 mb-5">
              <span className="text-gray-600">$</span> ls ./achievements
            </p>

            <div className="space-y-4 sm:space-y-5">
              {achievementsData.map((item, index) => (
                <AchievementCard
                  key={item.id}
                  item={item}
                  index={index}
                  visible={visible}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs text-purple-400/80 mb-5">
              <span className="text-gray-600">$</span> cat ./education
            </p>

            <div>
              {educationData.map((item, index) => (
                <EducationItem
                  key={item.id}
                  item={item}
                  index={index}
                  visible={visible}
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

function AchievementCard({ item, index, visible }) {
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
      className={`
        group/card relative overflow-hidden rounded-2xl
        bg-gray-900/50 border border-gray-800/70
        hover:border-blue-500/30
        p-5 sm:p-6
        transition-all duration-700
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: visible ? `${150 + index * 90}ms` : "0ms" }}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(96,165,250,0.12), rgba(192,132,252,0.06) 40%, transparent 70%)",
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-400/0 to-transparent group-hover/card:via-blue-400/60 transition-all duration-500" />

      <div className="relative">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="font-mono text-xs text-purple-400/80">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          {item.year && (
            <span className="font-mono text-[11px] text-gray-500 border border-gray-800 rounded-full px-2.5 py-1">
              {item.year}
            </span>
          )}
        </div>

        <h4 className="text-lg sm:text-xl font-semibold text-gray-100 mb-1">
          {item.title}
        </h4>

        {item.organization && (
          <p className="font-mono text-xs sm:text-sm text-blue-400 mb-3">
            {item.organization}
          </p>
        )}

        <p className="text-sm sm:text-[15px] text-gray-400 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function EducationItem({ item, index, visible, isLast }) {
  return (
    <div
      className={`relative pl-10 transition-all duration-700 ${
        isLast ? "" : "pb-10"
      } ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
      style={{ transitionDelay: visible ? `${250 + index * 150}ms` : "0ms" }}
    >
      {/* Line */}
      {!isLast && (
        <div className="absolute left-[7px] top-5 bottom-0 w-px bg-gradient-to-b from-blue-400/60 via-purple-400/30 to-transparent" />
      )}

      {/* Dot */}
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gray-950 border-2 border-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.5)] flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
      </div>

      {item.year && (
        <p className="font-mono text-xs text-purple-400/80 mb-1">{item.year}</p>
      )}
      <h4 className="text-lg font-semibold text-gray-100">{item.degree}</h4>
      <p className="text-sm font-mono text-blue-400 mt-1 mb-2">
        {item.institution}
      </p>
      {item.description && (
        <p className="text-sm text-gray-400 leading-relaxed">
          {item.description}
        </p>
      )}
    </div>
  );
}

export default Achievements;