import React from 'react';
import Auth from '../utils/auth';
import { AiOutlineLoading, AiOutlineTrophy } from 'react-icons/ai';
import { FaCrown } from 'react-icons/fa';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';

const podiumColors = [
  'from-yellow-400 to-yellow-200', // Gold
  'from-gray-400 to-gray-200',    // Silver
  'from-amber-700 to-amber-300',  // Bronze
];
const podiumText = [
  'text-yellow-600',
  'text-gray-500',
  'text-amber-700',
];

const Leaderboards = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const { loading, data } = useQuery(QUERY_USERS);
  const users = data?.users || [];
  const sortedUsers = [...users].sort((a, b) => b.experience - a.experience);
  const top3 = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  return (
    <section id="leaderboard" className="w-full min-h-screen hero-bg flex flex-col items-center pt-16 pb-8 px-2 md:px-8">
      {/* Hero Section */}
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4 mb-16">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-palette-4 to-palette-1 shadow-lg">
            <AiOutlineTrophy className="w-12 h-12 text-yellow-400 drop-shadow" />
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-palette-1 dark:text-palette-2 tracking-tight">Leaderboards</h1>
        </div>
        <p className="text-lg text-palette-5 dark:text-palette-3 text-center max-w-xl mt-4">Rise to the top! Compete with others and celebrate your progress.</p>
      </div>

      {/* Podium for Top 3 */}
      <div className="w-full max-w-3xl mx-auto flex justify-center items-end gap-8 mb-20">
        {top3.map((user, i) => (
          <div
            key={user.username}
            className={`flex flex-col items-center justify-end relative z-10 animate-fade-in`}
            style={{ zIndex: 10 - i }}
          >
            <div
              className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br ${podiumColors[i]} flex items-center justify-center shadow-xl border-4 border-white dark:border-palette-6 relative`}
            >
              <span className={`text-4xl md:text-5xl font-extrabold uppercase ${podiumText[i]}`}>{user.username?.charAt(0)}</span>
              {i === 0 && <FaCrown className="absolute -top-8 left-1/2 -translate-x-1/2 text-yellow-400 w-10 h-10 drop-shadow crown-bounce" />}
            </div>
            <div className="mt-4 text-center">
              <span className={`block font-bold text-xl md:text-2xl ${podiumText[i]}`}>{user.username}</span>
              <span className="block text-palette-5 dark:text-palette-3 text-lg font-semibold mt-1">{user.experience} XP</span>
            </div>
            <div className={`w-20 md:w-24 h-6 rounded-b-2xl bg-gradient-to-br ${podiumColors[i]} mt-4`} style={{ height: `${i === 0 ? 56 : i === 1 ? 44 : 36}px` }} />
            <span className={`absolute -bottom-10 left-1/2 -translate-x-1/2 text-3xl font-bold ${podiumText[i]}`}>{i + 1}</span>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        .crown-bounce { animation: crownBounce 1.2s infinite alternate cubic-bezier(.4,0,.2,1); }
        @keyframes crownBounce {
          0% { transform: translateY(0) scale(1) rotate(-8deg); }
          100% { transform: translateY(-8px) scale(1.08) rotate(8deg); }
        }
        .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1); }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
};

export default Leaderboards;
