import React from 'react';

function Navbar({ onLoginClick }) {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm px-6 py-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
      {/* Unique Custom Logo Wrapper */}
      <div className="flex items-center space-x-2.5 group cursor-pointer">
        {/* Animated Tropical Map Pin Icon */}
        <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl shadow-md shadow-blue-500/20 transform group-hover:rotate-6 transition duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2.5} 
            stroke="white" 
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span className="absolute inset-0 rounded-xl border border-white/30 scale-90 group-hover:scale-110 transition duration-300"></span>
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black text-slate-800 tracking-tight">
            Roam<span className="text-blue-600 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">Ceylon</span>
          </span>
          <span className="text-[10px] font-bold text-sky-500 tracking-widest uppercase mt-0.5 pl-0.5">
            Island Escapes
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-slate-600 font-semibold text-sm tracking-wide">
        <a href="#" className="hover:text-blue-600 transition duration-300">Destinations</a>
        <a href="#" className="hover:text-blue-600 transition duration-300">Hotels & Cabanas</a>
        <a href="#" className="hover:text-blue-600 transition duration-300">About Sri Lanka</a>
      </div>

      {/* Right Side Action Profile CTA */}
      <div>
        <button 
          onClick={onLoginClick}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-0.5"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;