import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { TOGGLE_DARKMODE } from '../features/darkMode/darkModeSlice';
import lightLogo from '../assets/light_final.png';
import darkLogo from '../assets/dark_final.png';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const Header = () => {
  const darkMode = useSelector((state) => state.darkMode.value);
  const dispatch = useDispatch();

  return (
    <header className="bg-palette-2 dark:bg-palette-6 border-b border-palette-3 dark:border-palette-5 z-50">
      <nav className="mx-auto max-w-7xl flex items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:opacity-70"
        >
          <img
            src={darkMode ? darkLogo : lightLogo}
            alt="KanaQuest Logo"
            className="h-16 w-auto border-2 border-palette-3 dark:border-palette-5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:rotate-1"
            style={{
              boxShadow: darkMode 
                ? '0 10px 25px rgba(0,0,0,0.3), 0 0 20px rgba(255,255,255,0.1)' 
                : '0 10px 25px rgba(0,0,0,0.2), 0 0 20px rgba(66,100,122,0.2)'
            }}
          />
        </Link>
        {/* Log in and Sign Up Links and Dark Mode Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 font-bold">
          {/* Toggle dark mode */}
          <button
            type="button"
            className="hover:opacity-70"
            onClick={() => dispatch(TOGGLE_DARKMODE())}
          >
            {darkMode ? (
              <HiOutlineSun
                className="w-6 h-6"
              />
            ) : (
              <HiOutlineMoon
                className="w-6 h-6"
              />
            )}
          </button>
          <Link
            to="/login"
            className="py-2 px-4 hover:text-palette-1"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="py-2 px-4 text-palette-2 bg-palette-1 hover:bg-palette-5 rounded-xl"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
