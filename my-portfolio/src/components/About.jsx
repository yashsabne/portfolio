import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

const focusAreas = [
  "Backend Engineering",
  "Microservices",
  "Real-Time Apps",
  "Scalable Services",
  "Full-Stack Development",
];

const stats = [
  { value: 400, suffix: "+", label: "LeetCode problems solved" },
  { value: 10000, suffix: "+", label: "fest participants coordinated at Mindbend" },
  { value: 7, suffix: "", label: "microservices in RentSmart v2" },
  { value: 4, suffix: "+", label: "projects built" },
];

// Counts from 0 to target once `start` is true
function useCountUp(target, start, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frameId;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out
      setCount(Math.round(target * eased));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [start, target, duration]);

  return count;
}

function About({ personalData }) {
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

  const aboutText =
    personalData.about ||
    "I'm a software engineering student at SVNIT Surat who loves building full-stack products, with a growing focus on backend engineering, scalable services and real-time systems. I enjoy turning ideas into reliable software, from REST APIs and microservices to clean, responsive interfaces.";

  const reveal = (delay) => ({
    transitionDelay: visible ? `${delay}ms` : "0ms",
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-4 sm:px-6 md:px-12 bg-gray-950 text-white"
    >
      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-14 sm:mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
              About Me
              <span className="block text-xs sm:text-sm font-normal text-blue-400 mt-2 tracking-wide font-mono">
                // who I am & what I do
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: intro */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={reveal(100)}
          >
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed mb-8">
              {aboutText}
            </p>

            {/* Education */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800/70 mb-8 hover:border-blue-500/30 transition-colors duration-300">
              <div className="shrink-0 w-11 h-11 rounded-full flex items-center justify-center bg-blue-500/10 border border-blue-400/20 text-blue-400">
                <FaGraduationCap />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] uppercase tracking-wider text-gray-500">
                  Education
                </p>
                <p className="text-gray-200 text-sm sm:text-base">
                  B.Tech, Electronics & Communication · SVNIT Surat
                </p>
                <p className="font-mono text-xs text-gray-500">2023 – 2027</p>
              </div>
            </div>

            {/* Focus areas */}
            <p className="font-mono text-xs text-purple-400/80 mb-3">
              <span className="text-gray-600">$</span> currently focused on
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="
                    group/chip inline-flex items-center gap-2
                    px-3 py-1.5 rounded-lg
                    bg-gray-900/60 border border-gray-800
                    text-[13px] sm:text-sm text-gray-400
                    hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10
                    transition-all duration-200 cursor-default
                  "
                >
                  <span className="w-1 h-1 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 group-hover/chip:scale-150 transition-transform duration-200" />
                  {area}
                </span>
              ))}
            </div>

            
          </div>

          {/* Right: stat cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                stat={stat}
                visible={visible}
                delay={220 + index * 100}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoPill({ icon, text }) {
  if (!text) return null;
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800/70 text-sm text-gray-300 hover:border-blue-500/30 hover:text-white transition-colors duration-300">
      <span className="text-blue-400 text-xs">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}

function StatCard({ stat, visible, delay }) {
  const cardRef = useRef(null);
  const count = useCountUp(stat.value, visible);

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
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {/* Spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), rgba(96,165,250,0.12), rgba(192,132,252,0.06) 40%, transparent 70%)",
        }}
      />

      <div className="relative">
        <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {count.toLocaleString()}
          {stat.suffix}
        </p>
        <p className="mt-2 font-mono text-[11px] sm:text-xs text-gray-500 leading-snug">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

export default About;