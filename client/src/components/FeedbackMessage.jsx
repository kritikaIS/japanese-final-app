import React from 'react';
import { HiX, HiCheck } from 'react-icons/hi';

const FeedbackMessage = ({ questionState, answer }) => {
  return (
    <div className={`py-4 md:p-0 flex h-full ${questionState === 'correct' ? 'text-palette-4 dark:text-palette-3' : 'text-palette-5 dark:text-palette-4'}`}>
      {/* Icon */}
      <div className={`hidden w-20 h-20 mr-4 rounded-full md:flex justify-center items-center bg-palette-2 ${questionState === 'correct' ? ' dark:bg-palette-3' : 'dark:bg-palette-4'}`}>
        {questionState === 'correct' ? (
          <HiCheck className="w-16 h-16 stroke-1 dark:text-slate-800" />
        ) : (
          <HiX className="w-16 h-16 stroke-1 dark:text-slate-800" />
        )}
      </div>
      {/* Message */}
      <div>
        <h2 className="font-bold text-xl">{questionState === 'correct' ? 'Correct!' : 'Correct Solution:'}</h2>
        {questionState === 'incorrect' && <p className="sm:text-xl md:text-2xl font-semibold">{answer}</p>}
      </div>
    </div>
  );
};

export default FeedbackMessage;
