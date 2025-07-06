import { NavLink } from 'react-router-dom';
import Auth from '../utils/auth';
// import useSelector and useDispatch hooks from react-redux to access state and dispatch actions
import { useSelector, useDispatch } from 'react-redux';
// import darkmode action
import { TOGGLE_DARKMODE } from '../features/darkMode/darkModeSlice';

import logo from '../assets/SakuraStudyLogo.svg';
import lightLogo from '../assets/light_final.png';
import darkLogo from '../assets/dark_final.png';
import { sidebarNavItems } from '../constants/constants';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

const Sidebar = () => {
  // get darkmode state from store
  const darkMode = useSelector((state) => state.darkMode.value);
  // get dispatch function from useDispatch hook
  const dispatch = useDispatch();

  return (
    <aside
      id="sidebar"
      className="hidden sm:flex flex-col items-center xl:items-start fixed z-30 w-full h-full min-h-full max-w-[88px] xl:max-w-[300px] p-6 px-4 bg-gradient-to-b from-palette-1/95 to-palette-2/90 dark:from-palette-6/95 dark:to-palette-5/90 backdrop-blur-sm border-r-2 border-palette-3/30 dark:border-palette-5/50 shadow-lg"
    >
      {/* Logo */}
      <NavLink
        to="/dashboard"
        className="w-fit xl:px-4 flex items-center gap-3 hover:opacity-70 transition-all duration-300 p-3 rounded-xl hover:bg-white/10 dark:hover:bg-black/10"
      >
        {/* Show dark mode logo if dark mode is enabled */}
        <img
          src={darkMode ? darkLogo : lightLogo}
          alt="KanaQuest Logo"
          className="w-auto h-16 sidebar-text drop-shadow-sm border border-palette-3 dark:border-palette-5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform hover:rotate-1"
          style={{
            boxShadow: darkMode 
              ? '0 5px 15px rgba(0,0,0,0.3), 0 0 10px rgba(255,255,255,0.1)' 
              : '0 5px 15px rgba(0,0,0,0.2), 0 0 10px rgba(66,100,122,0.2)'
          }}
        />
      </NavLink>

      {/* Navigation Links */}
      <nav className="w-full mt-8 flex flex-col justify-between gap-3">
        {sidebarNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className="sidebar-btn-modern group"
          >
            <div className="sidebar-btn-icon-wrapper">
              {item.icon}
            </div>
            <span className="sidebar-text group-hover:translate-x-1 transition-transform duration-200">{item.title}</span>
          </NavLink>
        ))}

        {/* Divider */}
        <div className="my-4 border-t border-palette-3/20 dark:border-palette-5/20"></div>

        {/* Dark Mode Button */}
        <button
          type="button"
          className="sidebar-btn-modern group"
          // dispatch toggleDarkmode action when button is clicked
          onClick={() => dispatch(TOGGLE_DARKMODE(darkMode))}
        >
          <div className="sidebar-btn-icon-wrapper">
            {darkMode ? <HiOutlineSun className="sidebar-btn-icon" /> : <HiOutlineMoon className="sidebar-btn-icon" />}
          </div>
          <span className="sidebar-text group-hover:translate-x-1 transition-transform duration-200">{darkMode ? 'Light mode' : 'Dark mode'}</span>
        </button>
        
        {/* Logout Button */}
        <button
          type="button"
          onClick={() => Auth.logout()}
          className="sidebar-btn-modern group mt-auto"
        >
          <div className="sidebar-btn-icon-wrapper">
            <FiLogOut className="sidebar-btn-icon" />
          </div>
          <span className="sidebar-text group-hover:translate-x-1 transition-transform duration-200">Log out</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
