import React, { useState } from 'react';
import { 
  Compass, 
  Hotel, 
  MapPin, 
  ShieldCheck, 
  ArrowUpRight, 
  Award, 
  Globe, 
  Users, 
  Phone, 
  Mail, 
  Clock 
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AuthModal from '../components/AuthModal';

function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-x-hidden">
      {/* Existing Functional Elements */}
      <Navbar onLoginClick={() => setIsAuthOpen(true)} />
      <Hero />

      {/* Modern Asymmetrical About Us Section */}
      <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50">
        
        {/* Subtle Decorative Background Mesh */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none -z-10">
          <div className="absolute top-0 right-10 w-72 h-72 bg-blue-200/50 rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 left-5 w-96 h-96 bg-emerald-100/60 rounded-full filter blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="mb-16 max-w-3xl">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-blue-700 font-bold uppercase tracking-widest text-[10px] md:text-xs">
              Who We Are
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Crafting Unforgettable <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Island Escapes</span>
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full mt-4" />
        </div>

        {/* Two-Column Modern Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Interactive Stats & Badges */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm relative group hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900">9-Provinces</p>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Deep Island Coverage</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm relative group hover:-translate-y-1 transition duration-300 mt-6 lg:mt-12">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-xl mb-4">
                <Hotel className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900">Premium</p>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Verified Stays</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm relative group hover:-translate-y-1 transition duration-300">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 flex items-center justify-center rounded-xl mb-4">
                <Award className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900">100%</p>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Local Curation</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200/50 shadow-sm relative group hover:-translate-y-1 transition duration-300 mt-6 lg:mt-12">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 flex items-center justify-center rounded-xl mb-4">
                <Users className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-slate-900">Global</p>
              <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">Traveler Standard</p>
            </div>
          </div>

          {/* Right Block: Content Panels */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed">
              <p className="font-medium text-slate-800 text-xl leading-snug border-l-4 border-emerald-500 pl-4">
                RoamCeylon is your trusted guide to exploring the beauty, culture, and heritage of Sri Lanka. Designed for both local and international travelers, our platform brings together detailed insights into the island's most captivating destinations.
              </p>
              <p>
                Whether you're searching for golden beaches, scenic mountains, ancient heritage sites, wildlife experiences, or vibrant cities, RoamCeylon helps you discover destinations that match your travel interests. You can also search, compare, and book hotels, resorts, villas, guesthouses, and homestays based on your budget, preferences, and desired amenities.
              </p>
            </div>

            {/* Glowing Mission Statement Card */}
            <div className="relative p-6 bg-gradient-to-br from-slate-900 to-slate-850 text-white rounded-2xl shadow-xl overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 text-slate-800 opacity-20 pointer-events-none group-hover:scale-110 transition duration-500">
                <Compass className="w-40 h-40" />
              </div>
              <span className="text-[10px] uppercase font-black tracking-widest bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/30">
                Our Mission
              </span>
              <p className="mt-4 text-slate-200 font-medium leading-relaxed italic text-base md:text-lg relative z-10">
                "Our mission is to make travel planning simple by combining destination discovery with convenient accommodation booking, allowing every traveler to experience the very best of Sri Lanka with confidence."
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold tracking-wider">
                <span>DISCOVER SRI LANKA • FIND YOUR PERFECT STAY</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Services / Platform Offerings Feature Strip */}
        <div className="mt-24 pt-12 border-t border-slate-200/60">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Platform Core Ecosystem</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">What you expect to experience with our framework</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md transition group">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-1.5 text-base">Destination Discovery</h4>
              <p className="text-sm text-slate-500 leading-normal">
                Explore golden beaches, pristine mountain environments, and rich cultural heritage spots seamlessly.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md transition group">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110">
                <Hotel className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-1.5 text-base">Flexible Stays</h4>
              <p className="text-sm text-slate-500 leading-normal">
                Compare and book hotels, boutique villas, scenic cabanas, and local guesthouses instantly.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md transition group">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-1.5 text-base">Tailored Searches</h4>
              <p className="text-sm text-slate-500 leading-normal">
                Filter out accommodations based exactly on your direct personal budget, locations, and amenities.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200/50 rounded-2xl shadow-sm hover:shadow-md transition group">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4 transition group-hover:scale-110">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-slate-900 mb-1.5 text-base">Confident Planning</h4>
              <p className="text-sm text-slate-500 leading-normal">
                Verified operational data points helping you structure schedules across Sri Lanka easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Most Modern Contact & Info Footer Section */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
                RC
              </div>
              <span className="text-xl font-black tracking-tight text-white">Roam<span className="text-blue-500">Ceylon</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Your comprehensive getaway gateway for discovering localized hotspots and premium accommodation spaces throughout Sri Lanka.
            </p>
            
            {/* Inline SVGs used directly for pure reliability across build environments */}
            <div className="flex items-center space-x-4 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-pink-600 text-slate-300 hover:text-white rounded-lg transition duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-sky-500 text-slate-300 hover:text-white rounded-lg transition duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore More</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#" className="hover:text-white transition duration-150">Destinations</a>
              <a href="#" className="hover:text-white transition duration-150">Hotels & Cabanas</a>
              <a href="#" className="hover:text-white transition duration-150">About Sri Lanka</a>
              <a href="#" className="hover:text-white transition duration-150">Privacy Policy</a>
              <a href="#" className="hover:text-white transition duration-150">Terms of Service</a>
              <a href="#" className="hover:text-white transition duration-150">Support Center</a>
            </div>
          </div>

          {/* Column 3: Contact Channels (Sri Lankan Numbers & Email) */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <a href="tel:+94112345678" className="hover:text-white block transition">+94 (0) 11 234 5678</a>
                  <a href="tel:+94771234567" className="hover:text-white block transition">+94 (0) 77 123 4567</a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="mailto:info@roamceylon.com" className="hover:text-white transition">info@roamceylon.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                <span className="text-slate-400">
                  Mon - Sat: 8:30 AM - 5:30 PM <br />
                  <span className="text-xs text-slate-500">(GMT +5:30)</span>
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RoamCeylon. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Designed elegantly for global explorers.</p>
        </div>
      </footer>

      {/* Auth State Management Overlay */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default LandingPage;