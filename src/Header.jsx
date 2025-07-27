import React from 'react'
import Logo from "./Logo"
import { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Adventures", href: "#" },
    { label: "Reviews", href: "#" },
    { label: "Contact Me", href: "/contact" },
    { label: "Community", href: "#" },
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrollY > 50
            ? "bg-black/90 backdrop-blur-xl py-3 shadow-2xl border-b border-orange-500/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo - Hidden on mobile, visible on desktop */}
          <div className="text-2xl lg:text-3xl  lg:block">
            <Logo />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className=" text-white font-semibold relative hover:text-orange-500 transition-all duration-300 group py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all duration-500 relative z-60 ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 relative">
              <span
                className={`absolute w-full h-0.5 bg-white transition-all duration-500 ease-in-out ${
                  isMenuOpen ? "top-3 rotate-45 bg-orange-500" : "top-1"
                }`}
              ></span>
              <span
                className={`absolute w-full h-0.5 bg-white transition-all duration-500 ease-in-out ${
                  isMenuOpen ? "opacity-0 scale-0" : "top-3 opacity-100 scale-100"
                }`}
              ></span>
              <span
                className={`absolute w-full h-0.5 bg-white transition-all duration-500 ease-in-out ${
                  isMenuOpen ? "top-3 -rotate-45 bg-orange-500" : "top-5"
                }`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 top-0 transition-all duration-700 ease-in-out ${
            isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background Overlay */}
          <div 
            className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-700 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Menu Content */}
          <div className={`relative bg-gradient-to-br from-black via-gray-900 to-black min-h-screen transition-all duration-700 ease-out transform ${
            isMenuOpen ? "translate-x-0 scale-100" : "-translate-x-full scale-95"
          }`}>
            {/* Header with Logo - Only visible in mobile menu */}
            <div className={`flex items-center justify-between p-6 border-b border-orange-500/30 transition-all duration-500 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`} style={{ transitionDelay: isMenuOpen ? '0.3s' : '0s' }}>
              <div className={`text-2xl transform transition-all duration-600 ${
                isMenuOpen ? "scale-100 rotate-0" : "scale-75 rotate-12"
              }`} style={{ transitionDelay: isMenuOpen ? '0.4s' : '0s' }}>
                <Logo />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="px-8 py-12 space-y-2">
              {navLinks.map((item, index) => (
                <div
                  key={item.label}
                  className={`transform transition-all duration-600 ease-out ${
                    isMenuOpen 
                      ? "translate-x-0 opacity-100 translate-y-0" 
                      : "-translate-x-12 opacity-0 translate-y-4"
                  }`}
                  style={{ 
                    transitionDelay: isMenuOpen ? `${0.5 + index * 0.1}s` : '0s' 
                  }}
                >
                  <a
                    href={item.href}
                    className="group block relative overflow-hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="relative py-4 px-6 rounded-xl hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-red-600/20 transition-all duration-400 border border-transparent hover:border-orange-500/40 transform hover:scale-105">
                      <span className="text-xl font-medium text-white group-hover:text-orange-400 transition-all duration-300 relative z-10 block">
                        {item.label}
                      </span>
                      
                      {/* Animated Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 transform scale-x-0 group-hover:scale-x-100"></div>
                      
                      {/* Bottom Line Animation */}
                      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-orange-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"></div>
                      
                      {/* Side Accent */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-orange-500 group-hover:h-8 transition-all duration-400 rounded-r"></div>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* Footer Section */}
            <div className={`absolute bottom-8 left-8 right-8 transform transition-all duration-600 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`} style={{ transitionDelay: isMenuOpen ? '0.8s' : '0s' }}>
              <div className="border-t border-orange-500/20 pt-6">
                <p className="text-gray-400 text-sm text-center animate-pulse">
                  Explore • Adventure • Connect
                </p>
                <div className="flex justify-center mt-4 space-x-6">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
