import React, { useEffect, useRef, useState } from "react";
 

const categorizedSkills = {
  "Programming Languages": [
    { name: "Java", level: 85 },
    { name: "SQL", level: 80 },
    { name: "JavaScript", level: 95 },
    { name: "Python", level: 75 }
  ],
  "Frontend Development": [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "React.js", level: 90 },
    { name: "Vite", level: 80 },
    { name: "Bootstrap", level: 85 },
    { name: "Tailwind CSS", level: 90 }
  ],
  "Backend Development": [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 85 },
    { name: "JWT", level: 80 },
    { name: "APIs", level: 85 },
    { name: "OAuth & Google Auth", level: 75 },
    { name: "Session & Cookies", level: 80 },
    { name: "WebSockets (Socket.IO)", level: 70 }
  ],
  "DevOps & Tools": [
    { name: "Git", level: 90 },
    { name: "GitHub", level: 90 },
    { name: "CI/CD (GitHub Actions)", level: 75 },
    { name: "NGINX", level: 70 },
    { name: "Apache", level: 65 },
    { name: "Shell Scripting", level: 70 },
    { name: "Docker (Basic)", level: 60 },
    { name: "Environment Variables", level: 80 },
    { name: "Log Monitoring", level: 70 }
  ],
  "Databases": [
    { name: "MongoDB", level: 85 },
    { name: "MySQL", level: 80 },
    { name: "PostgreSQL", level: 75 }
  ],
  "Computer Science Fundamentals": [
    { name: "OOP", level: 85 },
    { name: "DSA", level: 80 },
    { name: "DBMS", level: 80 },
    { name: "Operating Systems", level: 75 },
    { name: "Computer Networks", level: 70 }
  ],
  "Soft Skills": [
    { name: "Communication", level: 85 },
    { name: "Problem-Solving", level: 90 },
    { name: "Teamwork", level: 85 }
  ]
};

function Skills() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    },
    { threshold: 0.1 } // more forgiving
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


// Add this custom hook for canvas animation
const useCanvasAnimation = () => {
  const canvasRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    // Create particles
    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 20000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(147, 51, 234, 0.1)',
          connections: [],
        });
      }
    };
    
    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
        if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = activeCategory === Math.floor(i / 10) ? 
          'rgba(59, 130, 246, 0.3)' : particle.color;
        ctx.fill();
        
        // Draw connections
        particles.forEach((otherParticle, j) => {
          if (i < j) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              const opacity = activeCategory !== null ? 
                0.2 - (distance / 500) : 
                0.1 - (distance / 1000);
              
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = activeCategory === Math.floor(i / 10) ? 
                `rgba(147, 51, 234, ${opacity})` :
                `rgba(59, 130, 246, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        });
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize
    resizeCanvas();
    createParticles();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });
    
    // Handle mouse move for interactive effects
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Push particles away from mouse
      particles.forEach(particle => {
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.x -= (dx / distance) * force * 2;
          particle.y -= (dy / distance) * force * 2;
        }
      });
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCategory]);
  
  return { canvasRef, setActiveCategory };
};

// Add these to your component's state
const { canvasRef, setActiveCategory } = useCanvasAnimation();



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
    style={{ mixBlendMode: 'screen' }}
  />

  {/* Interactive glow orbs */}
  <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" />
  <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />

  <div className="container mx-auto relative z-10">
    {/* Header */}
    <div className="text-center mb-12 sm:mb-14 md:mb-16">
      <div className="inline-block relative">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100">
          Skills
          <span className="block text-xs sm:text-sm font-normal text-blue-400 mt-2 tracking-wide">
            Technologies & Proficiencies
          </span>
        </h2>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
    </div>

    <div className="max-w-5xl mx-auto">
      {Object.keys(categorizedSkills).map((category, categoryIndex) => (
        <div
          key={category}
          className="mb-12 sm:mb-14 md:mb-16 last:mb-0 group/category"
          data-aos="fade-up"
          data-aos-delay={categoryIndex * 50}
          onMouseEnter={() => setActiveCategory(categoryIndex)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          {/* Category header */}
          <div className="flex items-center mb-6 sm:mb-8">
            <div className="text-3xl sm:text-4xl font-bold text-gray-900/40 group-hover/category:text-blue-900/30 transition-colors duration-500 mr-3 sm:mr-4">
              {(categoryIndex + 1).toString().padStart(2, '0')}
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-5 sm:w-6 h-0.5 bg-gradient-to-r from-blue-500 to-transparent group-hover/category:w-10 sm:group-hover/category:w-12 transition-all duration-500" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-300 uppercase tracking-normal group-hover/category:text-blue-300 transition-colors duration-300">
                {category}
              </h3>
              <div className="w-5 sm:w-6 h-0.5 bg-gradient-to-l from-purple-500 to-transparent group-hover/category:w-10 sm:group-hover/category:w-12 transition-all duration-500" />
            </div>
          </div>

          {/* Skills grid */}
          <div className="ml-6 sm:ml-10 pl-3 sm:pl-4 border-l border-gray-800/30 group-hover/category:border-blue-500/30 transition-colors duration-500">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {categorizedSkills[category].map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className="relative group/skill"
                  data-aos="fade-in"
                  data-aos-delay={skillIndex * 30}
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover/skill:from-blue-500/10 group-hover/skill:to-purple-500/10 rounded-lg blur-sm transition-all duration-500" />

                  <div className="relative p-2.5 sm:p-3 hover:bg-gray-900/60 rounded-lg transition-all duration-300 group-hover/skill:scale-105 group-hover/skill:shadow-lg group-hover/skill:shadow-blue-500/10">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/skill:bg-purple-400 group-hover/skill:scale-125 transition-all duration-200" />
                        <div className="absolute inset-0 w-1.5 h-1.5 rounded-full border border-blue-400/0 group-hover/skill:border-blue-400/50 group-hover/skill:scale-200 group-hover/skill:animate-ping transition-all duration-300" />
                      </div>
                      <span className="text-sm sm:text-base font-medium text-gray-300 group-hover/skill:text-white group-hover/skill:font-semibold transition-all duration-200">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Floating particles */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-px bg-blue-400/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${15 + Math.random() * 10}s`,
          }}
        />
      ))}
    </div>
  </div>
</section>



  );
}

export default Skills;
