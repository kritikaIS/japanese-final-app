import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import countryLogo from '../assets/japan-removebg-preview.png';
import bgClouds from '../assets/endless-clouds.svg';
import waves from '../assets/waves.svg';
import wavesWhite from '../assets/wavewhite-removebg-preview.png';
import Auth from '../utils/auth';

const features = [
  {
    title: 'Interactive Quizzes',
    desc: 'Test your knowledge with dynamic quizzes and instant feedback.',
    icon: '📝',
  },
  {
    title: 'Track Progress',
    desc: 'Monitor your learning journey and celebrate achievements.',
    icon: '📈',
  },
  {
    title: 'Comprehensive Lessons',
    desc: 'Learn Hiragana, Katakana, Kanji, and vocabulary step by step.',
    icon: '📚',
  },
  {
    title: 'Leaderboard',
    desc: 'Compete with others and climb the ranks as you learn.',
    icon: '🏆',
  },
];

const Home = () => {
  const loggedIn = Auth.loggedIn();
  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="hero-bg min-h-screen w-full flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-16 md:py-24 gap-12 w-full z-10">
        {/* Hero Content */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-8 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-palette-5 dark:text-palette-2 leading-tight drop-shadow-xl">
            Master Japanese<br />
            <span className="text-palette-1 dark:text-palette-3">with KanaQuest</span>
          </h1>
          <p className="max-w-lg text-lg md:text-xl text-palette-1 dark:text-palette-3 font-medium">
            Unlock your language potential with interactive lessons, quizzes, and real progress tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start">
            <Link
              to="/signup"
              className="px-8 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-palette-4 to-palette-1 text-palette-2 focus:outline-none focus:ring-4 focus:ring-palette-4/40 transition-all duration-200 hover:from-palette-1 hover:to-palette-4 hover:scale-105"
            >
              Start Learning
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-full font-bold text-lg border-2 border-palette-1 dark:border-palette-4 bg-white dark:bg-palette-6 text-palette-1 dark:text-palette-2 shadow-md focus:outline-none focus:ring-2 focus:ring-palette-4/30 transition-all duration-200 hover:scale-105 hover:border-palette-1"
            >
              Log In
            </Link>
          </div>
        </div>
        {/* Hero Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative bg-white/80 dark:bg-palette-6/80 rounded-full shadow-2xl p-4 md:p-8 border-4 border-palette-3 dark:border-palette-5">
            <img
              src={countryLogo}
              alt="Japan Logo"
              className="w-56 h-56 md:w-80 md:h-80 object-contain drop-shadow-2xl animate-float"
            />
            <div className="absolute -inset-2 rounded-full border-4 border-palette-4 dark:border-palette-3 opacity-30 animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 pt-4 pb-12 w-full z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-palette-1 dark:text-palette-2 mb-8 text-center">Why KanaQuest?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white dark:bg-palette-6 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-palette-3 dark:border-palette-5 hover:scale-105 transition-transform">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold text-palette-1 dark:text-palette-2 mb-2">{feature.title}</h3>
              <p className="text-palette-5 dark:text-palette-3 text-base">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Wavy Footer removed; wave is now part of hero-bg */}
    </div>
  );
};

// Advanced CSS animation for floating effect
// Add this to your global CSS (e.g., index.css):
// .animate-float { animation: float 3s ease-in-out infinite alternate; }
// @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-16px); } }
// .animate-pulse-slow { animation: pulse 4s cubic-bezier(0.4,0,0.6,1) infinite; }
// @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }

export default Home;
