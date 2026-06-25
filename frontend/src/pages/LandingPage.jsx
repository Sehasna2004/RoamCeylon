import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AuthModal from '../components/AuthModal';

function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      <Navbar onLoginClick={() => setIsAuthOpen(true)} />
      <Hero />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default LandingPage;