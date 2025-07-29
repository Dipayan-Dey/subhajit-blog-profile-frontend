import React, { useState, useRef, useEffect } from 'react';
import { Send, Upload, User, Mail, Phone, MessageSquare, Hash, Instagram, Check, X } from 'lucide-react';
import axios from "axios";
import {getData} from "./Admin/Admin"
  import { ToastContainer, toast } from 'react-toastify';

const AnimatedContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    socialHandle: ''
    // contactMethod: 'email',
    // attachment: null
  });

  const [focusedField, setFocusedField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [particles, setParticles] = useState([]);
  const fileInputRef = useRef(null);

  // Generate particles on component mount
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'][Math.floor(Math.random() * 10)],
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * 360
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData(prev => ({ ...prev, attachment: file }));
  //   }
  // };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    
    if (!validateForm()) {return}

  //   const obj = {
  //   fullName: formData.fullName,
  //   email: formData.email,
  //   phone: formData.phone,
  //   subject: formData.subject,
  //   message: formData.message,
  //   socialHandle: formData.socialHandle
  //   // contactMethod: formData.contactMethod,
  //   // attachment: formData.attachment
  // };
    axios
        .post("https://subhajit-blog-profile-backend.onrender.com/subhajit/profile/insert", formData)
        .then((res) => {
          console.log(res.data);
          // alert("Form Saved");
       toast.success("Data Send Successfully..");
       getData()
          // setFormData({
          //   username: "",
          //   email: "",
          //   phoneNumber: "",
          //   message: "",
          // });
          // getData();
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error while saving form!");
          // alert("Error while saving form");
        });

  // console.log("Form Data Object:", obj);
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        socialHandle: '',
        // contactMethod: 'email',
        // attachment: null
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 3000);
  };

  const subjectOptions = [
    'Collaboration', 'Event Invite', 'Feedback', 'Business Inquiry', 'Support', 'Other'
  ];

  if (isSubmitted) {
    return (
      <div className=" min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        {/* Animated Background Shapes */}<ToastContainer/>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        
        {/* Success Message */}
        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="bg-black/30 backdrop-blur-2xl rounded-3xl p-8 text-center border border-white/10 shadow-2xl transform animate-bounce">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-slow shadow-lg">
              <Check className="w-10 h-10 text-white animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">Message Sent! 🚀</h2>
            <p className="text-white/80 text-lg">Thanks for reaching out! I'll get back to you soon.</p>
            <div className="mt-4 flex justify-center space-x-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              animation: `float ${particle.speed * 3 + 2}s ease-in-out infinite alternate, glow 2s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Animated Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse"></div>
        <div className="absolute top-60 right-10 w-80 h-80 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-60 w-96 h-96 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse animation-delay-4000"></div>
        <div className="absolute top-0 left-1/2 w-64 h-64 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-pulse animation-delay-1000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>

      <div className="relative z-10 p-4 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                Let's Connect! ✨
              </h1>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-1000"></div>
            </div>
            <p className="text-white/80 text-xl bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text">Drop me a message and let's make something awesome together</p>
          </div>

          {/* Form */}
          <div className="bg-black/20 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-white/10 space-y-6 relative overflow-hidden">
            {/* Form Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl"></div>
            
            {/* Name Field */}
            <div className="relative group z-10">
              <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-500 ${
                focusedField === 'fullName' 
                  ? 'border-pink-400 bg-gradient-to-r from-pink-500/20 to-rose-500/20 shadow-xl transform scale-105 shadow-pink-500/25' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <User className={`w-5 h-5 transition-all duration-500 ${
                  focusedField === 'fullName' ? 'text-pink-400 animate-pulse' : 'text-white/60'
                }`} />
                <div className="flex-1">
                  <label className="block text-white/90 text-sm font-medium mb-1">What's your name? *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField('')}
                    placeholder="John Doe"
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-lg"
                  />
                </div>
                {focusedField === 'fullName' && <div className="absolute -right-1 -top-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>}
              </div>
              {errors.fullName && (
                <p className="text-red-400 text-sm mt-1 flex items-center animate-shake">
                  <X className="w-4 h-4 mr-1" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative group z-10">
              <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-500 ${
                focusedField === 'email' 
                  ? 'border-blue-400 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 shadow-xl transform scale-105 shadow-blue-500/25' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <Mail className={`w-5 h-5 transition-all duration-500 ${
                  focusedField === 'email' ? 'text-blue-400 animate-pulse' : 'text-white/60'
                }`} />
                <div className="flex-1">
                  <label className="block text-white/90 text-sm font-medium mb-1">Where can I reach you back? *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    placeholder="john@example.com"
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-lg"
                  />
                </div>
                {focusedField === 'email' && <div className="absolute -right-1 -top-1 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center animate-shake">
                  <X className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative group z-10">
              <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-500 ${
                focusedField === 'phone' 
                  ? 'border-emerald-400 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 shadow-xl transform scale-105 shadow-emerald-500/25' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <Phone className={`w-5 h-5 transition-all duration-500 ${
                  focusedField === 'phone' ? 'text-emerald-400 animate-pulse' : 'text-white/60'
                }`} />
                <div className="flex-1">
                  <label className="block text-white/90 text-sm font-medium mb-1">Got a number I can call or WhatsApp?</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField('')}
                    placeholder="+1 (555) 123-4567"
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-lg"
                  />
                </div>
                {focusedField === 'phone' && <div className="absolute -right-1 -top-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>}
              </div>
            </div>

            {/* Subject Field */}
            <div className="relative group z-10">
              <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-500 ${
                focusedField === 'subject' 
                  ? 'border-yellow-400 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 shadow-xl transform scale-105 shadow-yellow-500/25' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <Hash className={`w-5 h-5 transition-all duration-500 ${
                  focusedField === 'subject' ? 'text-yellow-400 animate-pulse' : 'text-white/60'
                }`} />
                <div className="flex-1">
                  <label className="block text-white/90 text-sm font-medium mb-1">What's this message about? *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField('')}
                    className="w-full bg-transparent border-none outline-none text-white text-lg"
                  >
                    <option value="" className="bg-gray-900">Choose a subject...</option>
                    {subjectOptions.map(option => (
                      <option key={option} value={option} className="bg-gray-900">{option}</option>
                    ))}
                  </select>
                </div>
                {focusedField === 'subject' && <div className="absolute -right-1 -top-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>}
              </div>
              {errors.subject && (
                <p className="text-red-400 text-sm mt-1 flex items-center animate-shake">
                  <X className="w-4 h-4 mr-1" />
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Social Handle */}
            <div className="relative group z-10">
              <div className={`flex items-center space-x-3 p-4 rounded-2xl border-2 transition-all duration-500 ${
                focusedField === 'socialHandle' 
                  ? 'border-pink-400 bg-gradient-to-r from-pink-500/20 to-purple-500/20 shadow-xl transform scale-105 shadow-pink-500/25' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <Instagram className={`w-5 h-5 transition-all duration-500 ${
                  focusedField === 'socialHandle' ? 'text-pink-400 animate-pulse' : 'text-white/60'
                }`} />
                <div className="flex-1">
                  <label className="block text-white/90 text-sm font-medium mb-1">Wanna drop your IG or social link?</label>
                  <input
                    type="text"
                    name="socialHandle"
                    value={formData.socialHandle}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('socialHandle')}
                    onBlur={() => setFocusedField('')}
                    placeholder="@yourhandle or https://..."
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-lg"
                  />
                </div>
                {focusedField === 'socialHandle' && <div className="absolute -right-1 -top-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>}
              </div>
            </div>

            {/* Contact Method */}
            {/* <div className="space-y-3 z-10 relative">
              <label className="block text-white/90 text-sm font-medium">Preferred Contact Method</label>
              <div className="flex space-x-6">
                {['email', 'call', 'dm'].map(method => (
                  <label key={method} className="flex items-center space-x-3 cursor-pointer group">
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={formData.contactMethod === method}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`relative w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                      formData.contactMethod === method 
                        ? 'border-purple-400 bg-gradient-to-r from-purple-400 to-pink-400 shadow-lg shadow-purple-400/50' 
                        : 'border-white/30 group-hover:border-purple-300 group-hover:shadow-md'
                    }`}>
                      {formData.contactMethod === method && (
                        <>
                          <div className="absolute inset-1 bg-white rounded-full animate-ping opacity-75"></div>
                          <div className="absolute inset-1 bg-white rounded-full"></div>
                        </>
                      )}
                    </div>
                    <span className="text-white/80 capitalize font-medium">{method === 'dm' ? 'DM' : method}</span>
                  </label>
                ))}
              </div>
            </div> */}

            {/* File Upload */}
            {/* <div className="relative group z-10">
              <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 bg-gradient-to-r from-white/5 to-white/10 hover:border-white/40 hover:from-white/10 hover:to-white/15 transition-all duration-300 group-hover:scale-105">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="sr-only"
                  id="attachment"
                />
                <label htmlFor="attachment" className="cursor-pointer flex items-center justify-center space-x-3">
                  <Upload className="w-6 h-6 text-white/60 group-hover:text-white/80 transition-colors duration-300" />
                  <span className="text-white/80 text-lg">
                    {formData.attachment ? formData.attachment.name : 'Upload attachment (optional)'}
                  </span>
                </label>
                <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
              </div>
            </div> */}

            {/* Message Field */}
            <div className="relative group z-10">
              <div className={`flex items-start space-x-3 p-4 rounded-2xl border-2 transition-all duration-500 ${
                focusedField === 'message' 
                  ? 'border-purple-400 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 shadow-xl transform scale-105 shadow-purple-500/25' 
                  : 'border-white/20 bg-white/5 hover:bg-white/10'
              }`}>
                <MessageSquare className={`w-5 h-5 mt-1 transition-all duration-500 ${
                  focusedField === 'message' ? 'text-purple-400 animate-pulse' : 'text-white/60'
                }`} />
                <div className="flex-1">
                  <label className="block text-white/90 text-sm font-medium mb-1">Tell me more about what's on your mind! *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField('')}
                    placeholder="I'd love to collaborate on..."
                    rows="4"
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-lg resize-none"
                  />
                </div>
                {focusedField === 'message' && <div className="absolute -right-1 -top-1 w-3 h-3 bg-purple-400 rounded-full animate-ping"></div>}
              </div>
              {errors.message && (
                <p className="text-red-400 text-sm mt-1 flex items-center animate-shake">
                  <X className="w-4 h-4 mr-1" />
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`relative w-full p-5 rounded-2xl font-bold text-xl transition-all duration-500 flex items-center justify-center space-x-3 overflow-hidden ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 hover:scale-105 hover:shadow-2xl shadow-purple-500/50 group'
              } text-white z-10`}
            >
              {!isSubmitting && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
              
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Sending...</span>
                  <div className="flex space-x-1">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <Send className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
                  <span>Send Message 🚀</span>
                  <div className="absolute right-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glow {
          from { box-shadow: 0 0 5px currentColor; }
          to { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </div>
  );
};

export default AnimatedContactForm;
