import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Achievements from './components/Achievements';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react";
 
const personalData = {
  name: "Yash Sabne",
  title: "Passionate Software Developer",
  about: "I am a 3rd-year Electronics and Communication Engineering student in my 5th semester. I enjoy building projects using the MERN stack, exploring new technologies, and solving challenging problems. I am constantly learning and passionate about creating efficient and user-friendly software.",
  email: "yashsabne39@gmail.com",
  image:"https://github.com/yashsabne/portfolio/blob/main/Gemini_Generated_Image_5gy6ch5gy6ch5gy6.png?raw=true",
  phone: "+91 7276462261",
  location: "Surat, India",
  social: {
    github: "https://github.com/yashsabne",
    linkedin: "https://www.linkedin.com/in/yash-sabne-77239b287/",
  }
};

export const achievementsData = [
  {
    id: 1,
    title: "Technical Executive",
    organization: "Mindbend, SVNIT",
    year: "2023 – 2023",
    description: "Contributed to organizing and technically coordinating Gujarat’s largest techno-managerial fest with 10,000+ student participants."
  },
  {
    id: 2,
    title: "Google Winter of Code Contributor",
    organization: "NIT Surat",
    year: "2024-present",
    description: "Delivered a production-ready e-commerce project within strict deadlines, collaborating with mentors and peers."
  },
  {
    id: 3,
    title: "MERN Full-Stack Projects",
    organization: "Personal Projects",
    year: "2024 – Present",
    description: "Launched multiple full-stack MERN applications with authentication, payments, and real-time chat features."
  },
  {
    id: 4,
    title: "Competitive Programming",
    organization: "LeetCode & Codeforces",
    year: "2024 – Present",
    description: "Solved 320+ Data Structures & Algorithms problems to strengthen algorithmic thinking and problem-solving skills."
  },
];

export const educationData = [
  {
    id: 1,
    degree: "B.Tech in Electronics and Communication Engineering",
    institution: "S.V. National Institute of Technology, Surat",
    year: "July 2023 – May 2027",
    description: "Currently in 3rd year, 5th semester. Learning software development, data structures, algorithms, and web technologies."
  },
  {
    id: 2,
    degree: "Higher Secondary Education (HSC)",
    institution: "Venkatesh Junior College, Gangakhed, Maharashtra",
    year: "July 2022 – May 2023",
    description: "Completed Higher Secondary with focus on Science and Mathematics."
  },
  {
    id: 3,
    degree: "Certifications & Courses",
    institution: "NPTEL / Online Courses",
    year: "2025(july)  – 2025(sept) ",
    description: "Completed NPTEL DBMS course and actively participated in hackathons, tech talks, and developer meetups."
  },
];


const projectsData = [
  {
    id: 1,
    title: "RentSmart",
    description: "A MERN-stack web application streamlining property rentals and sales with features like real-time chat, secure payments, and a sleek dark theme.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.IO"],
    image: "https://github.com/yashsabne/rentSmart/blob/main/Screenshot%202025-09-11%20171906.png?raw=true",
    liveUrl: "https://rent-smart.vercel.app",
    githubUrl: "https://github.com/yashsabne/rentSmart"
  },
  {
    id: 2,
    title: "LendLink",
    description: "A secure platform for creating and managing groups, enabling seamless money rotation with advanced and real-time updates.",
    technologies: ["React", "Node.js", "Express", "Socket.IO"],
    image: "https://github.com/yashsabne/LendLink/blob/main/Screenshot%202025-01-19%20185520.png?raw=true",
    liveUrl: "https://lend-link-six.vercel.app",
    githubUrl: "https://github.com/yashsabne/LendLink"
  },
  {
    id: 3,
    title: "StratEngine",
    description: "A strategic game engine combining frontend and backend technologies with a Python-based engine for dynamic gameplay.",
    technologies: ["React", "Node.js", "Python","Flask", "JavaScript"],
    image: "https://github.com/yashsabne/stratEngine/blob/main/Screenshot%202025-05-24%20153435.png?raw=true",
    liveUrl: "https://strat-engine.vercel.app",
    githubUrl: "https://github.com/yashsabne/stratEngine"
  },
  {
    id: 4,
    title: "Kashvi (GWOC Final)",
    description: "A comprehensive e-commerce platform developed during Google Winter of Code, featuring a user-friendly interface and robust backend.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    image: "https://github.com/yashsabne/kashvi_GWOC_final/blob/main/products.png?raw=true",
    liveUrl: "kashvi-online-store.vercel.app", 
    githubUrl: "https://github.com/yashsabne/kashvi_GWOC_final"
  },
  {
    id: 5,
    title: "Bank Management System",
    description: "A Java-based project simulating a bank's operations, including account management and transaction processing.",
    technologies: ["Java", "Collections", "OOP"],
    image: "https://mybusinesscreator.com/wp-content/uploads/2025/05/Why-are-online-loans-more-popular-than-traditional-banking-options-now.jpg",
    githubUrl: "https://github.com/yashsabne/java_project_Bank"
  }
];
  

function App() { 
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
 
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView();
      setMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen  bg-gray-950 text-white`}>
      <Header   
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      
      <main>
        <Hero personalData={personalData} />
        <About personalData={personalData} />
        
        <Achievements achievementsData={achievementsData} educationData={educationData} />
        <Skills />
        <Projects projectsData={projectsData} />
        <Contact personalData={personalData} />
      </main>
      
      <Footer />

      <Analytics/>
    </div>
  );
}

export default App;