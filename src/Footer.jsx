import React from 'react'
import Logo from "./Logo"
import {
  Menu,
  X,
  ChevronRight,
  Play,
  Users,
  MapPin,
  Calendar,
  Star,
  ArrowRight,
  Instagram,
  Twitter,
  Youtube,
  Zap,
  Award,
  Flame,
} from "lucide-react";

function Footer() {
  return (
    <>


       <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-12 sm:py-16 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                 <Logo/>
            </div>
         
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base max-w-xs mx-auto sm:mx-0">
              The world's premier destination for motorcycle enthusiasts.
              Sharing the passion for two wheels and the open road since day
              one.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4">
              {[
                { icon: Instagram,url:"https://www.instagram.com/dreamridewithsubho?igsh=ZjIxczd5cjV0ajdv" ,label: "Instagram" },
                { icon: Twitter,url:"#" , label: "Twitter" },
                { icon: Youtube, url:"https://youtube.com/@dreamridewithsubho?si=cYg4zNCEMXr0ONt9" ,label: "YouTube" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="group p-2 sm:p-3 glass-morphism rounded-full hover:bg-orange-500 transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Content Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-orange-500">
              Content
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Epic Adventures",
                "Bike Reviews",
                "Custom Builds",
                "Gear Guides",
                "Riding Tips",
                "Track Days",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-orange-500">
              Community
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "Forum Discussions",
                "Group Rides",
                "Events Calendar",
                "Contributors",
                "Success Stories",
                "Photo Contest",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-orange-500">
              Support
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {[
                "About Our Mission",
                "Contact Team",
                "Help Center",
                "Privacy Policy",
                "Terms of Service",
                "Careers",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-orange-500 transition-colors duration-300 hover:translate-x-1 transform inline-block text-sm sm:text-base"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-center sm:text-left">
            <p className="text-gray-400 text-xs sm:text-sm">
              &copy; 2025  <a href="https://dipayan-dey.github.io/portfolio/" terget="_blank" className='text-cyan-500'> Dipayan Dey </a> . All rights reserved. Built for riders, by
              riders with ❤️
            </p>

            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />
              <span className="text-xs sm:text-sm">Powered by Dipayan Dey</span>
            </div>
          </div>
        </div>
      </div>
    </footer>

      {/* Back to Top Button */}
      <button
        className={`fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-orange-500/30 ${
          scrollY > 200
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ChevronRight className="w-6 h-6 text-white -rotate-90" />
      </button>
    </>
  )
}

export default Footer