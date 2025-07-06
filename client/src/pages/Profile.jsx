import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { AiOutlineLoading, AiOutlineTrophy, AiOutlineFire, AiOutlineStar, AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { FaCrown, FaMedal, FaAward } from 'react-icons/fa';

const Profile = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const { data, loading } = useQuery(QUERY_ME);
  const user = data?.me || {};
  const firstLetter = user.username?.charAt(0).toUpperCase();

  // Calculate user level based on experience
  const calculateLevel = (exp) => {
    return Math.floor(exp / 100) + 1;
  };

  const calculateProgress = (exp) => {
    const level = calculateLevel(exp);
    const expForCurrentLevel = (level - 1) * 100;
    const expForNextLevel = level * 100;
    return ((exp - expForCurrentLevel) / (expForNextLevel - expForCurrentLevel)) * 100;
  };

  const level = calculateLevel(user.experience);
  const progress = calculateProgress(user.experience);

  // Format join date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section id="profile" className="w-full min-h-screen hero-bg flex flex-col items-center py-8 px-4 md:px-8">
      {loading && (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <AiOutlineLoading className="animate-spin h-16 w-16 text-palette-4" />
          <span className="text-palette-4 font-bold text-lg">Loading your profile...</span>
        </div>
      )}

      {!loading && (
        <>
          {/* Hero Section */}
          <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-palette-6/90 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 border border-palette-3/10 dark:border-palette-5/20">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar Section */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-palette-4 via-palette-1 to-palette-5 rounded-full flex items-center justify-center shadow-2xl border-8 border-white dark:border-palette-6 relative overflow-hidden">
                  <span className="text-6xl md:text-7xl font-black text-white uppercase drop-shadow-lg">
                    {firstLetter}
                  </span>
                  {/* Level Badge */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-4 border-white dark:border-palette-6 shadow-lg">
                    <span className="text-white font-bold text-lg">{level}</span>
                  </div>
                </div>
                {/* Achievement Icons */}
                {level >= 5 && (
                  <FaCrown className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 drop-shadow-lg animate-pulse" />
                )}
                {level >= 3 && (
                  <FaMedal className="absolute -top-4 -left-4 w-8 h-8 text-blue-400 drop-shadow-lg" />
                )}
              </div>

              {/* User Info */}
              <div className="flex flex-col items-center md:items-start gap-4 flex-1">
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-black text-palette-1 dark:text-palette-2 mb-2 tracking-tight">
                    {user.username}
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-palette-5 dark:text-palette-3 mb-4">
                    <AiOutlineCalendar className="w-5 h-5" />
                    <span className="font-medium">Joined {formatDate(user.createdAt)}</span>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-palette-5 dark:text-palette-3">Level {level}</span>
                    <span className="text-sm font-semibold text-palette-4">{user.experience} XP</span>
                  </div>
                  <div className="w-full bg-palette-3/20 dark:bg-palette-5/20 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-palette-4 to-palette-1 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-palette-5 dark:text-palette-3 mt-1">
                    <span>{(level - 1) * 100} XP</span>
                    <span>{level * 100} XP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Experience Card */}
            <div className="bg-gradient-to-br from-palette-4 to-palette-1 rounded-3xl p-6 shadow-xl border border-palette-3/10 dark:border-palette-5/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <AiOutlineFire className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Total Experience</h3>
                  <p className="text-white/80 text-sm">Your learning journey</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-4xl font-black text-white">{user.experience}</span>
                <p className="text-white/80 text-sm font-medium">XP Points</p>
              </div>
            </div>

            {/* Level Card */}
            <div className="bg-gradient-to-br from-palette-1 to-palette-5 rounded-3xl p-6 shadow-xl border border-palette-3/10 dark:border-palette-5/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <AiOutlineTrophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Current Level</h3>
                  <p className="text-white/80 text-sm">Your achievement</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-4xl font-black text-white">{level}</span>
                <p className="text-white/80 text-sm font-medium">Level</p>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-palette-5 to-palette-3 rounded-3xl p-6 shadow-xl border border-palette-3/10 dark:border-palette-5/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <AiOutlineStar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">Progress</h3>
                  <p className="text-white/80 text-sm">To next level</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-4xl font-black text-white">{Math.round(progress)}%</span>
                <p className="text-white/80 text-sm font-medium">Complete</p>
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-palette-6/90 rounded-3xl shadow-xl p-8 border border-palette-3/10 dark:border-palette-5/20">
            <h2 className="text-2xl font-bold text-palette-1 dark:text-palette-2 mb-6 text-center">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: FaAward, title: 'First Steps', unlocked: user.experience >= 50, color: 'from-yellow-400 to-yellow-600', darkColor: 'from-yellow-500 to-yellow-700' },
                { icon: FaMedal, title: 'Dedicated Learner', unlocked: user.experience >= 200, color: 'from-blue-400 to-blue-600', darkColor: 'from-blue-500 to-blue-700' },
                { icon: FaCrown, title: 'Master Student', unlocked: user.experience >= 500, color: 'from-purple-400 to-purple-600', darkColor: 'from-purple-500 to-purple-700' },
                { icon: AiOutlineTrophy, title: 'Legend', unlocked: user.experience >= 1000, color: 'from-red-400 to-red-600', darkColor: 'from-red-500 to-red-700' }
              ].map((achievement, index) => (
                <div key={index} className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br ' + achievement.color + ' dark:' + achievement.darkColor + ' shadow-lg scale-105' 
                    : 'bg-palette-3/20 dark:bg-palette-5/30 opacity-60 dark:opacity-80'
                }`}>
                  <achievement.icon className={`w-8 h-8 ${achievement.unlocked ? 'text-white' : 'text-palette-5 dark:text-palette-3'}`} />
                  <span className={`text-sm font-semibold text-center ${achievement.unlocked ? 'text-white' : 'text-palette-5 dark:text-palette-3'}`}>
                    {achievement.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Profile;
