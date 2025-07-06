import { useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import lightLogo from '../assets/light_final.png';
import darkLogo from '../assets/dark_final.png';
import curtain from '../assets/bannerBG/bg-curtain.svg';
import { HiEye, HiEyeOff, HiMail, HiLockClosed } from 'react-icons/hi';
import { FaExclamationCircle } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

const Login = () => {
  const loggedIn = Auth.loggedIn();
  if (loggedIn) {
    return <Navigate to="/dashboard" />;
  }

  const darkMode = useSelector((state) => state.darkMode.value);
  const [showPassword, setShowPassword] = useState(false);
  const [login, { loading, error }] = useMutation(LOGIN);
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const inputData = Object.fromEntries(formData.entries());
    try {
      const { data } = await login({ variables: { ...inputData } });
      Auth.login(data.login.token);
    } catch (error) {
      setErrorMessage(
        error.message.includes('Incorrect credentials')
          ? 'Incorrect credentials'
          : 'Something went wrong'
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-palette-2 via-palette-3 to-palette-4 dark:from-palette-6 dark:via-palette-5 dark:to-palette-1 bg-clouds-only">
      {/* Left branding/illustration */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white/70 dark:bg-palette-6/80 p-12 relative">
        {/* Curtain background */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage: `url(${curtain})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '60px',
          }}
        />
        <div className="flex flex-col items-center gap-6 z-10">
          <div className="bg-palette-3/30 dark:bg-palette-5/30 rounded-full p-6 shadow-lg flex items-center justify-center">
            <img 
              src={darkMode ? darkLogo : lightLogo} 
              alt="Logo" 
              className="w-24 h-24 md:w-32 md:h-32 border border-palette-3 dark:border-palette-5 rounded-full shadow-lg" 
            />
          </div>
          <div className="text-palette-1 dark:text-palette-2 text-3xl font-extrabold text-center mt-4">
            Welcome Back to <span className="text-palette-4 dark:text-palette-4 font-extrabold">KanaQuest</span>
          </div>
          <div className="text-palette-5 dark:text-palette-3 text-lg text-center max-w-xs">
            Practice Japanese, track your progress, and join the leaderboard!
          </div>
        </div>
      </div>
      {/* Right login form */}
      <div className="flex flex-1 items-center justify-center py-16 px-4">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white dark:bg-palette-6 rounded-3xl shadow-2xl p-8 flex flex-col gap-8 border border-palette-3 dark:border-palette-5 z-10"
        >
          <h1 className="text-4xl font-extrabold text-palette-1 dark:text-palette-2 text-center mb-2">Log in to <span className="text-palette-4 dark:text-palette-4 font-extrabold">KanaQuest</span></h1>
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-palette-4">
                <HiMail className="w-6 h-6" />
              </span>
              <input
                className="pl-12 pr-4 py-3 w-full rounded-xl border-2 border-palette-3 dark:border-palette-5 bg-palette-2 dark:bg-palette-6 text-palette-1 dark:text-palette-2 focus:outline-none focus:border-palette-4 dark:focus:border-palette-4 text-lg"
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            {/* Password Field */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-palette-4">
                <HiLockClosed className="w-6 h-6" />
              </span>
              <input
                className="pl-12 pr-12 py-3 w-full rounded-xl border-2 border-palette-3 dark:border-palette-5 bg-palette-2 dark:bg-palette-6 text-palette-1 dark:text-palette-2 focus:outline-none focus:border-palette-4 dark:focus:border-palette-4 text-lg"
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-palette-4 hover:bg-palette-3/40 dark:hover:bg-palette-5/40"
                tabIndex={-1}
              >
                {showPassword ? <HiEyeOff className="w-6 h-6" /> : <HiEye className="w-6 h-6" />}
              </button>
            </div>
          </div>
          {/* Error Message */}
          {error && (
            <p className="text-red-500 mt-2 inline-flex items-center text-sm sm:text-base">
              <FaExclamationCircle className="mr-1" />
              {errorMessage}
            </p>
          )}
          {/* Submit Button */}
          <button
            className="w-full py-3 px-6 bg-gradient-to-r from-palette-4 to-palette-1 hover:from-palette-1 hover:to-palette-4 text-palette-2 font-bold rounded-xl text-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-palette-4/40"
            type="submit"
          >
            {loading ? <AiOutlineLoading className="animate-spin h-6 w-6 mx-auto" /> : 'Log in'}
          </button>
          {/* Sign Up Link */}
          <p className="mt-2 text-palette-5 dark:text-palette-3 text-center">
            Don&apos;t have an account?{' '}
            <Link
              to="/signup"
              className="font-bold text-palette-4 hover:text-palette-1 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
