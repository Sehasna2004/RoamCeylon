import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm px-6 py-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center">
      <h1 className="text-2xl font-black text-blue-600 tracking-wide">RoamCeylon</h1>
      <div className="hidden md:flex space-x-8 text-slate-600 font-semibold text-sm tracking-wide">
        <a href="#" className="hover:text-blue-600 transition duration-300">Destinations</a>
        <a href="#" className="hover:text-blue-600 transition duration-300">Hotels & Cabanas</a>
        <a href="#" className="hover:text-blue-600 transition duration-300">About Sri Lanka</a>
      </div>
    </nav>
  );
}

export default Navbar;