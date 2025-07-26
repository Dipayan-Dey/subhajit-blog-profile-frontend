import { useState, useEffect } from 'react';

export default function DreamRideText() {
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
    <div className="inline-flex items-center">
      
      {/* CSS Animations */}
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
      {/* Main Content */}
      <div className={`transition-all duration-1500 ease-out ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
        
        {/* Primary Brand: DREAMRIDE */}
        <div className="relative group">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-none flex items-center">
            
            {/* DREAM - Modern Professional */}
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
                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15)) drop-shadow(0 0 30px rgba(255, 107, 53, 0.25))',
                transform: `translateY(${Math.sin(time * 0.015) * 2}px)`,
                animation: 'professional-gradient 6s ease-in-out infinite'
              }}
            >
              DREAM
            </span>
            
            {/* RIDE - Elegant Serif */}
            <span 
              className="inline-block relative ml-2"
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
                filter: 'brightness(1.05)'
              }}
            >
              RIDE
            </span>
          </div>
        </div>

        {/* Secondary Text: WITH SUBHO */}
        <div className="relative ml-4">
          <div className="text-sm sm:text-base md:text-lg font-medium tracking-wide flex items-center">
            
            {/* WITH - Clean Modern */}
            <span 
              className="inline-block relative mr-2"
              style={{
                fontFamily: '"SF Mono", "Monaco", monospace',
                fontWeight: 500,
                letterSpacing: '0.3em',
                background: 'linear-gradient(45deg, #64748b 0%, #94a3b8 50%, #cbd5e1 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))',
                transform: `translateY(${Math.cos(time * 0.025) * 1.5}px)`,
                opacity: 0.9
              }}
            >
              WITH
            </span>
            
            {/* SUBHO - Premium Brand */}
            <span 
              className="inline-block relative"
              style={{
                fontFamily: '"Avenir Next", "Helvetica Neue", sans-serif',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: '#ffffff',
                textDecoration: 'underline',
                textDecorationColor: '#3b82f6',
                textDecorationThickness: '2px',
                textUnderlineOffset: '6px',
                textShadow: '0 0 30px rgba(255, 255, 255, 0.25), 0 2px 12px rgba(0, 0, 0, 0.15)',
                transform: `
                  translateX(${Math.sin(time * 0.02) * 1}px)
                  scale(${1 + Math.cos(time * 0.022) * 0.015})
                `,
                filter: `brightness(${1 + Math.sin(time * 0.03) * 0.05})`
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