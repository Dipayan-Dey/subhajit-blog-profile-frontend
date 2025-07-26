import { useState, useEffect } from 'react';
import { Menu, X, Star, Zap, Shield, ArrowRight } from 'lucide-react';

// DreamRide Text Component (Small Version)
function DreamRideTextSmall() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center">
      <style jsx>{`
        @keyframes professional-gradient-small {
          0%, 100% { 
            background-position: 0% 50%;
            filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15)) drop-shadow(0 0 15px rgba(255, 107, 53, 0.2));
          }
          50% { 
            background-position: 100% 50%;
            filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 20px rgba(255, 107, 53, 0.3));
          }
        }
      `}</style>
      
      <div className="text-lg md:text-xl font-bold tracking-tight leading-none flex items-center">
        <span 
          className="inline-block relative"
          style={{
            fontFamily: '"SF Pro Display", "Inter", system-ui, sans-serif',
            fontWeight: 800,
            letterSpacing: '0.02em',
            background: `linear-gradient(135deg, 
              #ff6b35 0%, 
              #f7931e 25%, 
              #fbbf24 50%, 
              #f59e0b 75%, 
              #d97706 100%)`,
            backgroundSize: '200% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            transform: `translateY(${Math.sin(time * 0.015) * 1}px)`,
            animation: 'professional-gradient-small 6s ease-in-out infinite'
          }}
        >
          DREAM
        </span>
        
        <span 
          className="inline-block relative ml-1"
          style={{
            fontFamily: '"New York", "Times New Roman", serif',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#f8fafc',
            fontStyle: 'italic',
            textShadow: '0 0 20px rgba(248, 250, 252, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15)',
            transform: `skew(-${2 + Math.sin(time * 0.02) * 0.5}deg)`,
          }}
        >
          RIDE
        </span>
      </div>
    </div>
  );
}

// DreamRide Text Component (Large Version)
function DreamRideTextLarge() {
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex flex-col items-center">
      <style jsx>{`
        @keyframes professional-gradient {
          0%, 100% { 
            background-position: 0% 50%;
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15)) drop-shadow(0 0 30px rgba(255, 107, 53, 0.25));
          }
          50% { 
            background-position: 100% 50%;
            filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 40px rgba(255, 107, 53, 0.35));
          }
        }
      `}</style>
      
      <div className={`transition-all duration-1500 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        <div className="relative group text-center">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none flex items-center justify-center">
            <span 
              className="inline-block relative"
              style={{
                fontFamily: '"SF Pro Display", "Inter", system-ui, sans-serif',
                fontWeight: 800,
                letterSpacing: '0.02em',
                background: `linear-gradient(135deg, 
                  #ff6b35 0%, 
                  #f7931e 25%, 
                  #fbbf24 50%, 
                  #f59e0b 75%, 
                  #d97706 100%)`,
                backgroundSize: '200% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                transform: `translateY(${Math.sin(time * 0.015) * 3}px)`,
                animation: 'professional-gradient 6s ease-in-out infinite'
              }}
            >
              DREAM
            </span>
            
            <span 
              className="inline-block relative ml-4"
              style={{
                fontFamily: '"New York", "Times New Roman", serif',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#f8fafc',
                fontStyle: 'italic',
                textShadow: '0 0 40px rgba(248, 250, 252, 0.3), 0 4px 16px rgba(0, 0, 0, 0.2)',
                transform: `
                  skew(-${2 + Math.sin(time * 0.02) * 1}deg) 
                  scale(${1 + Math.sin(time * 0.018) * 0.02})
                `,
              }}
            >
              RIDE
            </span>
          </div>
        </div>

        <div className="relative mt-4 text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-medium tracking-wide flex items-center justify-center">
            <span 
              className="inline-block relative mr-3"
              style={{
                fontFamily: '"SF Mono", "Monaco", monospace',
                fontWeight: 500,
                letterSpacing: '0.3em',
                background: 'linear-gradient(45deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                transform: `translateY(${Math.cos(time * 0.025) * 2}px)`,
                opacity: 0.9
              }}
            >
              WITH
            </span>
            
            <span 
              className="inline-block relative"
              style={{
                fontFamily: '"Avenir Next", "Helvetica Neue", sans-serif',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#ffffff',
                textDecoration: 'underline',
                textDecorationColor: '#3b82f6',
                textDecorationThickness: '3px',
                textUnderlineOffset: '8px',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.25), 0 2px 12px rgba(0, 0, 0, 0.15)',
                transform: `
                  translateX(${Math.sin(time * 0.02) * 2}px)
                  scale(${1 + Math.cos(time * 0.022) * 0.02})
                `,
              }}
            >
              SUBHO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Particle System
function ParticleSystem() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      }));
    };

    setParticles(generateParticles());

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.5)`
          }}
        />
      ))}
    </div>
  );
}

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      <ParticleSystem />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0">
              <DreamRideTextSmall />
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Home</a>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Features</a>
              <a href="/portfolio" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Portfolio</a>
              <a href="/dashbord" className="text-gray-300 hover:text-white transition-colors duration-200 font-medium">Dashboard</a>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 shadow-lg">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-slate-800/95 backdrop-blur-lg rounded-lg mt-2 p-4 space-y-4">
              <a href="#home" className="block text-gray-300 hover:text-white transition-colors duration-200">Home</a>
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors duration-200">About</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full font-medium">
                Get Started
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <DreamRideTextLarge />
          </div>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            Experience the future of transportation with premium rides, 
            cutting-edge technology, and unmatched comfort.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center gap-2">
              Start Your Journey
              <ArrowRight className="group-hover:translate-x-1 transition-transform duration-200" size={20} />
            </button>
            <button className="px-8 py-4 border-2 border-white/20 rounded-full font-medium hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
              Learn More
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-400">Get where you need to go in record time with our optimized routing system.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">100% Secure</h3>
              <p className="text-gray-400">Your safety is our priority with verified drivers and real-time tracking.</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/10">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Premium Quality</h3>
              <p className="text-gray-400">Experience luxury with our fleet of premium vehicles and top-rated drivers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 border-t border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="mb-4">
                <DreamRideTextSmall />
              </div>
              <p className="text-gray-400 max-w-md">
                Revolutionizing transportation with premium rides, cutting-edge technology, and exceptional service.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">About Us</a>
                <a href="#" className="block hover:text-white transition-colors">Careers</a>
                <a href="#" className="block hover:text-white transition-colors">Press</a>
                <a href="#" className="block hover:text-white transition-colors">Blog</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <div className="space-y-2 text-gray-400">
                <a href="#" className="block hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block hover:text-white transition-colors">Safety</a>
                <a href="#" className="block hover:text-white transition-colors">Contact</a>
                <a href="#" className="block hover:text-white transition-colors">Legal</a>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2025 DreamRide. All rights reserved. Crafted with passion by Subho.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}