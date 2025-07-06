import React from 'react';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { LessonContainer } from '../components';
import { lessonData } from '../data';
import { AiOutlineUser, AiOutlineStar } from 'react-icons/ai';

const Dashboard = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const { data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-palette-2 via-palette-3 to-palette-4 dark:from-palette-6 dark:via-palette-5 dark:to-palette-1 flex flex-col items-center px-2 py-4 bg-clouds-only">
      {/* User Greeting and Stats */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* User Greeting Card */}
        <div className="col-span-1 md:col-span-2 bg-white dark:bg-palette-6 rounded-xl shadow-lg p-4 flex flex-col md:flex-row items-center gap-3 border border-palette-3/30 dark:border-palette-5/30 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-palette-3 dark:bg-palette-5 shadow-md">
            <AiOutlineUser className="w-8 h-8 text-palette-1 dark:text-palette-2" />
          </div>
          <div className="flex-1 flex flex-col items-center md:items-start gap-1">
            <h1 className="text-lg font-bold text-palette-1 dark:text-palette-2">Welcome, {user.username || 'User'}!</h1>
            <p className="text-sm text-palette-5 dark:text-palette-3 font-medium">Your adventure continues. Keep learning and growing!</p>
          </div>
        </div>
        {/* Stats Card */}
        <div className="bg-white dark:bg-palette-6 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center border border-palette-3/30 dark:border-palette-5/30 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-1 mb-1">
            <AiOutlineStar className="w-4 h-4 text-palette-4" />
            <span className="text-sm font-bold text-palette-1 dark:text-palette-2">XP</span>
          </div>
          <div className="text-2xl font-bold text-palette-4 dark:text-palette-3">{user.experience || 0}</div>
          <div className="text-xs text-palette-5 dark:text-palette-3">Total Experience</div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="w-full max-w-6xl">
        <h2 className="text-xl md:text-2xl font-bold text-palette-1 dark:text-palette-2 mb-4 text-center">Lessons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessonData.map((lesson) => (
            <div key={lesson.lessonUrl} className="bg-white dark:bg-palette-6 rounded-lg shadow-md p-4 border border-palette-3/30 dark:border-palette-5/30 hover:scale-105 hover:shadow-lg transition-all duration-300">
              <LessonContainer lesson={lesson} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
