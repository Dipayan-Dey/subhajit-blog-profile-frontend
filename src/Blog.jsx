import React, { useState, useEffect, useRef } from "react";
import photo1 from "./assets/photo1.jpeg"
import photo2 from "./assets/id2photo.jpeg"
import photo3 from "./assets/photo3.jpeg"
import bgvideo from "./assets/bg-portfolio.mp4"
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

import Logo from "./Logo";
import Header from "./Header";
import Footer from "./Footer";

// Particle System Component
const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? "#ff6b35" : "#ffffff",
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Connect nearby particles
        particlesRef.current.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.save();
              ctx.globalAlpha = ((100 - distance) / 100) * 0.1;
              ctx.strokeStyle = "#ff6b35";
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.stroke();
              ctx.restore();
            }
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Floating Elements Component
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating icons */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <Zap className="w-8 h-8 text-orange-500" />
      </div>
      <div className="absolute top-40 right-20 animate-float-delay opacity-20">
        <Flame className="w-6 h-6 text-red-500" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float-slow opacity-20">
        <Award className="w-10 h-10 text-yellow-500" />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute top-32 right-40 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute bottom-32 right-10 w-6 h-6 border-2 border-orange-500 rounded-full animate-spin-slow opacity-20"></div>
      <div className="absolute top-60 left-40 w-3 h-3 bg-white rotate-45 animate-bounce opacity-20"></div>
    </div>
  );
};

