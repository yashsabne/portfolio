import React, { useEffect, useMemo, useRef, useState } from "react";
import { categorizedSkills } from "../const/skills";

function Skills() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const categories = useMemo(() => Object.entries(categorizedSkills), []);

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

      <div className="container mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 sm:mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
              Skills
              <span className="block text-xs sm:text-sm font-normal text-blue-400 mt-2 tracking-wide font-mono">
                // technologies & tools I work with
              </span>
            </h2>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
        </div>

        {/* Bento grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map(([title, skills], index) => (
            <CategoryCard
              key={title}
              index={index}
              title={title}
              skills={skills}
              visible={visible}
              wide={index === 1 || index === 2}
              full={index === categories.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ index, title, skills, visible, wide, full }) {
  const cardRef = useRef(null);

  // Cursor-following spotlight
  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const spanClass = full
    ? "lg:col-span-3 md:col-span-2"
    : wide
    ? "lg:col-span-2"
    : "";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`
        group/card relative overflow-hidden rounded-2xl
        bg-gray-900/50 border border-gray-800/70
        hover:border-blue-500/30
        p-5 sm:p-6
        transition-all duration-700 ${spanClass}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
      `}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
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
        {/* Card header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <span className="font-mono text-xs text-purple-400/80">
              {(index + 1).toString().padStart(2, "0")}
            </span>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-100 mt-1">
              {title}
            </h3>
          </div>
          <span className="font-mono text-[11px] text-gray-500 border border-gray-800 rounded-full px-2.5 py-1">
            {skills.length}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="
                group/chip inline-flex items-center gap-2
                px-3 py-1.5 rounded-lg
                bg-gray-950/60 border border-gray-800
                text-[13px] sm:text-sm text-gray-400
                hover:text-white hover:border-blue-400/50
                hover:bg-blue-500/10
                transition-all duration-200 cursor-default
              "
            >
              <span className="w-1 h-1 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 group-hover/chip:scale-150 transition-transform duration-200" />
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skills;