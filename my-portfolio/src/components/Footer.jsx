import React from 'react';

function Footer() {
  return (
    <footer className="py-8 px-4 bg-gray-950 text-white transition-colors duration-300">
      <div className="container mx-auto text-center">
        <p className="text-gray-400">&copy; {new Date().getFullYear()} Yash Sabne. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#home" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Home</a>
          <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">About</a>
          <a href="#projects" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Projects</a>
          <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;