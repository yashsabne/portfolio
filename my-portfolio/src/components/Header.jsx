import React from "react";

function Header({ menuOpen, toggleMenu, activeSection, scrollToSection }) {
  const navLinks = ["home", "about", "achievements", "skills", "projects", "contact"];

  return (
    <header className="fixed w-full bg-gray-950/90 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto h-16 px-4 py-4 flex justify-center items-center relative">
        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              aria-current={activeSection === section ? "page" : undefined}
              className={`capitalize font-medium tracking-wide transition-colors duration-300 ${
                activeSection === section
                  ? "text-blue-400"
                  : "text-gray-300 hover:text-blue-400"
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section);
              }}
            >
              {section}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-3">
          <button
            className="absolute right-5 top-2 md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors duration-300"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg transition-all duration-300">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navLinks.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`py-2 px-2 rounded-md capitalize font-medium transition-colors duration-300 ${
                  activeSection === section
                    ? "text-blue-400 bg-gray-800"
                    : "text-gray-300 hover:text-blue-400"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                  toggleMenu();
                }}
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-300"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 5h14a1 1 0 100-2H3a1 1 0 000 2zm14 4H3a1 1 0 000 2h14a1 1 0 100-2zm0 6H3a1 1 0 000 2h14a1 1 0 100-2z"
    />
  </svg>
);

export default Header;
