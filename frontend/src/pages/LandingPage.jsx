import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <Hero />
      {/* Future sections like our MongoDB Accommodations Grid will go right down here! */}
    </div>
  );
}

export default LandingPage;