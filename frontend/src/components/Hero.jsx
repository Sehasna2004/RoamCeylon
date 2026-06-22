import React, { useState, useEffect } from 'react';

// This looks directly into your frontend/public folder!
const bgImages = [
  "/ellanew.png",
  "/sigiriyanew.png",
  "/gallenew.png"
];

function Hero() {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative h-[85vh] flex items-center justify-center overflow-hidden pt-16">
      {bgImages.map((imgUrl, index) => (
        <div
          key={imgUrl}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transform duration-[2000ms]`}
          style={{ backgroundImage: `url('${imgUrl}')` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/85 via-slate-900/75 to-blue-900/80 mix-blend-multiply" />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6 space-y-6">
        <span className="text-blue-400 font-bold uppercase tracking-widest text-sm bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-400/20">
          Welcome to Paradise
        </span>
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-md">
          Explore the Pearl of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">Indian Ocean</span>
        </h2>
        <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
          From ancient structural wonders like Sigiriya to misty colonial bungalows in Nuwara Eliya and pristine gold cabanas in Mirissa.
        </p>
        <div className="pt-4">
          <button className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition transform hover:-translate-y-0.5 tracking-wide text-sm">
            Start Exploring
          </button>
        </div>
      </div>
    </header>
  );
}

export default Hero;