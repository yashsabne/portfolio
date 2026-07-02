import React, { useEffect, useMemo, useRef, useState } from "react";
import { categorizedSkills } from "../const/skills";

function Skills() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const categories = useMemo(() => Object.keys(categorizedSkills), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ringsFilled, setRingsFilled] = useState(false);

  const activeCategory = categories[activeIndex];
  const activeSkills = categorizedSkills[activeCategory];

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

  // Ambient particle background (kept consistent with the rest of the site)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000));
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.6 + 0.4,
          speedX: (Math.random() - 0.5) * 0.25,
          speedY: (Math.random() - 0.5) * 0.25,
          color: Math.random() > 0.5 ? "rgba(96, 165, 250, 0.15)" : "rgba(192, 132, 252, 0.15)",
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x <= 0 || p.x >= canvas.width) p.speedX *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(96, 165, 250, ${0.08 - distance / 1200})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    createParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Animate proficiency rings whenever the active category changes
  useEffect(() => {
    setRingsFilled(false);
    const t = requestAnimationFrame(() => {
      setTimeout(() => setRingsFilled(true), 30);
    });
    return () => cancelAnimationFrame(t);
  }, [activeIndex]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="
        py-14 sm:py-16 md:py-20
        px-4 sm:px-6 md:px-12
        bg-gray-950 text-white
        relative overflow-hidden
      "
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div
        className={`container mx-auto relative z-10 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
              Skills
              <span className="block text-xs sm:text-sm font-normal text-blue-400 mt-2 tracking-wide font-mono">
                // technologies & proficiencies
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide">
            {categories.map((category, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={category}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    shrink-0 px-4 py-2 rounded-full font-mono text-xs sm:text-sm
                    border transition-all duration-300 whitespace-nowrap
                    ${
                      isActive
                        ? "bg-blue-500/10 border-blue-400/60 text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"
                    }
                  `}
                >
                  <span className="text-gray-600 mr-1">{(index + 1).toString().padStart(2, "0")}</span>
                  {category.toLowerCase()}
                </button>
              );
            })}
          </div>

          {/* Skill rings grid */}
          <div
            key={activeCategory}
            className="
              grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4
              gap-4 sm:gap-5
            "
          >
            {activeSkills.map((skill, index) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                filled={ringsFilled}
                delay={index * 60}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill, filled, delay }) {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (filled ? skill.level : 0) / 100 * circumference;

  return (
    <div
      className="
        relative group/skill p-4 rounded-xl
        bg-gray-900/50 border border-gray-800/60
        hover:border-blue-500/30 hover:bg-gray-900/80
        transition-all duration-300
        flex flex-col items-center text-center gap-3
      "
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px]">
        <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
          <circle
            cx="20"
            cy="20"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />
          <circle
            cx="20"
            cy="20"
            r={radius}
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: `stroke-dashoffset 900ms ease-out ${delay}ms` }}
          />
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[11px] sm:text-xs text-gray-300 group-hover/skill:text-white transition-colors">
            {skill.level}
          </span>
        </div>
      </div>

      <span className="text-sm sm:text-[15px] font-medium text-gray-300 group-hover/skill:text-white transition-colors duration-200">
        {skill.name}
      </span>
    </div>
  );
}

export default Skills;