export default function Blog() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const featuredPosts = [
    {
  id: 1,
  title: "Chamak Dekho Jara: Ride with the 35T Beast 🔥",
  excerpt: "A thrilling glimpse of raw power and shine as the 35T roars down the road — made for those who ride with heart.",
  image: photo1,
  author: "Subhajit Samui",
  date: "Dec 12, 2024",
  readTime: "12 min",
  category: "Moto Vlog",
  views: "8.2K",
      videourl: "https://www.youtube.com/shorts/Yr_nccwDfcs",
    },
    {
      id: 2,
      title: "Beauty of Nature on Two Wheels 🌿🏍️",
      excerpt:
        "Experience the raw beauty of nature through the lens of a motorcycle journey — where every ride feels like a cinematic escape.",
      image:
       photo2,
      author: "Subhajit Samui",
      date: "Dec 12, 2024",
      readTime: "12 min",
      category: "Moto Vlogs",
      views: "8.2K",
      videourl: "https://www.youtube.com/shorts/HOxN1v7qImIYr_nccwDfcs",
    },
    {
     title: "Off-Roading Adventure with Thunderbird 35T 😎🔥",
  excerpt: "Conquer rugged trails and wild terrains with the powerful Thunderbird 35T — an off-road journey packed with thrill and style.",
  image:photo3,
  author: "Subhajit Samui",
  date: "Dec 12, 2024",
  readTime: "12 min",
  category: "Adventure Ride",
  views: "8.2K",
      videourl: "https://www.youtube.com/shorts/F6tvhvUtlj0",
    },
  ];

  const stats = [
    { number: 50, suffix: "K+", label: "Monthly Readers", icon: Users },
    { number: 500, suffix: "+", label: "Blog Posts", icon: Star },
    { number: 25, suffix: "+", label: "Countries Covered", icon: MapPin },
    { number: 10, suffix: "K+", label: "Community Members", icon: Flame },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-3deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 107, 53, 0.6);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hero-gradient {
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(255, 107, 53, 0.1) 100%
          );
        }
        @keyframes professional-gradient {
          0%,
          100% {
            background-position: 0% 50%;
            filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))
              drop-shadow(0 0 30px rgba(255, 107, 53, 0.25));
          }
          50% {
            background-position: 100% 50%;
            filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.2))
              drop-shadow(0 0 40px rgba(255, 107, 53, 0.35));
          }
        }
      `}</style>

      {/* Navigation */}
      {/* <Header /> */}

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: `scale(${1 + scrollY * 0.0002})` }}
          >
            <source src={bgvideo}/>
            {/* Fallback background image */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=1080&fit=crop')",
              }}
            />
          </video>
          
        </div>

        {/* Hero Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient z-10" />

        {/* Particle System */}
        <ParticleSystem />

        {/* Floating Elements */}
        <FloatingElements />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-3 xs:px-4 sm:px-6 max-w-6xl mx-auto" data-aos="fade-up" data-aos-anchor-placement="top-center"  data-aos-duration="2000" >
          {/* Main Heading - Improved mobile sizing */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight text-shadow">
            Born to
            <span className="block bg-gradient-to-r from-orange-500 via-red-600 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              RIDE
            </span>
          </h1>

          {/* Description - Better mobile text sizing */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-10 max-w-4xl mx-auto leading-relaxed text-shadow px-2 sm:px-0">
            Join the ultimate community of motorcycle enthusiasts sharing epic
            adventures, custom builds, and the freedom of the open road across
            all continents.
          </p>

          {/* Action Buttons - Improved mobile layout */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 mt-6 mb-4">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-6 py-3 rounded-full shadow-md hover:from-orange-600 hover:to-red-600 transition duration-300">
              Start Journey <span className="ml-2">&gt;</span>
            </button>
            
            <a href="https://youtube.com/@dreamridewithsubho?si=cYg4zNCEMXr0ONt9">

            <button className="cursor-pointer glass-morphism px-6 py-3 rounded-full font-bold text-white border border-white/30 backdrop-blur-md">
              <Play className="inline-block mr-2 w-4 h-4" />
              Watch Rides
            </button>
            </a>
          </div>

          {/* Quick Stats - Enhanced mobile grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-2 sm:px-0">
            {stats.slice(0, 4).map((stat, index) => (
              <div
                key={index}
                className="glass-morphism p-2 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl group hover:scale-105 transition-all duration-300"
              >
                <stat.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-orange-500 mb-1 sm:mb-2 mx-auto group-hover:animate-pulse" />
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-orange-400">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm text-gray-300 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Scroll Indicator - Mobile optimized */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <div className="w-5 h-10 sm:w-6 sm:h-12 border-2 border-orange-500 rounded-full flex justify-center relative overflow-hidden">
              <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-400 mt-1 sm:mt-2 text-center">
              <span className="hidden xs:inline">Scroll to explore</span>
              <span className="xs:hidden">Scroll</span>
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up" data-aos-anchor-placement="top-center"  data-aos-duration="2000">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-shadow">
              Join the{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Revolution
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Thousands of riders worldwide trust our platform for the best
              motorcycle content and community.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group text-center p-6 glass-morphism rounded-3xl hover:scale-110 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transform: `translateY(${
                    Math.sin(index + scrollY * 0.01) * 10
                  }px)`,
                }}
              >
                <stat.icon className="w-12 h-12 text-orange-500 mb-4 mx-auto group-hover:animate-spin transition-all duration-500" />
                <div className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent mb-3">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 font-semibold text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Posts */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up" data-aos-anchor-placement="top-center"  data-aos-duration="2000">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-shadow">
              Latest{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Adventures
              </span>
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
              Discover incredible stories from the road, detailed bike reviews,
              and custom build showcases from our passionate community of
              riders.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredPosts.map((post, index) => (
              <article
                key={post.id}
                className={`group cursor-pointer transform hover:scale-105 transition-all duration-500 ${
                  activeCard === post.id ? "scale-105" : ""
                }`}
                onMouseEnter={() => setActiveCard(post.id)}
                onMouseLeave={() => setActiveCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-3xl mb-6 aspect-video group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-500">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-bold rounded-full shadow-lg">
                      {post.category}
                    </span>
                  </div>

                  {/* Views Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-3 py-1 glass-morphism text-white text-sm font-semibold rounded-full">
                      👁️ {post.views}
                    </span>
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <a href={post.videourl}>
                        <Play className="w-6 h-6 text-white ml-1" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-orange-500 transition-colors duration-300 line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full text-xs">
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="https://youtube.com/@dreamridewithsubho?si=cYg4zNCEMXr0ONt9">
            <button className="group glass-morphism border-2 border-orange-500 text-orange-500 px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-500 hover:text-black transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/30">
              View All Posts
              <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Community Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up" data-aos-anchor-placement="top-center"  data-aos-duration="2000">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <div className="p-4 glass-morphism rounded-full">
                <Users className="w-16 h-16 text-orange-500 animate-pulse" />
              </div>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-shadow">
              Join the{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Brotherhood
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Connect with passionate riders from around the globe. Share your
              epic stories, get expert advice, and plan your next adventure with
              fellow enthusiasts who live and breathe motorcycles.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: MapPin,
                  title: "Route Sharing",
                  description:
                    "Discover and share the most scenic riding routes, hidden gems, and must-visit destinations worldwide",
                },
                {
                  icon: Calendar,
                  title: "Group Rides",
                  description:
                    "Join organized rides, meetups, and motorcycle events in your area with like-minded riders",
                },
                {
                  icon: Star,
                  title: "Expert Advice",
                  description:
                    "Get professional tips from experienced riders, certified mechanics, and industry professionals",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 glass-morphism rounded-3xl hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:shadow-orange-500/20"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    transform: `translateY(${
                      Math.sin(index + scrollY * 0.005) * 5
                    }px)`,
                  }}
                >
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full group-hover:animate-spin transition-all duration-500">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-500 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <a href="/contact" rel="noopener noreferrer">
              <button className="cursor-pointer group relative bg-gradient-to-r from-orange-500 to-red-600 px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6 rounded-full font-bold text-sm sm:text-xl lg:text-xl hover:scale-110 transform transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/40 overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">
                  <span className="hidden sm:inline">
                    Join Community - Free
                  </span>
                  <span className="sm:hidden">Join Community - Free</span>
                  <Flame className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
                </span>
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-aos="fade-up" data-aos-anchor-placement="top-center"  data-aos-duration="2000">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-shadow">
              Never Miss an{" "}
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Adventure
              </span>
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-12 leading-relaxed">
              Get the latest epic stories, exclusive bike reviews, riding tips,
              and early access to our premium content delivered straight to your
              inbox every week.
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 p-2 justify-center items-center">
                {/* <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-8 py-4 bg-transparent border-none focus:outline-none text-white placeholder-gray-400 text-lg"
                /> */}
                <a
                  href="https://youtube.com/@dreamridewithsubho?si=cYg4zNCEMXr0ONt9"
                  terget="_blank"
                >
                  <button className="cursor-pointer group bg-gradient-to-r from-orange-500 to-red-600 px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 whitespace-nowrap">
                    <span className="flex items-center">
                      Subscribe Now
                      <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                </a>
              </div>

              <p className="text-gray-500 text-sm mt-4">
                🔒 100% Privacy Guaranteed. Unsubscribe anytime with one click.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-60">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm">50K+ Happy Subscribers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span className="text-sm">Weekly Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-green-500" />
                <span className="text-sm">Premium Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      {/* <Footer /> */}
    </div>
  );
}
