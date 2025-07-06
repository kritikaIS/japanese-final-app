import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { socialLinks } from '../constants/constants';
import Auth from '../utils/auth';
import { useSelector } from 'react-redux';
import lightLogo from '../assets/light_final.png';
import darkLogo from '../assets/dark_final.png';

import { FaHeart, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Footer = () => {
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';
  const darkMode = useSelector((state) => state.darkMode.value);

  return (
    <footer className="bg-palette-1/10 dark:bg-palette-6/20 border-t border-palette-3/20 dark:border-palette-5/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <img
                src={darkMode ? darkLogo : lightLogo}
                alt="KanaQuest Logo"
                className="h-8 w-auto border border-palette-3 dark:border-palette-5 rounded-full shadow-md"
              />
            </div>
            <p className="text-palette-5 dark:text-palette-3 text-sm text-center md:text-left">
              Master Japanese characters with interactive learning
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              to="/dashboard" 
              className="text-palette-5 dark:text-palette-3 hover:text-palette-1 dark:hover:text-palette-2 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              to="/characters" 
              className="text-palette-5 dark:text-palette-3 hover:text-palette-1 dark:hover:text-palette-2 transition-colors duration-200"
            >
              Characters
            </Link>
            <Link 
              to="/profile" 
              className="text-palette-5 dark:text-palette-3 hover:text-palette-1 dark:hover:text-palette-2 transition-colors duration-200"
            >
              Profile
            </Link>
            <Link 
              to="/leaderboards" 
              className="text-palette-5 dark:text-palette-3 hover:text-palette-1 dark:hover:text-palette-2 transition-colors duration-200"
            >
              Leaderboards
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/kritikaIS" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-palette-5 dark:text-palette-3 hover:text-palette-1 dark:hover:text-palette-2 hover:bg-palette-2/50 dark:hover:bg-palette-5/20 rounded-lg transition-all duration-200"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a 
              href="mailto:kritikavaryani2027@gmail.com" 
              className="p-2 text-palette-5 dark:text-palette-3 hover:text-palette-1 dark:hover:text-palette-2 hover:bg-palette-2/50 dark:hover:bg-palette-5/20 rounded-lg transition-all duration-200"
            >
              <HiOutlineMail className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-2 pt-4 border-t border-palette-3/20 dark:border-palette-5/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-palette-5 dark:text-palette-3">
            <span>© 2025 KanaQuest. Made with</span>
            <FaHeart className="text-red-500 w-4 h-4" />
            <span>for Japanese learners</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-palette-5 dark:text-palette-3">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
