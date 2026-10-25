import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaArrowRight } from "react-icons/fa";
import { ReactTyped } from "react-typed";

const roles = [
  "Full-Stack Developer",
  "Backend Engineer",
  "Microservices Builder",
  "Problem Solver",
];

const floatingChips = [
  { label: "Node.js", pos: "top-2 -left-4 md:-left-10", delay: "0s" },
  { label: "React", pos: "top-16 -right-4 md:-right-10", delay: "1.2s" },
  { label: "Redis", pos: "bottom-20 -left-6 md:-left-12", delay: "2.1s" },
  { label: "Docker", pos: "bottom-4 -right-2 md:-right-8", delay: "0.6s" },
];

function Hero({ personalData }) {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Ambient particle background (same as the other sections)
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

  const reveal = (delay) => ({
    transitionDelay: visible ? `${delay}ms` : "0ms",
  });

  const fadeUp = `transition-all duration-700 ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
  }`;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 sm:pt-36 pb-24 px-4 sm:px-6 md:px-12 min-h-screen flex items-center bg-gray-950 text-white"
    >
      {/* Local keyframes for the floating chips */}
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hero-scroll {
          0% { opacity: 0; transform: translateY(0); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translateY(10px); }
        }
      `}</style>

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000" />

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-10 items-center">
        {/* Left content */}
        <div className="md:col-span-7 order-2 md:order-1">
          {/* Status pill */}
          <div className={fadeUp} style={reveal(0)}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-900/60 border border-gray-800 font-mono text-xs text-gray-400 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              B.Tech · SVNIT Surat
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5 ${fadeUp}`}
            style={reveal(100)}
          >
            <span className="block font-mono text-sm sm:text-base font-normal text-blue-400 mb-3 tracking-wide">
              // hello, world
            </span>
            <span className="text-gray-100">Hi, I'm </span>
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
              {personalData.name}
            </span>
          </h1>

          {/* Typed roles */}
          <h2
            className={`font-mono text-base sm:text-xl text-gray-300 mb-3 min-h-[2rem] ${fadeUp}`}
            style={reveal(200)}
          >
            <span className="text-purple-400 mr-2">&gt;</span>
            <ReactTyped
              strings={roles}
              typeSpeed={70}
              backSpeed={35}
              backDelay={1400}
              loop
            />
          </h2>

          {personalData.title && (
            <p
              className={`text-sm sm:text-base text-gray-500 mb-6 ${fadeUp}`}
              style={reveal(260)}
            >
              {personalData.title}
            </p>
          )}

          <p
            className={`text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mb-9 ${fadeUp}`}
            style={reveal(320)}
          >
            I build full-stack products with a focus on backend engineering:
            REST APIs, microservices and real-time systems that stay reliable
            under load.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-wrap items-center gap-4 mb-10 ${fadeUp}`}
            style={reveal(400)}
          >
            <a
              href="#projects"
              className="
                group/cta inline-flex items-center gap-3
                px-6 py-3 rounded-full font-medium text-white
                bg-gradient-to-r from-blue-500 to-purple-500
                hover:from-blue-400 hover:to-purple-400
                shadow-[0_0_24px_rgba(96,165,250,0.25)]
                transition-all duration-300
              "
            >
              View Work
              <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
            </a>

            <a
              href="#contact"
              className="
                px-6 py-3 rounded-full font-medium text-gray-300
                border border-gray-700 hover:border-blue-400/60
                hover:text-white hover:bg-blue-500/10
                transition-all duration-300
              "
            >
              Contact Me
            </a>
          </div>

          {/* Socials */}
          <div className={`flex items-center gap-3 ${fadeUp}`} style={reveal(480)}>
            {personalData.social?.github && (
              <SocialLink
                href={personalData.social.github}
                label="GitHub"
                icon={<FaGithub size={18} />}
              />
            )}
            {personalData.social?.linkedin && (
              <SocialLink
                href={personalData.social.linkedin}
                label="LinkedIn"
                icon={<FaLinkedin size={18} />}
              />
            )}
            {personalData.social?.twitter && (
              <SocialLink
                href={personalData.social.twitter}
                label="Twitter"
                icon={<FaTwitter size={18} />}
              />
            )}
          </div>
        </div>

        {/* Right: photo */}
        <div
          className={`md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end transition-all duration-1000 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
          style={reveal(200)}
        >
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Soft glow behind */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl" />

            {/* Rotating gradient ring */}
            <div
              className="absolute -inset-1.5 rounded-full animate-spin motion-reduce:animate-none"
              style={{
                animationDuration: "14s",
                background:
                  "conic-gradient(from 0deg, rgba(96,165,250,0.9), rgba(192,132,252,0.9), rgba(96,165,250,0.05), rgba(96,165,250,0.9))",
              }}
            />

            {/* Photo */}
            <div className="absolute inset-0 rounded-full p-1.5 bg-gray-950">
              <img
                src={personalData.image}
                alt={`${personalData.name} profile`}
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Floating tech chips */}
            {floatingChips.map((chip) => (
              <span
                key={chip.label}
                className={`
                  hidden sm:inline-flex absolute ${chip.pos}
                  items-center gap-2 px-3 py-1.5 rounded-lg
                  bg-gray-900/80 backdrop-blur-sm border border-gray-800
                  font-mono text-xs text-gray-300
                  shadow-[0_0_18px_rgba(96,165,250,0.12)]
                  motion-reduce:animate-none
                `}
                style={{
                  animation: "hero-float 5s ease-in-out infinite",
                  animationDelay: chip.delay,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
        <span className="w-5 h-8 rounded-full border border-gray-700 flex justify-center pt-1.5">
          <span
            className="w-1 h-1.5 rounded-full bg-blue-400"
            style={{ animation: "hero-scroll 1.8s ease-in-out infinite" }}
          />
        </span>
      </a>
    </section>
  );
}

/* --- Social link --- */
const SocialLink = ({ href, label, icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="
      w-10 h-10 rounded-full flex items-center justify-center
      bg-gray-900/60 border border-gray-800 text-gray-400
      hover:text-blue-300 hover:border-blue-400/50 hover:bg-blue-500/10
      hover:-translate-y-0.5
      transition-all duration-300
    "
  >
    {icon}
  </a>
);

export default Hero;